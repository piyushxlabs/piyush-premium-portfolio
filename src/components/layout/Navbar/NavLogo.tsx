// NavLogo — minimal brand mark using gradient text
import Link from "next/link";

export function NavLogo() {
  return (
    <Link href="/" aria-label="Piyush — Home" className="inline-flex items-center gap-2">
      <span className="text-gradient-heading text-lg font-semibold tracking-tight">
        Piyush
      </span>
      <span className="hidden text-xs text-muted md:inline">AI Portfolio</span>
    </Link>
  );
}
