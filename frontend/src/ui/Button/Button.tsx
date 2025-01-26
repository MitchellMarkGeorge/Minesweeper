import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import { Button as HeadlessButton } from "@headlessui/react";

import "./Button.css";
import classNames from "classnames";
import { Spinner } from "../Spinner";

type ButtonVariantType = "primary" | "secondary" | "destructive";

const buttonVariants = cva("button", {
  variants: {
    variant: {
      primary: "button-primary",
      secondary: "button-secondary",
      destructive: "button-destructive",
    },
  },
});

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  fullWidth?: boolean;
  variant?: ButtonVariantType;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      fullWidth = false,
      disabled,
      children,
      loading = false,
      ...props
    },
    ref
  ) => {
    const buttonClasses = classNames(
      buttonVariants({ variant, className }),
      "text-base",
      {
        "full-width": fullWidth,
      }
    );
    return (
      <HeadlessButton
        className={buttonClasses}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {loading ? <Spinner size={"1rem"} /> : children}
      </HeadlessButton>
    );
  }
);


