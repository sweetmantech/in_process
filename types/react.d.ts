/// <reference types="react" />
/// <reference types="react-dom" />

declare module "react" {
  export * from "@types/react";
  
  // Re-export key types for explicit access
  export type FC<P = {}> = React.FC<P>;
  export type ButtonHTMLAttributes<T> = React.ButtonHTMLAttributes<T>;
  export type MouseEvent<T = Element, E = NativeMouseEvent> = React.MouseEvent<T, E>;
  export type ReactNode = React.ReactNode;
  export type JSX = React.JSX;
}

// Ensure JSX namespace is available globally
declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
    interface ElementClass extends React.Component<any> {}
    interface ElementAttributesProperty {
      props: {};
    }
    interface ElementChildrenAttribute {
      children: {};
    }
    interface IntrinsicAttributes extends React.Attributes {}
    interface IntrinsicClassAttributes<T> extends React.ClassAttributes<T> {}
    interface IntrinsicElements extends React.IntrinsicElements {}
  }
}