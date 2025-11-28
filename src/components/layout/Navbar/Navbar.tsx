"use client";

import { QuantumNavProvider } from "./QuantumNavContext";
import { NavbarContainer } from "./NavbarContainer";
import { NavLogo } from "./NavLogo";
import { NavLink } from "./NavLink";
import { MobileMenuToggle } from "./MobileMenuToggle";
import { MobileMenu } from "./MobileMenu";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/vision", label: "Vision" },
  { href: "/lab", label: "Lab" },
  { href: "/thoughts", label: "Thoughts" },
  { href: "/connect", label: "Connect" },
];

export function Navbar() {
  return (
    <QuantumNavProvider>
      <NavbarContainer>
        {/* Left: Logo */}
        <NavLogo />

        {/* Center/Right: Desktop Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </div>

        {/* Right: Mobile Toggle */}
        <MobileMenuToggle />
      </NavbarContainer>

      {/* Mobile Menu Portal */}
      <MobileMenu items={navItems} />
    </QuantumNavProvider>
  );
}