from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.core.ws_manager import analytics_ws_manager

router = APIRouter()


@router.websocket("/ws/analytics")
async def analytics_websocket(websocket: WebSocket):
    await analytics_ws_manager.connect(websocket)
    try:
        while True:
            # mantenemos la conexión viva
            await websocket.receive_text()
    except WebSocketDisconnect:
        analytics_ws_manager.disconnect(websocket)
