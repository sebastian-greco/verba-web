import { useTranslations } from "next-intl";
import Reveal from "@/components/home/Reveal";

export default function WorkflowDemo() {
  const t = useTranslations("demo");
  return (
    <div className="workflow-demo compact-workflow">
      <div className="workflow-grid">
        {["hold", "speak", "done"].map((key, i) => (
          <Reveal key={key} className="workflow-step" delay={i * 0.08}>
            <span className="step-number">{`0${i + 1}`}</span>
            <h3>
              {i === 0
                ? t.rich("step_hold_key", {
                    key: () => (
                      <kbd className="inline-fn">
                        {"fn"}
                        <span aria-hidden="true">↙</span>
                      </kbd>
                    ),
                  })
                : t(`step_${key}`)}
            </h3>
            <p>{t(`step_0${i + 1}_desc`)}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
