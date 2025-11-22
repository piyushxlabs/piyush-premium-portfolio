export function SectionDivider({ position = "bottom" }: { position?: "top" | "bottom" }) {
  if (position === "top") {
    return (
      <div 
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0"
        style={{ opacity: 0.6 }}
      />
    );
  }
  
  return (
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
  );
}
