import React from "react";

export type TItem = {
  key: string;
  value: string;
  active?: boolean;
};
export type TProps = {
  items: TItem[];
  addTitle?: string;
  addPlaceholder?: string;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
  onChangeKey(arg: { id: any; key: string }): void;
  onChangeValue(arg: { id: any; value: string }): void;
  onChangeActive?(arg: { id: any; active: boolean }): void;
  onRemove(id: any): void;
  onAdd(): void;
  valueRenderer?: (data: {
    row: any;
    id: any;
    placeholder: string;
  }) => React.ReactElement;
};
