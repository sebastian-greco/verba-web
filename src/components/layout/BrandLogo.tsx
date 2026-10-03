import Image from "next/image";
import { cn } from "@/lib/utils";

export default function BrandLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/verba-wordmark.svg"
      alt="Verba"
      width={375}
      height={133}
      className={cn(
        "h-9 w-auto max-w-none shrink-0 object-contain dark:brightness-0 dark:invert",
        className,
      )}
    />
  );
}
