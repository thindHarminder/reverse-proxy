type Env = {
  DOMAIN: string;
  WEBFLOW_SUBDOMAIN: string;
  SUBDOMAINS: string;
  ROOT_FILES: string;
  ROOT: R2Bucket;
};

export type Context = {
  Bindings: Env;
};