"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
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
    <div className="mt-6 mb-2">
      <div className="flex items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
        <code className="font-mono text-base md:text-lg text-[#ff9f0a] tracking-wider select-all break-all">
          {licenseKey}
        </code>
        <button
          onClick={copy}
          className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200"
          style={{
            background: copied ? "rgba(48, 209, 88, 0.15)" : "rgba(255,255,255,0.08)",
            color: copied ? "#30d158" : "rgba(255,255,255,0.7)",
            border: copied ? "1px solid rgba(48,209,88,0.3)" : "1px solid rgba(255,255,255,0.1)",
          }}
          aria-label={t("copy")}
        >
          {copied ? (
            <>
              <Check size={14} strokeWidth={2.5} />
              {t("copied")}
            </>
          ) : (
            <>
              <Copy size={14} strokeWidth={2} />
              {t("copy")}
            </>
          )}
        </button>
      </div>
      <p className="text-xs text-center mt-2 text-white/35">
        {t("save_key_note")}
      </p>
    </div>
  );
}
