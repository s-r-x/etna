export type TItem = {
  id?: string;
  key: string;
  value: string;
  active?: boolean;
};
export type TProps = {
  items: TItem[];
  updateByIdx?: boolean;
  useIdxAsKey?: boolean;
  addPlaceholder?: string;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
  onChangeKey(arg: { id: string | number; key: string }): void;
  onChangeValue(arg: { id: string | number; value: string }): void;
  onChangeActive?(arg: { id: string | number; active: boolean }): void;
  onRemove(id: string | number): void;
  onAdd(): void;
};
