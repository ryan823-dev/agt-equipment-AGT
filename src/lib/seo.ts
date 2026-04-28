const DEFAULT_SITE_URL = 'https://miniironpro.com';

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, '');
}

export const SITE_URL = trimTrailingSlash(
  process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    DEFAULT_SITE_URL
);

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}

export function canonicalUrl(path = '/') {
  if (path === '/' || path === '') {
    return SITE_URL;
  }

  const url = absoluteUrl(path);
  return url.endsWith('/') ? url : `${url}/`;
}

export function stripBrandSuffix(title: string) {
  return title.replace(/\s*\|\s*AGT Equipment\s*$/i, '').trim();
}

export function seoDescription(value = '', maxLength = 155) {
  const text = value
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (text.length <= maxLength) {
    return text;
  }

  const snippet = text.slice(0, maxLength + 1);
  const lastSpace = snippet.lastIndexOf(' ');
  const cutIndex = lastSpace > 80 ? lastSpace : maxLength;

  return `${snippet.slice(0, cutIndex).replace(/[.,;:\s]+$/g, '')}...`;
}
