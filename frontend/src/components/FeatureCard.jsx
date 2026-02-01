export default function FeatureCard({
  // eslint-disable-next-line no-unused-vars
  icon: Icon,
  title,
  description,
  onClick,
  color,
  bg,
  clickable = true,
}) {

  return (
    <div
      onClick={onClick}
      className={`
        ${clickable ? "cursor-pointer hover:-translate-y-1" : ""}
        bg-[#151A2C]
        rounded-2xl
        p-6
        border border-white/5
        hover:border-indigo-500/40
        transition-all duration-300
      `}
    >
      <div
        className={`w-12 h-12 rounded-xl bg-linear-to-br ${bg} flex items-center justify-center mb-4`}
      >
        <Icon className={`${color} w-6 h-6`} />
      </div>

      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
