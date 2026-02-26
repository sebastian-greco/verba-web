import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-glass-border bg-card/30 backdrop-blur-md relative z-10">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3 group cursor-default">
              <Image
                src="/logo.svg"
                alt="Verba logo"
                width={24}
                height={24}
                className="opacity-80"
              />
              <span className="font-semibold text-lg tracking-tight text-foreground">
                Verba
              </span>
            </div>
            <p className="text-sm font-light text-muted-foreground leading-relaxed max-w-sm">
              {t("tagline")} Make every spoken word count with effortless AI
              dictation.
            </p>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="flex flex-col gap-4">
              <p className="text-sm font-semibold tracking-wider uppercase text-foreground/80">
                {t("product")}
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="#features"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("features_link")}
                </a>
                <a
                  href="#privacy"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("privacy_link")}
                </a>
                <a
                  href="#pricing"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("pricing_link")}
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-sm font-semibold tracking-wider uppercase text-foreground/80">
                {t("legal")}
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  href="/privacy"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("privacy_policy")}
                </Link>
                <Link
                  href="/terms"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("terms")}
                </Link>
                <a
                  href={`mailto:${t("contact_email")}`}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-glass-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-medium text-muted-foreground/60">
            {t("copyright")}
          </p>
          <div className="flex gap-4">
            <span className="text-xs font-medium text-muted-foreground/40 hidden sm:block">
              Crafted with precision.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
