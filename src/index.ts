import { Hono } from 'hono';
import type { Context } from './context';
import { build_url, create_origin, has_trailing_slash, Matcher } from './helpers';

const app = new Hono<Context>();

app.get('*', async (c) => {
  const { DOMAIN, WEBFLOW_SUBDOMAIN, SUBDOMAINS, R2PATH, ROOT_FILES } = c.env;
  const { origin, hostname, pathname, search } = new URL(c.req.url);

  const main_origin = create_origin(DOMAIN);

  const paths = pathname.split('/').filter(Boolean);

  const matcher = new Matcher(SUBDOMAINS);

  // Handle when hostname has a subdomain
  if (hostname !== DOMAIN) {
    // Subdomain is reverse proxied
    const match = matcher.subdomain_to_path(hostname);
if (match) {
	const redirect_url = build_url([main_origin, match, paths], search);

	return c.redirect(redirect_url, 301);
}

// Subdomain is the main Webflow project
if (hostname.startsWith(WEBFLOW_SUBDOMAIN)) {
	const redirect_url = build_url([main_origin, paths], search);

	return c.redirect(redirect_url, 301);
}


  }

  // Handle trailing slashes
  if (paths.length && has_trailing_slash(pathname)) {
    const redirect_url = build_url([origin, paths], search);

    return c.redirect(redirect_url, 301);
  }

  // Path matches reverse proxied subdomain
  const match = matcher.path_to_subdomain(paths);
  if (match) {
    const { subdomain, wildcard_paths } = match;

    const target_origin = create_origin(`${subdomain}.${DOMAIN}`);
    const target_url = build_url([target_origin, wildcard_paths], search);

    const response = await fetch(target_url);

    // Handle redirected responses
    if (response.redirected && response.url) {
      return c.redirect(response.url, 301);
    }

    return response;
  }

  // check all files
  const filename: string = pathname.split('/').pop()!;
  console.log(filename);
  const ROOT_FILES_ARRAY = ROOT_FILES.split(',');
  console.log(ROOT_FILES_ARRAY);
  if (ROOT_FILES_ARRAY.includes(filename)) {
    const target_url = build_url([R2PATH, filename], search);
    console.log(target_url);
    const response = await fetch(`https://${target_url}`);
    console.log(response);
    // Handle redirected responses
    if (response.redirected && response.url) {
      return c.redirect(response.url, 301);
    }

    return response;
  }

  // If no subdomains are matched, fetch from the main Webflow project
  const webflow_origin = create_origin(`${WEBFLOW_SUBDOMAIN}.${DOMAIN}`);
  const target_url = await build_url([webflow_origin, paths], search);
  const response = await fetch(target_url);


  // Handle redirected responses
  if (response.redirected && response.url) {
    return c.redirect(response.url, 301);
  }

  return response;
});

export default app;