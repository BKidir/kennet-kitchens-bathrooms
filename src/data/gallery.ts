import type { ImageKey } from '@/data/images';

export type GalleryCategory = 'kitchens' | 'bathrooms' | 'wet-rooms';

export interface GalleryItem {
  image: ImageKey;
  category: GalleryCategory;
  title: string;
  location: string;
  /** Link to a full case study, where one exists. */
  href?: string;
}

/** Projects page gallery. Order = display order. */
export const GALLERY: GalleryItem[] = [
  { image: 'oldTownAfter', category: 'kitchens', title: 'Sage Shaker kitchen with island', location: 'Old Town, Swindon', href: '/projects/sage-shaker-kitchen-old-town-swindon' },
  { image: 'wroughtonAfter', category: 'bathrooms', title: 'Panelled family bathroom', location: 'Wroughton', href: '/projects/family-bathroom-wroughton' },
  { image: 'bassettAfter', category: 'wet-rooms', title: 'Level-access wet room', location: 'Royal Wootton Bassett', href: '/projects/accessible-wet-room-royal-wootton-bassett' },
  { image: 'navyKitchen', category: 'kitchens', title: 'Deep blue-green kitchen', location: 'Highworth' },
  { image: 'enSuiteCirencester', category: 'bathrooms', title: 'Cottage en-suite', location: 'Cirencester' },
  { image: 'wetRoomHighworth', category: 'wet-rooms', title: 'Grey-tiled wet room', location: 'Highworth' },
  { image: 'oakKitchen', category: 'kitchens', title: 'Cottage kitchen, timber worktops', location: 'Marlborough' },
  { image: 'cloakroomWroughton', category: 'bathrooms', title: 'Under-stairs cloakroom', location: 'Wroughton' },
  { image: 'greyKitchen', category: 'kitchens', title: 'L-shaped grey kitchen', location: 'Chippenham' },
  { image: 'wetRoomMarlborough', category: 'wet-rooms', title: 'En-suite wet room', location: 'Marlborough' },
  { image: 'refreshKitchen', category: 'kitchens', title: 'New doors and worktops', location: 'Wichelstowe, Swindon' },
  { image: 'bathroomChippenham', category: 'bathrooms', title: 'Metro tiles and brass shower', location: 'Chippenham' },
  { image: 'bassettKitchen', category: 'kitchens', title: 'Family kitchen and utility', location: 'Royal Wootton Bassett' },
];

export const CATEGORY_LABELS: Record<GalleryCategory, string> = {
  kitchens: 'Kitchens',
  bathrooms: 'Bathrooms',
  'wet-rooms': 'Wet rooms',
};
