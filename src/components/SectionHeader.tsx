import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeader({
  eyebrow,
  title,
  text,
  align = "left",
  className,
  children,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <div
          className={cn(
            "mb-4 flex items-center gap-3",
            align === "center" && "justify-center",
          )}
        >
          <span className="h-px w-8 bg-gold-gradient" aria-hidden />
          <span className="eyebrow">{eyebrow}</span>
        </div>
      ) : null}
      <h2 className="text-3xl leading-[1.15] text-foreground sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {text ? (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">
          {text}
        </p>
      ) : null}
      {children}
    </Reveal>
  );
}
