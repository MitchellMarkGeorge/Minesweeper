import {
  Field,
  Select as HeadlessSelect,
  SelectProps,
  Label,
} from "@headlessui/react";
import "../Input/Input.css"; // shares styles with input component

interface SelectOption<T extends string> {
  text: string;
  value: T;
}
interface Props<T extends string> extends SelectProps {
  options: SelectOption<T>[];
  label?: string;
}
export function Select<T extends string>({
  options,
  label,
  id,
  ...rest
}: Props<T>) {
  const hasLabel = Boolean(label);
  const selectMarkup = (
    <HeadlessSelect className="select text-sm" {...rest} id={id}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.text}
        </option>
      ))}
    </HeadlessSelect>
  );
  return hasLabel ? (
    <Field className="select-field">
      <Label className="select-label text-sm" htmlFor={id}>
        {label}
      </Label>
      {selectMarkup}
    </Field>
  ) : (
    selectMarkup
  );
}
