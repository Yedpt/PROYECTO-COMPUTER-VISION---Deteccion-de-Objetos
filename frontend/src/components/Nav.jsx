export default function Nav() {
  return (
    <nav className="px-8 py-5 flex items-center justify-between border-b border-white/5">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center font-bold">
          B
        </div>
        <span className="font-semibold text-lg">BrandVision AI</span>
      </div>
    </nav>
  );
}
