import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import BrandLogo from "@/components/layout/BrandLogo";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="site-footer py-24 bg-card border-t border-border relative z-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col xl:flex-row justify-between items-center gap-12">
        <div className="flex flex-col gap-3">
          <BrandLogo className="h-12 self-start" />
          <div className="text-sm text-muted-foreground font-serif italic text-left">
            &quot;{"Verba volant, scripta manent"}&quot; <br />
            <span className="text-xs font-sans opacity-70 not-italic">
              {t("tagline")}
            </span>
          </div>
        </div>

        <div className="footer-links flex flex-wrap justify-center gap-12 text-sm font-bold text-muted-foreground uppercase tracking-widest">
          <Link className="hover:text-accent transition-colors" href="/terms">
            {t("terms")}
          </Link>
          <Link className="hover:text-accent transition-colors" href="/privacy">
            {t("privacy_policy")}
          </Link>
          <a
            className="hover:text-accent transition-colors"
            href={`mailto:${t("contact_email")}`}
          >
            {t("contact_label")}
          </a>
        </div>

        <div className="footer-copyright text-xs font-bold text-muted-foreground opacity-40 tracking-widest uppercase">
          {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
