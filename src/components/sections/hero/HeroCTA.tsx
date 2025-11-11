// src/components/sections/hero/HeroCTA.tsx — Primary CTAs for hero
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function HeroCTA() {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
      <Link href="/work">
        <Button>Explore My Work</Button>
      </Link>
      <Link href="/connect">
        <Button variant="secondary">Let’s Collaborate</Button>
      </Link>
    </div>
  );
}
