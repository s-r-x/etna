export const getColorForHttpStatus = (status: number): string => {
  if (status >= 100 && status < 200) {
    return "cyan";
  }
  if (status >= 200 && status < 300) {
    return "green";
  }
  if (status >= 300 && status < 400) {
    return "blue";
  }
  if (status >= 400) {
    return "red";
  }
  return "";
};
