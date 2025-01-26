import "./Spinner.css";

interface Props {
  size: string | number;
}

export function Spinner({ size }: Props) {
  return <span className="spinner" style={{ height: size, width: size }} />;
}