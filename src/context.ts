type Env = {
  DOMAIN: string;
  WEBFLOW_SUBDOMAIN: string;
  SUBDOMAINS: string;
  R2PATH: string;
  ROOT_FILES: string;
};

export type Context = {
  Bindings: Env;
};