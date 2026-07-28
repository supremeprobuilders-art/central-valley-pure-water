"use client";

import { useEffect, useRef, useState } from "react";

const navItems = [
  { href: "#systems", label: "Systems" },
  { href: "#reviews", label: "Reviews" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#service-area", label: "Service area" },
  { href: "#faq", label: "FAQ" },
] as const;

interface MobileMenuProps {
  phoneDisplay: string;
  phoneHref: string;
}

export function MobileMenu({
  phoneDisplay,
  phoneHref,
}: MobileMenuProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
  };

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const menu = detailsRef.current;

      if (menu?.open && !menu.contains(event.target as Node)) {
        menu.open = false;
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        detailsRef.current?.querySelector("summary")?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <details
      className="mobile-menu"
      onToggle={(event) => setIsOpen(event.currentTarget.open)}
      ref={detailsRef}
    >
      <summary
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
      >
        <span />
        <span />
        <span />
      </summary>
      <nav aria-label="Mobile navigation">
        {navItems.map((item) => (
          <a href={item.href} key={item.href} onClick={closeMenu}>
            {item.label}
          </a>
        ))}
        <a className="menu-call" href={phoneHref} onClick={closeMenu}>
          Call {phoneDisplay}
        </a>
      </nav>
    </details>
  );
}
