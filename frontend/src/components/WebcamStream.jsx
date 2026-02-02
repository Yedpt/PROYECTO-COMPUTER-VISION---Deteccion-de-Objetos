export default function WebcamStream({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-neutral-900 p-6 rounded-2xl shadow-xl w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-4 text-white text-center">
          Real-time Logo Detection
        </h2>

        <img
          src="http://localhost:8000/stream/webcam"
          alt="Webcam Stream"
          className="rounded-xl border border-white/10 w-full"
        />

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition font-semibold"
        >
          🔴 Apagar cámara
        </button>
      </div>
    </div>
  );
}
