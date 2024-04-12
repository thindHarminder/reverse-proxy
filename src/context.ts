type Env = {
  DOMAIN: string;
  WEBFLOW_SUBDOMAIN: string;
  SUBDOMAINS: string;
  ROOT: R2Bucket;
};

export type Context = {
  Bindings: Env;
};