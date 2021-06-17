export const normalizeKeyboardCode = (rawKey: string): string => {
  const key = rawKey.toLowerCase();
  const letterMatch = key.match(/^key([a-zA-Z]{1})/);
  if (letterMatch) {
    return letterMatch[1];
  }
  if (letterMatch) {
    return letterMatch[1];
  }
  const digitMatch = key.match(/^digit([0-9]){1}/);
  if (digitMatch) {
    return digitMatch[1];
  }
  const mapping = {
    shiftleft: "shift",
    shiftright: "shift",
    altleft: "alt",
    altright: "alt",
    capslock: "ctrl",
    controlleft: "ctrl",
    controlright: "ctrl",
    semicolon: ";",
    quote: "'",
    bracketright: "[",
    bracketleft: "]",
    slash: "/",
    metaleft: "meta",
    metaright: "meta",
    arrowleft: "left",
    arrowright: "right",
    arrowup: "top",
    arrowdown: "down",
    period: ".",
    comma: ",",
    backslash: "\\",
    backquote: "`",
  };
  return key in mapping ? mapping[key] : key;
};
