// InstagramIcon — Instagram social icon
import { Instagram } from "lucide-react";

interface InstagramIconProps {
  size?: number;
  className?: string;
}

export function InstagramIcon({ size = 24, className = "" }: InstagramIconProps) {
  return <Instagram size={size} className={className} />;
}
