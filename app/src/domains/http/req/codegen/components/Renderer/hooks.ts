import { useSelector } from "react-redux";
import { HttpCodegenSelectors } from "../../store/selectors";

export const useSnippetRendererMode = (): string => {
  const target = useSelector(HttpCodegenSelectors.getTarget);
  switch (target) {
    case "javascript":
    case "node":
      return "javascript";
    case "php":
    case "shell":
    case "python":
      return target;
    case "java":
      return "text/x-java";
    case "csharp":
      return "text/x-csharp";
    default:
      return "";
  }
};
