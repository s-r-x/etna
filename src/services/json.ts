export const JsonService = {
  parse(value: string) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  },
  stringify(value: any) {
    return JSON.stringify(value);
  },
};
