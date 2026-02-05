from collections import defaultdict

# 🔁 Mapeo impacto cualitativo → score numérico
IMPACT_SCORE = {
    "BAJO": 1.0,
    "MEDIO": 2.0,
    "ALTO": 3.0
}


class GlobalAnalyticsService:
    def __init__(self):
        self.total_videos = 0
        self.total_images = 0

        self.brands = defaultdict(lambda: {
            "videos": 0,
            "images": 0,
            "impact": 0.0,
            "impact_count": 0
        })

    # ==========================
    # 🎥 vídeo analizado
    # ==========================
    def register_video(self, metrics: list):
        self.total_videos += 1

        for m in metrics:
            brand = m["class_name"]

            impact_label = m.get("impact", "BAJO")
            impact_value = self._parse_impact(impact_label)

            self.brands[brand]["videos"] += 1
            self.brands[brand]["impact"] += impact_value
            self.brands[brand]["impact_count"] += 1

    # ==========================
    # 🖼️ imagen analizada
    # ==========================
    def register_image(self, metrics: list):
        self.total_images += 1

        for m in metrics:
            brand = m["class_name"]

            impact_label = m.get("impact", "BAJO")
            impact_value = self._parse_impact(impact_label)

            self.brands[brand]["images"] += 1
            self.brands[brand]["impact"] += impact_value
            self.brands[brand]["impact_count"] += 1

    # ==========================
    # 📊 executive overview
    # ==========================
    def overview(self):
        total_brands = len(self.brands)

        top_brand = None
        top_impact = 0

        for brand, data in self.brands.items():
            if data["impact"] > top_impact:
                top_brand = brand
                top_impact = data["impact"]

        return {
            "total_videos": self.total_videos,
            "total_images": self.total_images,
            "total_analyses": self.total_videos + self.total_images,
            "total_brands": total_brands,
            "top_brand": top_brand,
        }

    # ==========================
    # 🆕 ranking avanzado
    # ==========================
    def brand_ranking(self):
        ranking = []

        for brand, data in self.brands.items():
            total_analyses = data["videos"] + data["images"]

            avg_impact = (
                data["impact"] / data["impact_count"]
                if data["impact_count"] > 0
                else 0
            )

            ranking.append({
                "brand": brand,
                "impact": round(data["impact"], 2),
                "videos": data["videos"],
                "images": data["images"],
                "avg_impact": round(avg_impact, 2)
            })

        return sorted(
            ranking,
            key=lambda x: x["impact"],
            reverse=True
        )

    # ==========================
    # 🔧 helper interno
    # ==========================
    def _parse_impact(self, impact):
        """
        Acepta:
        - 'ALTO' | 'MEDIO' | 'BAJO'
        - números (int / float)
        """
        if isinstance(impact, (int, float)):
            return float(impact)

        if isinstance(impact, str):
            return IMPACT_SCORE.get(impact.upper(), 0)

        return 0.0


# 🔒 singleton
global_analytics = GlobalAnalyticsService()
