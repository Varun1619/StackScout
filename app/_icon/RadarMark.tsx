const BG = "#0d0d0d";
const SIGNAL = "#a3e635";

export function RadarMark({ size }: { size: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        background: BG,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "80%",
          height: "80%",
          borderRadius: "50%",
          border: `${Math.max(2, Math.round(size * 0.018))}px solid ${SIGNAL}`,
          opacity: 0.3,
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "54%",
          height: "54%",
          borderRadius: "50%",
          border: `${Math.max(2, Math.round(size * 0.022))}px solid ${SIGNAL}`,
          opacity: 0.55,
          display: "flex",
        }}
      />
      <div
        style={{
          width: "18%",
          height: "18%",
          borderRadius: "50%",
          background: SIGNAL,
          display: "flex",
        }}
      />
    </div>
  );
}
