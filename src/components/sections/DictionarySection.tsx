import { useTranslations } from "next-intl";
import { ArrowRight, BookOpen, Check } from "lucide-react";

export default function DictionarySection() {
  const t = useTranslations("dictionary");
  const details = ["replacements", "suggestions", "control"] as const;

  return (
    <section
      id="dictionary"
      aria-labelledby="dictionary-heading"
      className="bg-background py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        <div className="min-w-0">
          <h2
            id="dictionary-heading"
            className="text-balance font-serif text-4xl font-black leading-[1.15] text-primary sm:text-5xl lg:text-6xl"
          >
            {t("headline")}
          </h2>
          <p className="mt-6 font-semibold text-primary">{t("release_note")}</p>
          <p className="mt-5 max-w-prose font-serif text-lg leading-relaxed text-foreground">
            {t("description")}
          </p>

          <dl className="mt-10 divide-y divide-border">
            {details.map((detail) => (
              <div key={detail} className="py-6 first:pt-0 last:pb-0">
                <dt className="font-serif text-xl font-bold text-primary">
                  {t(`${detail}_title`)}
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-foreground">
                  {t(`${detail}_description`)}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="min-w-0 lg:pt-3">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-10">
            <div className="flex items-center gap-4 border-b border-border pb-7">
              <BookOpen className="size-7 shrink-0 text-primary" aria-hidden="true" />
              <h3 className="min-w-0 font-serif text-2xl font-bold text-primary">
                {t("example_title")}
              </h3>
            </div>

            <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-3 gap-y-4 py-9 sm:gap-x-5">
              <p className="text-sm font-semibold text-foreground">{t("replace_label")}</p>
              <span aria-hidden="true" />
              <p className="text-sm font-semibold text-foreground">{t("with_label")}</p>
              <p className="break-words font-serif text-2xl text-foreground sm:text-3xl">
                {t("example_source")}
              </p>
              <ArrowRight className="size-5 text-primary" aria-hidden="true" />
              <p className="break-words font-serif text-2xl font-bold text-primary sm:text-3xl">
                {t("example_replacement")}
              </p>
            </div>

            <p className="flex items-start gap-3 border-t border-border pt-7 text-base leading-relaxed text-foreground">
              <Check className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
              <span>{t("approval_note")}</span>
            </p>
          </div>
          <figcaption className="mt-4 text-sm leading-relaxed text-foreground">
            {t("example_caption")}
          </figcaption>
          <p className="mt-8 text-sm leading-relaxed text-foreground">
            {t("compatibility_note")}
          </p>
        </figure>
      </div>
    </section>
  );
}
