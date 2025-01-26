import { Field, Input as HeadlessInput, Label } from "@headlessui/react";
import "./Input.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
export function Input({ label, id, ...inputProps }: Props) {
  const inputMarkup = (
    <HeadlessInput type="text" className="input text-sm" {...inputProps} />
  );
  const hasLabel = Boolean(label);
  return hasLabel ? (
    <Field className="input-field">
      <Label className="input-label text-sm" htmlFor={id}>
        {label}
      </Label>
      {inputMarkup}
    </Field>
  ) : (
    inputMarkup
  );
}
