// src/components/ui/button.tsx
import { cn } from "../../../lib/utils";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "outline";
};

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  const baseStyle =
    "px-5 py-2 rounded-xl text-sm font-medium transition-colors duration-200";
  const variants = {
    default: "bg-white text-black hover:bg-neutral-200",
    secondary: "bg-yellow-400 text-black hover:bg-yellow-300",
    outline: "border border-white text-white hover:bg-white hover:text-black",
  };

  return (
    <button
      className={cn(baseStyle, variants[variant], className)}
      {...props}
    />
  );
}
