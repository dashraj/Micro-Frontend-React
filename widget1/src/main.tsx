/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef, useState } from "react";
import App, { AppExternalProps } from "./App.tsx";
import r2wc from "@r2wc/react-to-web-component";

const indexCss = import.meta.glob("/src/index.scss", {
  as: "raw",
  eager: true,
});

// Prepare stylesheets for injection
const cssModules = { ...indexCss };

const styleSheets: CSSStyleSheet[] = [];

for (const path in cssModules) {
  const temp = new CSSStyleSheet();
  temp.replaceSync(cssModules[path]);
  styleSheets.push(temp);
}

// Define web component (with shadow dom)
const AppPlusShadowStyles = (props: AppExternalProps) => {
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null);
  const topRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (topRef && topRef.current && topRef.current.parentNode) {
      setShadowRoot(topRef.current.parentNode as ShadowRoot);

      (topRef.current.parentNode as ShadowRoot).adoptedStyleSheets = [
        ...styleSheets,
      ];
    }
  }, []);

  return (
    <section id="widget" ref={topRef} className="h-100">
      {shadowRoot && (
        <App target={shadowRoot as unknown as Element} {...props} />
      )}
    </section>
  );
};

const APP_EXTERNAL_PROPS: Partial<
  Record<
    keyof AppExternalProps,
    "string" | "number" | "boolean" | "function" | "json"
  >
> = {
  customerId: "string",
  category: "string",
};

const WebComponent = r2wc(AppPlusShadowStyles, {
  shadow: "open",
  props: APP_EXTERNAL_PROPS,
});
customElements.define("app-test", WebComponent);
