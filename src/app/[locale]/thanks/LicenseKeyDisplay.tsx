"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function LicenseKeyDisplay({ licenseKey }: { licenseKey: string }) {
  const t = useTranslations("thanks");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(licenseKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-16 w-full max-w-sm mx-auto flex flex-col items-center">
      <div className="w-full bg-white/60 rounded-2xl p-5 flex items-center justify-between border border-white/80 shadow-sm relative z-10">
        <code className="text-stone-900 font-mono text-base tracking-wider font-semibold">
          {licenseKey}
        </code>
        <button
          onClick={copy}
          className="text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-2 text-sm font-bold ml-4"
          aria-label={t("copy")}
        >
          {copied ? (
            <span className="material-symbols-outlined text-lg text-emerald-600">check</span>
          ) : (
            <span className="material-symbols-outlined text-lg">content_copy</span>
          )}
        </button>
      </div>
      <p className="text-xs text-center mt-3 text-stone-500 font-medium">
        {t("save_key_note")}
      </p>
    </div>
  );
}
