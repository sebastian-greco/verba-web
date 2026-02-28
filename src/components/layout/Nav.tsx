"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter, Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const DOWNLOAD_URL = "https://verbaspeech.app/download";

const localeNames: Record<string, string> = {
  en: "EN",
  es: "ES",
  it: "IT",
  fr: "FR",
  de: "DE",
  nl: "NL",
};

function LocaleSwitcher({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1 text-xs px-2 font-medium text-muted-foreground hover:text-foreground rounded-full"
        >
          {localeNames[locale]}{" "}
          <span className="material-symbols-outlined text-[10px] opacity-50">
            keyboard_arrow_down
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[80px] bg-background/90 backdrop-blur-xl border-border"
      >
        {routing.locales.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => router.replace(pathname, { locale: l })}
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
    { href: "#features", label: t("features") },
    { href: "#privacy", label: t("privacy") },
    { href: "#pricing", label: t("pricing") },
  ];

  return (
    <header className="fixed top-0 w-full z-50 glass-header">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-primary-foreground">
              keyboard_command_key
            </span>
          </div>
          <span className="font-bold tracking-tight text-lg text-primary font-serif">
            Verba
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-sm text-muted-foreground font-semibold">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-accent transition-colors font-sans uppercase tracking-[0.1em]"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <LocaleSwitcher locale={locale} />
          <a
            href={DOWNLOAD_URL}
            className="btn-warm px-6 py-2.5 rounded-full text-sm font-bold block"
          >
            {t("download")}
          </a>
        </div>
        <div className="flex md:hidden items-center gap-2">
          <LocaleSwitcher locale={locale} />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <span className="material-symbols-outlined">menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-64 border-l-border bg-background/95 backdrop-blur-xl"
            >
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-[0.1em]"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
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
