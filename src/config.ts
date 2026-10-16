/**
 * Site-wide settings. To reuse this site for a real client, start here:
 * change the business details below, then set PUBLIC_IS_DEMO=false.
 */

/**
 * Demo mode. When true, every page gets `noindex, nofollow` and the footer
 * shows the "fictional business" notice. Set PUBLIC_IS_DEMO=false in the
 * environment (or change the default here) for a real launch.
 */
export const IS_DEMO: boolean = import.meta.env.PUBLIC_IS_DEMO !== 'false';

/** Where forms post. Empty string = built-in stub (shows the success state only). */
export const FORM_ENDPOINT: string = import.meta.env.PUBLIC_FORM_ENDPOINT ?? '';

export const DEMO_CREDIT = {
  text: 'Concept website designed by Bunyamin Kidir',
  url: 'https://bkidir.vercel.app',
  note: 'Kennet Kitchens & Bathrooms is a fictional business.',
};

export const BUSINESS = {
  name: 'Kennet Kitchens & Bathrooms',
  shortName: 'Kennet',
  legalName: 'Kennet Kitchens & Bathrooms Ltd',
  tagline: 'Kitchens and bathrooms designed, fitted and finished by one local team',
  foundingYear: 2012,
  teamSize: 9,
  projectsCompleted: '600+',
  guaranteeYears: 10,
  phone: {
    display: '01632 960 482',
    href: 'tel:+441632960482',
    e164: '+441632960482',
  },
  email: 'hello@kennetkitchens.example',
  address: {
    street: 'Unit 4, Kennet Court',
    locality: 'Swindon',
    region: 'Wiltshire',
    postcode: 'SN1 0AA',
    country: 'GB',
  },
  /** Approximate centre of Swindon. Replace with the real premises for a live site. */
  geo: { lat: 51.5558, lng: -1.7797 },
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Swindon+SN1',
  hours: [
    { days: 'Monday to Friday', short: 'Mon–Fri', opens: '08:00', closes: '17:30', schema: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
    { days: 'Saturday', short: 'Sat', opens: '09:00', closes: '13:00', schema: ['Saturday'] },
  ],
  closedNote: 'Closed Sundays and bank holidays',
  priceRange: '£££',
  trades: [
    'Gas Safe registered engineer on the team',
    'NICEIC-registered electrician on the team',
  ],
} as const;

export type AreaLink = { name: string; slug: string };

/** Order here is the order used in footers and area lists. */
export const AREAS: AreaLink[] = [
  { name: 'Swindon', slug: 'kitchen-bathroom-fitters-swindon' },
  { name: 'Royal Wootton Bassett', slug: 'kitchen-bathroom-fitters-royal-wootton-bassett' },
  { name: 'Wroughton', slug: 'kitchen-bathroom-fitters-wroughton' },
  { name: 'Highworth', slug: 'kitchen-bathroom-fitters-highworth' },
  { name: 'Chippenham', slug: 'kitchen-bathroom-fitters-chippenham' },
  { name: 'Marlborough', slug: 'kitchen-bathroom-fitters-marlborough' },
  { name: 'Cirencester', slug: 'kitchen-bathroom-fitters-cirencester' },
];

export type NavLink = { label: string; href: string; description?: string };

export const KITCHEN_LINKS: NavLink[] = [
  { label: 'Kitchen design & 3D planning', href: '/kitchen-design', description: 'Layouts, 3D visuals and a plan you can see before you buy' },
  { label: 'Kitchen installation', href: '/kitchen-installation', description: 'Strip-out to final clean, fitted by our own team' },
  { label: 'Kitchen worktops', href: '/kitchen-worktops', description: 'Quartz, granite, laminate and solid wood' },
  { label: 'Refurbishment & new doors', href: '/kitchen-refurbishment', description: 'Keep the carcasses, change the look' },
];

export const BATHROOM_LINKS: NavLink[] = [
  { label: 'Bathroom installation', href: '/bathroom-installation', description: 'Family bathrooms, fully managed' },
  { label: 'Wet rooms', href: '/wet-rooms', description: 'Level floors, properly tanked' },
  { label: 'En-suites', href: '/en-suites', description: 'Smart layouts for small spaces' },
  { label: 'Accessible & walk-in', href: '/accessible-bathrooms', description: 'Safer bathrooms that still look good' },
  { label: 'Cloakrooms & downstairs WCs', href: '/cloakrooms', description: 'A toilet where you need one most' },
  { label: 'Tiling', href: '/tiling', description: 'Walls, floors and wet areas' },
];

export const MAIN_NAV: (NavLink & { children?: NavLink[] })[] = [
  { label: 'Kitchens', href: '/kitchens', children: KITCHEN_LINKS },
  { label: 'Bathrooms', href: '/bathrooms', children: BATHROOM_LINKS },
  { label: 'Projects', href: '/projects' },
  { label: 'Our process', href: '/our-process' },
  { label: 'About', href: '/about' },
  { label: 'Advice', href: '/advice' },
  { label: 'Contact', href: '/contact' },
];

export const QUOTE_HREF = '/get-a-quote';
