type ToastType = "info" | "success" | "danger" | "default" | "warning";
type ToastManagerOptions = {
  timeout?: number;
};
class ToastManager {
  private options: ToastManagerOptions;
  private toastContainer: HTMLElement;
  private static instance: HTMLElement;
  constructor(options?: ToastManagerOptions) {
    this.options = options || { timeout: 3000 };

    if (ToastManager.instance) {
      this.toastContainer = ToastManager.instance;
    } else {
      // create toast container
      const toastContainer = document.createElement("div");
      toastContainer.id = "toasts";

      // add toast container to body
      document.body.appendChild(toastContainer);

      // set toast container
      this.toastContainer = toastContainer;

      // set instance
      ToastManager.instance = toastContainer;
    }
  }

  toast(message: string, type: ToastType = "default") {
    const toast = new Toast(message, type, this.options.timeout);
    this.toastContainer.appendChild(toast.element);
    setTimeout(() => {
      // run exit animation
      const animation = toast.element.animate(
        [{ opacity: 0, transform: "translateX(250px)" }],
        {
          duration: 250,
        }
      );
      // wait for animation to finish
      animation.onfinish = () => {
        toast.element.remove();
      };
    }, this.options.timeout);
  }

  success(message: string) {
    this.toast(message, "success");
  }

  info(message: string) {
    this.toast(message, "info");
  }

  danger(message: string) {
    this.toast(message, "danger");
  }

  warning(message: string) {
    this.toast(message, "warning");
  }
}

class Toast {
  public element: HTMLElement;
  constructor(
    private message: string,
    private type: ToastType = "default",
    private duration: number = 3000
  ) {
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.classList.add(`toast-${type}`);
    toast.style.setProperty("--toast-duration", `${duration}ms`);
    toast.innerText = message;

    this.element = toast;
  }

  onDismiss(cb: () => void) {
    // run exit animation
    const animation = this.element.animate(
      [{ opacity: 0, transform: "translateX(100%)" }],
      {
        duration: 250,
      }
    );
    // wait for animation to finish
    animation.onfinish = () => {
      this.element.remove();
      cb();
    };
  }

  close() {
    this.onDismiss(() => {});
  }
}

const input = document.querySelector("#message") as HTMLInputElement;
const toastButton = document.querySelector("#show-toast") as HTMLButtonElement;

toastButton.addEventListener("click", () => {
  const toastManager = new ToastManager();
  toastManager.success(input.value);
});
