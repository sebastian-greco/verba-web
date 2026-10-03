import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  DICTIONARY_IMAGE_URL,
  DICTIONARY_SUGGESTION_IMAGE_URL,
} from "@/lib/constants";
import Reveal from "@/components/home/Reveal";

export default function DictionarySection() {
  const t = useTranslations("dictionary");
  const r = useTranslations("redesign");
  return (
    <section
      id="dictionary"
      aria-labelledby="dictionary-heading"
      className="dictionary-section"
    >
      <div className="page-shell dictionary-layout">
        <Reveal className="dictionary-intro">
          <p className="eyebrow">{t("example_title")}</p>
          <h2 id="dictionary-heading">{t("headline")}</h2>
          <p className="dictionary-description mt-6">{t("description")}</p>
        </Reveal>
        <Reveal className="dictionary-main-image">
          <figure>
            <Image
              className="dictionary-screenshot"
              src={DICTIONARY_IMAGE_URL}
              alt={r("dictionary_alt")}
              width={1874}
              height={1216}
              sizes="(max-width: 767px) 100vw, 550px"
            />
            <figcaption className="mt-4">{r("dictionary_caption")}</figcaption>
          </figure>
        </Reveal>
        <Reveal className="dictionary-suggestions">
          <h3 className="dictionary-learning">{t("learning_title")}</h3>
          <p className="dictionary-learning-description mt-3 leading-relaxed">
            {t("learning_description")}
          </p>
          <div className="suggestion-crop">
            <Image
              src={DICTIONARY_SUGGESTION_IMAGE_URL}
              alt={r("dictionary_suggestion_alt")}
              width={825}
              height={442}
              sizes="(max-width: 420px) 100vw, 415px"
            />
          </div>
          <p className="dictionary-compatibility">{t("compatibility_note")}</p>
        </Reveal>
      </div>
    </section>
  );
}
