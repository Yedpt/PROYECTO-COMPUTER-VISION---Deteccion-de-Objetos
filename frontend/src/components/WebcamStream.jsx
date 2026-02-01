import { useEffect, useRef } from "react";

export default function WebcamStream({ onClose }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  useEffect(() => {
    const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
    };

    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  return (
    <div className="mt-20 flex flex-col items-center gap-6">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="rounded-2xl shadow-lg border border-white/10 w-full max-w-3xl"
      />

      <button
        onClick={handleClose}
        className="px-6 py-3 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"
      >
        🔴 Apagar cámara
      </button>
    </div>
  );
}
