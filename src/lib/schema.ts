import { BUSINESS, AREAS } from '@/config';

/** Absolute URL helper. */
export const abs = (path: string, site: URL | undefined) => new URL(path, site).href;

export function businessId(site: URL | undefined) {
  return abs('/#business', site);
}

/** HomeAndConstructionBusiness (a LocalBusiness subtype). NAP matches the footer exactly. */
export function localBusiness(site: URL | undefined, image?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': businessId(site),
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    slogan: BUSINESS.tagline,
    url: abs('/', site),
    logo: abs('/logo.png', site),
    image: image ?? abs('/og/default.png', site),
    telephone: BUSINESS.phone.e164,
    email: BUSINESS.email,
    foundingDate: String(BUSINESS.foundingYear),
    numberOfEmployees: { '@type': 'QuantitativeValue', value: BUSINESS.teamSize },
    priceRange: BUSINESS.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.locality,
      addressRegion: BUSINESS.address.region,
      postalCode: BUSINESS.address.postcode,
      addressCountry: BUSINESS.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: BUSINESS.geo.lat, longitude: BUSINESS.geo.lng },
    hasMap: BUSINESS.mapUrl,
    openingHoursSpecification: BUSINESS.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.schema,
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: AREAS.map((a) => ({ '@type': 'City', name: a.name })),
    knowsAbout: ['Kitchen design', 'Kitchen installation', 'Bathroom installation', 'Wet rooms', 'Tiling', 'Accessible bathrooms'],
  };
}

export function website(site: URL | undefined) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': abs('/#website', site),
    url: abs('/', site),
    name: BUSINESS.name,
    inLanguage: 'en-GB',
    publisher: { '@id': businessId(site) },
  };
}

export function service(
  site: URL | undefined,
  opts: { name: string; description: string; path: string; serviceType: string },
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: abs(opts.path, site),
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      '@id': businessId(site),
      name: BUSINESS.name,
      telephone: BUSINESS.phone.e164,
      address: {
        '@type': 'PostalAddress',
        addressLocality: BUSINESS.address.locality,
        postalCode: BUSINESS.address.postcode,
        addressCountry: BUSINESS.address.country,
      },
    },
    areaServed: AREAS.map((a) => ({ '@type': 'City', name: a.name })),
  };
}

export type Crumb = { name: string; href: string };

export function breadcrumbs(site: URL | undefined, crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.href, site),
    })),
  };
}

export type Faq = { q: string; a: string };

/** Strips simple HTML/markdown links from answers for schema text. */
const plain = (s: string) => s.replace(/<[^>]+>/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

export function faqPage(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: plain(f.a) },
    })),
  };
}

export function article(
  site: URL | undefined,
  opts: { title: string; description: string; path: string; published: Date; updated?: Date; image: string },
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    mainEntityOfPage: abs(opts.path, site),
    url: abs(opts.path, site),
    image: opts.image,
    datePublished: opts.published.toISOString(),
    dateModified: (opts.updated ?? opts.published).toISOString(),
    inLanguage: 'en-GB',
    author: { '@type': 'Organization', name: BUSINESS.name, url: abs('/about', site) },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS.name,
      logo: { '@type': 'ImageObject', url: abs('/logo.png', site) },
    },
  };
}
