from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func, distinct

from app.db.session import get_db
from app.db.models import Analysis, BrandMetric

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)

# ==========================
# 🏆 TOP BRANDS (GLOBAL)
# ==========================
@router.get("/top-brands")
def get_top_brands(
    limit: int = 10,
    db: Session = Depends(get_db)
):
    total_videos = (
        db.query(func.count(Analysis.id))
        .filter(Analysis.analysis_type == "video")
        .scalar()
    )

    results = (
        db.query(
            BrandMetric.class_name.label("brand"),
            func.sum(BrandMetric.detections).label("detections"),
            func.sum(BrandMetric.time_seconds).label("time_seconds"),
            func.avg(BrandMetric.percentage).label("avg_percentage"),
            func.count(distinct(BrandMetric.analysis_id)).label("videos"),
        )
        .group_by(BrandMetric.class_name)
        .order_by(func.sum(BrandMetric.detections).desc())
        .limit(limit)
        .all()
    )

    brands = [
        {
            "brand": r.brand,
            "detections": int(r.detections),
            "time_seconds": round(r.time_seconds or 0, 2),
            "avg_percentage": round(r.avg_percentage or 0, 2),
            "videos": r.videos,
        }
        for r in results
    ]

    return {
        "total_videos": total_videos,
        "brands": brands,
    }


# ==========================
# 📊 RESUMEN POR VÍDEO
# ==========================
@router.get("/video/{analysis_id}/summary")
def get_video_summary(
    analysis_id: int,
    db: Session = Depends(get_db)
):
    analysis = (
        db.query(Analysis)
        .filter(Analysis.id == analysis_id)
        .first()
    )

    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")

    brands = (
        db.query(BrandMetric)
        .filter(BrandMetric.analysis_id == analysis_id)
        .order_by(BrandMetric.percentage.desc())
        .all()
    )

    return {
        "analysis_id": analysis.id,
        "filename": analysis.filename,
        "duration": round(analysis.duration or 0, 2),
        "fps": analysis.fps,
        "total_brands": len(brands),
        "top_brand": brands[0].class_name if brands else None,
        "brands": [
            {
                "class_name": b.class_name,
                "detections": b.detections,
                "frames": b.frames,
                "time_seconds": round(b.time_seconds, 2),
                "percentage": round(b.percentage, 2),
                "impact": b.impact
            }
            for b in brands
        ]
    }
