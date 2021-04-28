export type TItem = {
  key: string;
  value: string;
  active?: boolean;
};
export type TProps = {
  items: TItem[];
  addPlaceholder?: string;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
  onChangeKey(arg: { id: any; key: string }): void;
  onChangeValue(arg: { id: any; value: string }): void;
  onChangeActive?(arg: { id: any; active: boolean }): void;
  onRemove(id: any): void;
  onAdd(): void;
};
