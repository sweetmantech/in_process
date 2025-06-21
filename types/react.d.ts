declare module "react" {
  export * from "@types/react";
}

declare module "react-dom" {
  export * from "@types/react-dom";
}

declare module "sonner" {
  export function toast(message: string): void;
}