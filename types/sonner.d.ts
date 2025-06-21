declare module "sonner" {
  export interface ToastOptions {
    description?: string;
    action?: {
      label: string;
      onClick: () => void;
    };
    cancel?: {
      label: string;
      onClick?: () => void;
    };
    id?: string | number;
    duration?: number;
    dismissible?: boolean;
    onDismiss?: (toast: ToastT) => void;
    onAutoClose?: (toast: ToastT) => void;
  }

  export interface ToastT {
    id: string | number;
    title?: string;
    description?: string;
    type?: "success" | "error" | "info" | "warning" | "loading" | "default";
  }

  export function toast(message: string, options?: ToastOptions): string | number;
  export function toast(message: string): string | number;
  
  export namespace toast {
    function success(message: string, options?: ToastOptions): string | number;
    function error(message: string, options?: ToastOptions): string | number;
    function info(message: string, options?: ToastOptions): string | number;
    function warning(message: string, options?: ToastOptions): string | number;
    function loading(message: string, options?: ToastOptions): string | number;
    function dismiss(id?: string | number): void;
  }

  export interface ToasterProps {
    theme?: "light" | "dark" | "system";
    richColors?: boolean;
    expand?: boolean;
    position?:
      | "top-left"
      | "top-center"
      | "top-right"
      | "bottom-left"
      | "bottom-center"
      | "bottom-right";
    visibleToasts?: number;
    closeButton?: boolean;
    toastOptions?: ToastOptions;
    className?: string;
    style?: React.CSSProperties;
    offset?: string | number;
    dir?: "rtl" | "ltr" | "auto";
  }

  export function Toaster(props?: ToasterProps): JSX.Element;
}