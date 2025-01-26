import classNames from "classnames";
import { PropsWithChildren } from "react";

type TextSize =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl";

interface Props extends PropsWithChildren {
  size?: TextSize;
  className?: string;
  as?: React.ElementType
}

export function Text({ size, as = "div", className, ...rest}: Props) {
  const textClasses = classNames(
    `text-${size || "base"}`,
    className
  );
  const Component = as;

  return <Component className={textClasses} {...rest}/>
}
