import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="py-24 bg-card border-t border-border relative z-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <Image
              src="/verba-logo.svg"
              alt="Verba Logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
            />
            <span className="text-2xl font-bold tracking-tight text-primary font-serif">
            {"Verba"}
          </span>
          </div>
          <div className="text-sm text-muted-foreground font-serif italic text-left">
            &quot;{"Verba volant, scripta manent"}&quot; <br />
            <span className="text-xs font-sans opacity-70 not-italic">
              {t("tagline")}
            </span>
          </div>
        </div>

        <div className="flex gap-12 text-sm font-bold text-muted-foreground uppercase tracking-widest">
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

        <div className="text-xs font-bold text-muted-foreground opacity-40 tracking-widest uppercase">
          {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
