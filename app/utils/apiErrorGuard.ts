import { notify } from "../(User)/Component/ToastComponent";

const showError = new Set<string>();

export function showErrorOnce(key: string, message: string) {
  if (showError.has(key)) return;
  showError.add(key);

  notify({
    message: message || "Something went wrong",
    type: "error",
  });
}
