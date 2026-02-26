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
import { Menu, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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
          {localeNames[locale]} <ChevronDown className="w-3 h-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[80px] bg-background/90 backdrop-blur-xl border-glass-border"
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
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center w-full px-4 md:px-6 pointer-events-none"
    >
      <div className="flex items-center w-full max-w-4xl justify-between h-14 px-6 md:px-8 bg-white/60 dark:bg-black/40 backdrop-blur-2xl border border-white/40 shadow-lg shadow-black/5 rounded-full pointer-events-auto transition-all">
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <Image
            src="/logo.svg"
            alt="Verba logo"
            width={24}
            height={24}
            className="group-hover:opacity-80 transition-opacity"
          />
          <span className="font-semibold text-foreground tracking-tight text-lg">
            Verba
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full rounded-full opacity-50" />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <LocaleSwitcher locale={locale} />
          <Button
            asChild
            size="sm"
            className="rounded-full px-6 shadow-sm shadow-primary/10 hover:shadow-primary/20"
          >
            <a href={DOWNLOAD_URL}>{t("download")}</a>
          </Button>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <LocaleSwitcher locale={locale} />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-64 border-l-glass-border bg-background/95 backdrop-blur-xl"
            >
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <Button asChild className="mt-4 rounded-full">
                  <a href={DOWNLOAD_URL}>{t("download")}</a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
