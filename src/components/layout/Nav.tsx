"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter, Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/layout/BrandLogo";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { DOWNLOAD_URL } from "@/lib/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu } from "lucide-react";
import { useState, Suspense } from "react";

const localeNames: Record<string, string> = {
  en: "EN",
  es: "ES",
  it: "IT",
  fr: "FR",
  de: "DE",
  nl: "NL",
};

import { useSearchParams } from "next/navigation";

function LocaleSwitcher({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const pathWithQuery = query ? `${pathname}?${query}` : pathname;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1 text-xs px-2 font-medium text-muted-foreground hover:text-foreground rounded-full"
        >
          {localeNames[locale]} <ChevronDown size={12} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[80px] bg-background/90 backdrop-blur-xl border-border"
      >
        {routing.locales.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => router.replace(pathWithQuery, { locale: l })}
            className={`text-xs cursor-pointer ${
              l === locale
                ? "bg-primary/10 text-primary font-semibold"
                : "text-muted-foreground"
            }`}
          >
            {localeNames[l]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Nav({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/#features", label: t("features") },
    { href: "/#privacy", label: t("privacy") },
    { href: "/#pricing", label: t("pricing") },
  ];

  return (
    <header className="site-header fixed top-0 w-full z-50 glass-header">
      <div className="nav-shell mx-auto h-20 flex items-center justify-between">
        <Link href="/" className="flex shrink-0 items-center">
          <BrandLogo />
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-sm text-muted-foreground font-semibold">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link hover:text-accent transition-colors font-sans"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <Suspense fallback={<div className="w-8 h-8" />}>
            <LocaleSwitcher locale={locale} />
          </Suspense>
          <a
            href={DOWNLOAD_URL}
            className="nav-download btn-warm px-6 py-2.5 rounded-full text-sm font-bold block"
          >
            {t("download")}
          </a>
        </div>
        <div className="flex md:hidden items-center gap-2">
          <Suspense fallback={<div className="w-8 h-8" />}>
            <LocaleSwitcher locale={locale} />
          </Suspense>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                aria-label={t("menu")}
              >
                <Menu size={20} aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              aria-describedby={undefined}
              className="w-72 p-6 border-l-border bg-background/95 backdrop-blur-xl"
            >
              <SheetTitle className="sr-only">{t("menu")}</SheetTitle>
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href={DOWNLOAD_URL}
                  className="btn-warm mt-4 text-center py-3 rounded-full font-bold block"
                >
                  {t("download")}
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
