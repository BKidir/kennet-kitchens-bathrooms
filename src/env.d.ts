/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly PUBLIC_IS_DEMO?: string;
  readonly PUBLIC_FORM_ENDPOINT?: string;
  readonly SITE_URL?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
