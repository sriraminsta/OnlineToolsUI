/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL for REST APIs (no trailing slash). Example: https://jsonplaceholder.typicode.com */
  readonly VITE_API_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
