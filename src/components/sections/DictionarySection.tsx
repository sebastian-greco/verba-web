import { useTranslations } from "next-intl";

export default function DictionarySection() {
  const t = useTranslations("dictionary");

  return (
    <section
      id="dictionary"
      aria-labelledby="dictionary-heading"
      className="bg-background py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div className="min-w-0">
          <h2
            id="dictionary-heading"
            className="text-balance font-serif text-4xl font-black leading-[1.15] text-primary sm:text-5xl"
          >
            {t("headline")}
          </h2>
          <p className="mt-8 max-w-prose font-serif text-xl leading-relaxed text-foreground">
            {t("description")}
          </p>

          <div className="mt-10">
            <h3 className="font-serif text-xl font-bold text-primary">
              {t("learning_title")}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-foreground">
              {t("learning_description")}
            </p>
          </div>
        </div>

        <figure className="min-w-0">
          <div className="soft-shadow rounded-[32px] border border-border bg-card p-6 sm:rounded-[40px] sm:p-10">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-3xl text-primary" aria-hidden="true">
                {"menu_book"}
              </span>
              <h3 className="min-w-0 font-serif text-2xl font-bold text-primary">
                {t("example_title")}
              </h3>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-center sm:gap-4">
              <dl className="min-w-0">
                <dt className="text-sm font-semibold text-foreground">{t("replace_label")}</dt>
                <dd className="mt-3 break-words font-serif text-2xl leading-relaxed text-muted-foreground">
                  {t("example_source")}
                </dd>
              </dl>
              <span className="material-symbols-outlined w-fit rotate-90 text-2xl text-primary sm:rotate-0" aria-hidden="true">
                {"arrow_forward"}
              </span>
              <dl className="min-w-0">
                <dt className="text-sm font-semibold text-foreground">{t("with_label")}</dt>
                <dd className="mt-3 break-words font-serif text-2xl font-bold leading-relaxed text-primary">
                  {t("example_replacement")}
                </dd>
              </dl>
            </div>

            <div className="mt-9 border-t border-border pt-8">
              <p className="text-sm font-semibold text-foreground">{t("result_label")}</p>
              <p className="mt-4 text-pretty font-serif text-2xl leading-relaxed text-primary sm:text-3xl">
                {t.rich("result_text", {
                  term: (chunks) => (
                    <mark className="rounded-sm bg-accent/10 px-1 text-primary">
                      {chunks}
                    </mark>
                  ),
                })}
              </p>
            </div>
          </div>
          <figcaption className="mt-4 text-sm leading-relaxed text-foreground">
            {t("example_caption")}
          </figcaption>
          <p className="mt-6 text-sm leading-relaxed text-foreground">
            {t("compatibility_note")}
          </p>
        </figure>
      </div>
    </section>
  );
}
