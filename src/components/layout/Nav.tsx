'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter, Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
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
    <div className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase">
      {routing.locales.map((l) => (
        <button
          key={l}
          onClick={() => router.replace(pathname, { locale: l })}
          className={`transition-none hover:text-primary ${
            l === locale ? 'text-primary' : 'text-muted-foreground'
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
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background">
      <div className="mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-4 h-4 bg-foreground group-hover:bg-primary transition-none" />
          <span className="font-mono text-sm tracking-widest uppercase font-bold text-foreground">Verba</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest uppercase">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-none"
            >
              [{link.label}]
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <LocaleSwitcher locale={locale} />
          <a
            href={DOWNLOAD_URL}
            className="text-xs font-mono uppercase tracking-widest bg-primary text-black px-4 py-2 hover:bg-white hover:text-black transition-none"
          >
            {t('download')}
          </a>
        </div>

        <div className="flex md:hidden items-center gap-4">
          <LocaleSwitcher locale={locale} />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="text-foreground hover:text-primary transition-none">
                <Menu className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80 bg-background border-l border-border rounded-none p-6">
              <nav className="flex flex-col gap-6 mt-12 font-mono text-sm tracking-widest uppercase">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-none"
                    onClick={() => setOpen(false)}
                  >
                    [{link.label}]
                  </a>
                ))}
                <a
                  href={DOWNLOAD_URL}
                  className="mt-4 text-center bg-primary text-black px-4 py-3 hover:bg-white hover:text-black transition-none"
                >
                  {t('download')}
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
