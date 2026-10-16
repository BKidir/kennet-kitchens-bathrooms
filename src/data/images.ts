/**
 * Image registry: the single list of every photo the site uses.
 *
 * To add a real photo, save it as `src/assets/images/<file>.jpg` (or .png/.webp/.avif)
 * using the `file` name below. The <Img> component picks it up automatically and
 * generates AVIF + WebP at responsive sizes. Until then a neutral placeholder with
 * the correct aspect ratio is shown, so layout and CLS stay accurate.
 *
 * `npm run docs:images` regenerates docs/image-list.md from this file.
 */

export type Ratio = '16/9' | '3/2' | '4/3' | '1/1' | '4/5' | '21/9';

export interface ImageEntry {
  /** File name without extension (descriptive and keyword-relevant). */
  file: string;
  alt: string;
  ratio: Ratio;
  /** Recommended source width in pixels. */
  width: number;
  usedOn: string[];
  search: string;
  prompt: string;
  /** Placeholder tone, purely cosmetic until the real photo is added. */
  tone?: 'warm' | 'cool' | 'sage' | 'stone' | 'navy' | 'oak';
}

const STYLE = 'natural daylight, warm neutral tones, modern British home, photorealistic, no people, no visible brand logos';

export const images = {
  heroKitchen: {
    file: 'handleless-kitchen-island-swindon',
    alt: 'Bright open-plan kitchen with a long marble-effect island, bar stools and pendant lights',
    ratio: '16/9', width: 2400, tone: 'warm',
    usedOn: ['Home hero', 'Kitchens hub', 'Open Graph default'],
    search: 'modern handleless kitchen island natural light',
    prompt: `Wide shot of a modern handleless kitchen in soft putty colour with a large island, pale quartz worktop, three oak bar stools, bi-fold doors to a garden, ${STYLE}`,
  },
  shakerSage: {
    file: 'shaker-kitchen-sage-green-swindon',
    alt: 'Sage green Shaker-style kitchen with brass handles, white worktops and a window over the sink',
    ratio: '4/3', width: 1600, tone: 'sage',
    usedOn: ['Home services card', 'Kitchens hub', 'Kitchen installation'],
    search: 'sage green shaker kitchen brass handles',
    prompt: `Sage green in-frame Shaker kitchen, brass cup handles, white quartz worktop, open shelving, Victorian terrace, ${STYLE}`,
  },
  panelledBathroom: {
    file: 'panelled-bathroom-freestanding-bath',
    alt: 'Freestanding white bath with a matt black floor-standing tap against a soft plaster wall',
    ratio: '4/3', width: 1600, tone: 'stone',
    usedOn: ['Home services card', 'Bathrooms hub'],
    search: 'freestanding bath panelled bathroom',
    prompt: `Family bathroom with painted wall panelling, freestanding white bath, brushed brass floor-standing tap, herringbone floor tiles, ${STYLE}`,
  },
  kitchenDesign: {
    file: 'kitchen-designer-plans-client-swindon',
    alt: 'Hands comparing colour swatches and fabric samples while planning a design',
    ratio: '3/2', width: 1600, tone: 'oak',
    usedOn: ['Kitchen design', 'Our process', 'About'],
    search: 'kitchen design plans samples table',
    prompt: `Table with printed kitchen floor plans, painted door samples, quartz offcuts and a laptop showing a 3D kitchen render, hands only, ${STYLE}`,
  },
  kitchenInstall: {
    file: 'kitchen-fitter-installing-units',
    alt: 'Fitter using a cordless drill to fix a kitchen unit',
    ratio: '3/2', width: 1600, tone: 'stone',
    usedOn: ['Kitchen installation'],
    search: 'carpenter installing kitchen cabinets',
    prompt: `Close-up of a kitchen fitter's hands levelling a base cabinet with a spirit level, tools on dust sheet, face not visible, ${STYLE}`,
  },
  quartzWorktop: {
    file: 'quartz-worktop-detail-kitchen',
    alt: 'White veined stone-effect worktop with an undermount sink and a pull-down tap',
    ratio: '3/2', width: 1600, tone: 'cool',
    usedOn: ['Kitchen worktops', 'Kitchens hub'],
    search: 'quartz worktop undermount sink close up',
    prompt: `Close-up of a white quartz worktop with soft grey veining, undermount stainless sink and routed drainer grooves, ${STYLE}`,
  },
  doorReplacement: {
    file: 'kitchen-door-replacement-painted',
    alt: 'Kitchen with grey Shaker doors, a marble-effect splashback and black pendant lights',
    ratio: '3/2', width: 1600, tone: 'warm',
    usedOn: ['Kitchen refurbishment'],
    search: 'painted kitchen cabinet doors refurbished',
    prompt: `Kitchen with new matt painted slab doors in warm grey and long bar handles on existing units, new laminate worktop, ${STYLE}`,
  },
  bathroomInstall: {
    file: 'modern-bathroom-installation-swindon',
    alt: 'Modern bathroom with a wall-hung oak vanity, black basin and large stone-effect tiles',
    ratio: '3/2', width: 1600, tone: 'stone',
    usedOn: ['Bathroom installation', 'Bathrooms hub'],
    search: 'modern bathroom wall hung vanity large tiles',
    prompt: `Modern family bathroom, wall-hung oak vanity, large-format stone-effect porcelain tiles, bath with fixed glass screen and thermostatic shower, ${STYLE}`,
  },
  wetRoom: {
    file: 'wet-room-linear-drain-glass-screen',
    alt: 'Walk-in shower with a frameless glass screen and wood-effect wall tiles',
    ratio: '3/2', width: 1600, tone: 'cool',
    usedOn: ['Wet rooms', 'Bathrooms hub'],
    search: 'wet room linear drain glass screen',
    prompt: `Wet room with level-access tiled floor, stainless linear drain along the wall, single frameless glass screen, rainfall shower, ${STYLE}`,
  },
  enSuite: {
    file: 'en-suite-shower-room-oak-vanity',
    alt: 'Compact shower room with marble-effect tiles, a glass screen and a white toilet',
    ratio: '3/2', width: 1600, tone: 'oak',
    usedOn: ['En-suites'],
    search: 'small en suite shower room oak vanity',
    prompt: `Compact en-suite shower room with oak vanity, round mirror, walk-in shower with fluted glass, small format wall tiles, ${STYLE}`,
  },
  accessible: {
    file: 'accessible-walk-in-shower-grab-rail',
    alt: 'Accessible bathroom with fold-up grab rails beside the toilet and a long oak vanity',
    ratio: '3/2', width: 1600, tone: 'warm',
    usedOn: ['Accessible bathrooms'],
    search: 'accessible bathroom walk in shower grab rail',
    prompt: `Stylish accessible bathroom, level walk-in shower, fold-down shower seat, brushed steel grab rails, contrasting non-slip floor, ${STYLE}`,
  },
  cloakroom: {
    file: 'compact-cloakroom-wc-basin',
    alt: 'Small bathroom with vertical terracotta tiles, a wall-hung toilet and black fittings',
    ratio: '3/2', width: 1600, tone: 'sage',
    usedOn: ['Cloakrooms'],
    search: 'small downstairs toilet cloakroom',
    prompt: `Small under-stairs cloakroom, short-projection toilet, compact corner basin, dark green gloss wall tiles, brass tap, ${STYLE}`,
  },
  tiling: {
    file: 'bathroom-tiling-in-progress',
    alt: 'Hand pressing a white tile into adhesive with spacers on a wall',
    ratio: '3/2', width: 1600, tone: 'stone',
    usedOn: ['Tiling'],
    search: 'tiler laying bathroom wall tiles',
    prompt: `Bathroom wall partly tiled with large-format porcelain, tile levelling clips visible, notched trowel and adhesive, hands only, ${STYLE}`,
  },
  walkInShower: {
    file: 'walk-in-shower-glass-screen',
    alt: 'Glass shower enclosure with white wall tiles in a bright bathroom',
    ratio: '3/2', width: 1600, tone: 'cool',
    usedOn: ['Advice: wet room vs walk-in shower'],
    search: 'walk in shower low profile tray',
    prompt: `Walk-in shower with low-profile stone resin tray, frameless glass screen, matt black thermostatic valve, ${STYLE}`,
  },
  samples: {
    file: 'kitchen-showroom-materials-samples',
    alt: 'Display of marble and stone worktop samples in grey, white and green',
    ratio: '3/2', width: 1600, tone: 'oak',
    usedOn: ['About', 'Contact'],
    search: 'material samples tiles worktops interior design',
    prompt: `Flat lay of worktop offcuts, tile samples, painted door swatches and brass handles on a timber workbench, ${STYLE}`,
  },
  vanTools: {
    file: 'fitters-tools-dust-sheets-tidy-site',
    alt: 'Drill, hammer, set square and hand tools laid out neatly on a timber board',
    ratio: '3/2', width: 1600, tone: 'stone',
    usedOn: ['Our process', 'About'],
    search: 'floor protection dust sheet renovation hallway',
    prompt: `Hallway with neat floor protection and dust sheets during a renovation, tool case closed, tidy, ${STYLE}`,
  },

  // Case study: Old Town kitchen
  oldTownBefore: {
    file: 'old-town-swindon-kitchen-before',
    alt: 'Before: dated kitchen with orange pine units and a chequered vinyl floor',
    ratio: '3/2', width: 1600, tone: 'stone',
    usedOn: ['Case study: Old Town kitchen', 'Home featured projects'],
    search: 'dated old kitchen before renovation',
    prompt: `Dated narrow galley kitchen in a Victorian terrace, 1990s oak-effect doors, tiled splashback, dim light, ${STYLE}`,
  },
  oldTownAfter: {
    file: 'old-town-swindon-kitchen-after',
    alt: 'After: green Shaker kitchen with a timber island, double ovens and a garden door',
    ratio: '3/2', width: 1600, tone: 'sage',
    usedOn: ['Case study: Old Town kitchen', 'Home featured projects', 'Projects gallery'],
    search: 'sage green kitchen island open plan',
    prompt: `Open-plan sage green Shaker kitchen with island and pendant lights in a Victorian terrace knock-through, ${STYLE}`,
  },
  oldTownIsland: {
    file: 'old-town-swindon-kitchen-island-seating',
    alt: 'Kitchen island with a wooden worktop, induction hob and three stools',
    ratio: '4/3', width: 1200, tone: 'sage',
    usedOn: ['Case study: Old Town kitchen'],
    search: 'kitchen island seating fluted panel',
    prompt: `Sage green kitchen island with quartz overhang, fluted end panel and two stools, ${STYLE}`,
  },
  oldTownLarder: {
    file: 'old-town-swindon-kitchen-larder',
    alt: 'Open larder cupboard with shelves of jars, baskets and spices',
    ratio: '4/5', width: 1200, tone: 'oak',
    usedOn: ['Case study: Old Town kitchen'],
    search: 'kitchen larder cupboard open',
    prompt: `Open tall kitchen larder cupboard with oak internal drawers, spice racks and jars, ${STYLE}`,
  },

  // Case study: Wroughton bathroom
  wroughtonBefore: {
    file: 'wroughton-bathroom-before',
    alt: 'Before: dated bathroom tiled floor to ceiling in dark blue with a basic suite',
    ratio: '3/2', width: 1600, tone: 'warm',
    usedOn: ['Case study: Wroughton bathroom', 'Home featured projects'],
    search: 'old bathroom 1970s avocado suite',
    prompt: `Dated 1970s bathroom with a coloured suite, small tiles, electric shower over the bath, ${STYLE}`,
  },
  wroughtonAfter: {
    file: 'wroughton-bathroom-after',
    alt: 'After: bright bathroom with a freestanding bath under the window and marble-effect walls',
    ratio: '3/2', width: 1600, tone: 'stone',
    usedOn: ['Case study: Wroughton bathroom', 'Home featured projects', 'Projects gallery'],
    search: 'family bathroom freestanding bath walk in shower',
    prompt: `Family bathroom with painted wall panelling, freestanding bath and separate walk-in shower, ${STYLE}`,
  },
  wroughtonVanity: {
    file: 'wroughton-bathroom-double-vanity',
    alt: 'Oak double vanity with two basins and pill-shaped mirrors',
    ratio: '4/3', width: 1200, tone: 'stone',
    usedOn: ['Case study: Wroughton bathroom'],
    search: 'double vanity unit bathroom mirror',
    prompt: `Painted double vanity unit with two countertop basins and a wide illuminated mirror, ${STYLE}`,
  },
  wroughtonTiles: {
    file: 'wroughton-bathroom-herringbone-floor',
    alt: 'Herringbone wood-effect floor with a warm natural finish',
    ratio: '4/5', width: 1200, tone: 'oak',
    usedOn: ['Case study: Wroughton bathroom'],
    search: 'herringbone tile floor bathroom',
    prompt: `Close-up of herringbone wood-effect porcelain floor tiles in a bathroom, ${STYLE}`,
  },

  // Case study: Royal Wootton Bassett wet room
  bassettBefore: {
    file: 'royal-wootton-bassett-wet-room-before',
    alt: 'Before: bathroom with a shower curtain over a high-sided bath',
    ratio: '3/2', width: 1600, tone: 'warm',
    usedOn: ['Case study: Royal Wootton Bassett wet room', 'Home featured projects'],
    search: 'old bathroom bath before renovation',
    prompt: `Tired bungalow bathroom with a high-sided bath, worn vinyl floor and a shower curtain, ${STYLE}`,
  },
  bassettAfter: {
    file: 'royal-wootton-bassett-wet-room-after',
    alt: 'After: walk-in shower with a thermostatic rail shower and a wall-hung basin',
    ratio: '3/2', width: 1600, tone: 'cool',
    usedOn: ['Case study: Royal Wootton Bassett wet room', 'Home featured projects', 'Projects gallery'],
    search: 'accessible wet room level floor',
    prompt: `Level-access wet room with linear drain, fold-down seat, brushed steel grab rails and warm grey tiles, ${STYLE}`,
  },
  bassettDrain: {
    file: 'royal-wootton-bassett-wet-room-linear-drain',
    alt: 'Level tiled shower floor with a drain beside a frameless glass screen',
    ratio: '4/3', width: 1200, tone: 'cool',
    usedOn: ['Case study: Royal Wootton Bassett wet room'],
    search: 'linear shower drain tiles close up',
    prompt: `Close-up of a brushed stainless linear shower drain in a grey tiled floor, ${STYLE}`,
  },
  bassettSeat: {
    file: 'royal-wootton-bassett-wet-room-seat',
    alt: 'Stainless steel grab rail fixed to white metro tiles',
    ratio: '4/5', width: 1200, tone: 'warm',
    usedOn: ['Case study: Royal Wootton Bassett wet room'],
    search: 'fold down shower seat accessible',
    prompt: `Fold-down shower seat on a tiled wall with thermostatic shower controls at seated height, ${STYLE}`,
  },

  // Gallery extras
  navyKitchen: {
    file: 'navy-handleless-kitchen-highworth',
    alt: 'Deep blue-green kitchen with a long run of units, white worktop and herringbone floor',
    ratio: '4/3', width: 1600, tone: 'navy',
    usedOn: ['Projects gallery', 'Highworth', 'Kitchen design'],
    search: 'navy blue handleless kitchen oak',
    prompt: `Navy blue handleless kitchen with an oak breakfast bar and white quartz worktop, ${STYLE}`,
  },
  oakKitchen: {
    file: 'solid-oak-worktop-kitchen-marlborough',
    alt: 'Cottage kitchen with open timber shelves, a butcher block worktop and dark units',
    ratio: '4/3', width: 1600, tone: 'oak',
    usedOn: ['Projects gallery', 'Marlborough', 'Kitchen worktops'],
    search: 'cream kitchen oak worktop range cooker',
    prompt: `Cream in-frame kitchen in a period cottage with solid oak worktops and a range cooker, ${STYLE}`,
  },
  greyKitchen: {
    file: 'grey-gloss-kitchen-chippenham',
    alt: 'L-shaped kitchen with grey units, white worktops and marble-effect floor tiles',
    ratio: '4/3', width: 1600, tone: 'cool',
    usedOn: ['Projects gallery', 'Chippenham'],
    search: 'light grey kitchen granite worktop',
    prompt: `L-shaped light grey kitchen with dark granite worktops and integrated appliances in a 2000s home, ${STYLE}`,
  },
  refreshKitchen: {
    file: 'kitchen-refresh-new-doors-wichelstowe',
    alt: 'Dark green kitchen with oak worktops and a cream retro fridge',
    ratio: '4/3', width: 1600, tone: 'sage',
    usedOn: ['Projects gallery', 'Kitchen refurbishment', 'Swindon'],
    search: 'green kitchen cabinets new build',
    prompt: `New-build kitchen refreshed with deep green slab doors, oak-effect laminate worktop and new handles, ${STYLE}`,
  },
  enSuiteCirencester: {
    file: 'en-suite-cirencester-stone-tiles',
    alt: 'Stone-effect en-suite with a long vanity, walk-in shower and pendant light',
    ratio: '4/3', width: 1600, tone: 'stone',
    usedOn: ['Projects gallery', 'Cirencester', 'En-suites'],
    search: 'en suite limestone tiles cottage',
    prompt: `En-suite in a Cotswold stone cottage, walk-in shower, limestone-effect porcelain tiles, exposed beam, ${STYLE}`,
  },
  cloakroomWroughton: {
    file: 'cloakroom-downstairs-toilet-wroughton',
    alt: 'Cloakroom with gold leaf wallpaper above sage green panelling and a brass tap',
    ratio: '4/3', width: 1600, tone: 'sage',
    usedOn: ['Projects gallery', 'Wroughton', 'Cloakrooms'],
    search: 'downstairs toilet patterned floor tiles',
    prompt: `Under-stairs cloakroom with patterned encaustic-style floor tiles, wall-hung basin and half-height panelling, ${STYLE}`,
  },
  bathroomChippenham: {
    file: 'family-bathroom-chippenham',
    alt: 'White metro-tiled bathroom with a brass exposed shower',
    ratio: '4/3', width: 1600, tone: 'cool',
    usedOn: ['Projects gallery', 'Chippenham'],
    search: 'white bathroom metro tiles shower bath',
    prompt: `Family bathroom with white metro tiles, P-shaped shower bath, chrome fittings and grey vanity, ${STYLE}`,
  },
  wetRoomHighworth: {
    file: 'microcement-wet-room-highworth',
    alt: 'Grey-tiled wet room with a rainfall shower, black toilet and tall towel radiator',
    ratio: '4/3', width: 1600, tone: 'stone',
    usedOn: ['Projects gallery', 'Highworth', 'Wet rooms'],
    search: 'modern wet room rainfall shower grey',
    prompt: `Contemporary wet room with large-format grey tiles, ceiling rainfall shower, niche shelf and frameless screen, ${STYLE}`,
  },
  wetRoomMarlborough: {
    file: 'en-suite-wet-room-marlborough',
    alt: 'Small shower room with white metro tiles, a wooden shelf and a wall-hung basin',
    ratio: '4/3', width: 1600, tone: 'warm',
    usedOn: ['Projects gallery', 'Marlborough'],
    search: 'small wet room en suite',
    prompt: `Small en-suite wet room with fixed glass screen, heated towel rail and pale warm tiles, ${STYLE}`,
  },
  bassettKitchen: {
    file: 'family-kitchen-royal-wootton-bassett',
    alt: 'Open-plan white kitchen with a breakfast bar and three stools',
    ratio: '4/3', width: 1600, tone: 'warm',
    usedOn: ['Projects gallery', 'Royal Wootton Bassett'],
    search: 'white family kitchen island wood floor',
    prompt: `Bright family kitchen with white island, wood-effect floor and doorway to a utility room, ${STYLE}`,
  },

  // Advice posts
  costGuide: {
    file: 'new-kitchen-cost-guide-swindon',
    alt: 'White kitchen with stainless steel appliances and a breakfast bar',
    ratio: '16/9', width: 1600, tone: 'oak',
    usedOn: ['Advice: kitchen cost guide'],
    search: 'kitchen renovation planning budget',
    prompt: `Worktop with kitchen door samples, a tape measure and a printed quote, ${STYLE}`,
  },
  timeline: {
    file: 'bathroom-installation-timeline',
    alt: 'Room mid-renovation with timber props and exposed brickwork',
    ratio: '16/9', width: 1600, tone: 'stone',
    usedOn: ['Advice: bathroom installation timeline'],
    search: 'bathroom renovation in progress',
    prompt: `Bathroom mid-installation with new copper and plastic pipework and cement board walls ready for tiling, ${STYLE}`,
  },
} as const satisfies Record<string, ImageEntry>;

export type ImageKey = keyof typeof images;
