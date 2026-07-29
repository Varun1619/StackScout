const BLIPS = [
  { top: "30%", left: "62%", delay: "0s" },
  { top: "68%", left: "40%", delay: "0.6s" },
  { top: "45%", left: "22%", delay: "1.2s" },
  { top: "75%", left: "70%", delay: "1.8s" },
];

export function Radar({
  size = 220,
  spinning = true,
}: {
  size?: number;
  spinning?: boolean;
}) {
  return (
    <div
      className="relative rounded-full border border-border"
      style={{
        width: size,
        height: size,
        background:
          "radial-gradient(circle, color-mix(in oklch, var(--category-accent, var(--primary)) 8%, transparent) 0%, transparent 70%)",
      }}
      aria-hidden="true"
    >
      {[0.75, 0.5, 0.25].map((scale) => (
        <div
          key={scale}
          className="absolute rounded-full border border-border"
          style={{
            top: `${(1 - scale) * 50}%`,
            left: `${(1 - scale) * 50}%`,
            width: `${scale * 100}%`,
            height: `${scale * 100}%`,
          }}
        />
      ))}

      <div className="absolute top-1/2 left-0 w-full h-px bg-border" />
      <div className="absolute left-1/2 top-0 h-full w-px bg-border" />

      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div
          className={spinning ? "radar-sweep" : ""}
          style={{
            width: "100%",
            height: "100%",
            background: `conic-gradient(from 0deg, transparent 0deg, var(--category-accent, var(--primary)) 6deg, transparent 55deg)`,
            opacity: 0.55,
          }}
        />
      </div>

      {BLIPS.map((blip, i) => (
        <div
          key={i}
          className="radar-blip absolute rounded-full"
          style={{
            top: blip.top,
            left: blip.left,
            width: 6,
            height: 6,
            marginTop: -3,
            marginLeft: -3,
            background: "var(--category-accent, var(--primary))",
            animationDelay: blip.delay,
            boxShadow: "0 0 8px var(--category-accent, var(--primary))",
          }}
        />
      ))}

      <div
        className="absolute rounded-full"
        style={{
          top: "50%",
          left: "50%",
          width: 8,
          height: 8,
          marginTop: -4,
          marginLeft: -4,
          background: "var(--category-accent, var(--primary))",
        }}
      />
    </div>
  );
}
