'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter, Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useState } from 'react';

const DOWNLOAD_URL = 'https://verbaspeech.app/download';

const localeNames: Record<string, string> = {
  en: 'EN',
  es: 'ES',
  it: 'IT',
  fr: 'FR',
  de: 'DE',
  nl: 'NL',
};

function LocaleSwitcher({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1">
      {routing.locales.map((l) => (
        <button
          key={l}
          onClick={() => router.replace(pathname, { locale: l })}
          className={`text-xs px-1.5 py-0.5 rounded font-mono transition-colors ${
            l === locale
              ? 'text-primary font-bold'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {localeNames[l]}
        </button>
      ))}
    </div>
  );
}

export default function Nav({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: '#features', label: t('features') },
    { href: '#privacy', label: t('privacy') },
    { href: '#pricing', label: t('pricing') },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo.svg" alt="Verba" width={28} height={28} />
          <span className="font-semibold text-foreground">Verba</span>
        </Link>


        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>


        <div className="hidden md:flex items-center gap-3">
          <LocaleSwitcher locale={locale} />
          <Button asChild size="sm">
            <a href={DOWNLOAD_URL}>{t('download')}</a>
          </Button>
        </div>


        <div className="flex md:hidden items-center gap-2">
          <LocaleSwitcher locale={locale} />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-base text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <Button asChild className="mt-2">
                  <a href={DOWNLOAD_URL}>{t('download')}</a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
