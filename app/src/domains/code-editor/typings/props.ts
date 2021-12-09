export type TCodeEditorProps = {
  gqlSchema?: TAnyDict;
  mode: string;
  onChange?(value: string): void;
  value: string;
  readOnly?: boolean;
  expanded?: boolean;
  extra?: React.ReactNode;
  allowPrettify?: boolean;
};