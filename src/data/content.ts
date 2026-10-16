/**
 * Shared copy used on more than one page: process steps, differentiators,
 * sample reviews and the main FAQ list. Edit here, it updates everywhere.
 */
import type { IconName } from '@/components/ui/Icon.astro';
import type { Faq } from '@/lib/schema';

export const PROCESS: { title: string; short: string; text: string; icon: IconName }[] = [
  {
    title: 'Home visit',
    short: 'We come to you, measure properly and listen.',
    text: 'Your designer visits at a time that suits you, measures the room, checks pipe runs, walls and floors, and talks through how you use the space and what you want to spend. It takes about an hour and costs nothing.',
    icon: 'home',
  },
  {
    title: 'Design',
    short: 'A layout and 3D visuals you can actually picture.',
    text: 'We draw up a plan and 3D visuals, then refine them with you. You choose doors, worktops, tiles and fittings from real samples, not a brochure page.',
    icon: 'cube',
  },
  {
    title: 'Fixed written quote',
    short: 'One price, itemised, in writing.',
    text: 'You get an itemised quote that covers everything we discussed: strip-out, materials, labour, electrics, plumbing, plastering, tiling and waste. The price does not move unless you change the plan.',
    icon: 'clipboard',
  },
  {
    title: 'Installation',
    short: 'Our own team, one project manager, a tidy site.',
    text: 'Our own fitters, plumber, electrician and tiler do the work in a planned order. Your project manager is your single contact from the first day to the last, and we clean up every evening.',
    icon: 'tools',
  },
  {
    title: 'Aftercare',
    short: 'A walk-through, a handover pack and a 10-year guarantee.',
    text: 'We walk round the finished room with you and fix any snags straight away. You get a handover pack with warranties and certificates, and a 10-year workmanship guarantee.',
    icon: 'shield',
  },
];

export const DIFFERENTIATORS: { title: string; text: string; icon: IconName }[] = [
  {
    title: 'In-house design with 3D visuals',
    text: 'You see the finished room before anything is ordered, so there are no surprises on fitting day.',
    icon: 'cube',
  },
  {
    title: 'One project manager per job',
    text: 'One name, one phone number. They know your job inside out and keep the trades in step.',
    icon: 'user',
  },
  {
    title: 'Our own fitters, never subcontracted',
    text: 'The people who quote are the people who fit. Nine of us, all employed directly.',
    icon: 'users',
  },
  {
    title: 'Fixed, written quotes',
    text: 'Itemised and in writing. If we find something unexpected, we show you before any extra work starts.',
    icon: 'clipboard',
  },
  {
    title: '10-year workmanship guarantee',
    text: 'On top of manufacturer warranties. If something we fitted fails, we come back and put it right.',
    icon: 'shield',
  },
  {
    title: 'Tidy-site promise',
    text: 'Floor protection down, dust sheets up, waste removed daily and a working kitchen sink kept for as long as possible.',
    icon: 'broom',
  },
];

export type Review = { quote: string; name: string; place: string; project: string };

/** SAMPLE reviews for the demo. Always shown with a "Sample reviews" caption. No review schema. */
export const REVIEWS: Review[] = [
  {
    quote:
      'The 3D drawings meant we changed the island before it was built, not after. Dan ran the whole job and we always knew what was happening the next day.',
    name: 'Helen',
    place: 'Old Town, Swindon',
    project: 'Kitchen',
  },
  {
    quote:
      'They found rot under the old bath, showed us photos, priced the fix there and then and still finished on the day they said. The tiling is spot on.',
    name: 'Mark',
    place: 'Wroughton',
    project: 'Family bathroom',
  },
  {
    quote:
      'Mum can shower on her own again. The team were patient with her, kept the house clean and the wet room looks like a hotel rather than a hospital.',
    name: 'Priya',
    place: 'Royal Wootton Bassett',
    project: 'Wet room',
  },
  {
    quote:
      'We only wanted new doors and worktops. They didn’t try to upsell us a whole new kitchen, and it looks brand new for a fraction of the cost.',
    name: 'Gareth',
    place: 'Wichelstowe',
    project: 'Kitchen refurbishment',
  },
  {
    quote:
      'Our en-suite is tiny, but the designer found room for a proper walk-in shower by moving the toilet. Clever, tidy and quick.',
    name: 'Louise',
    place: 'Cirencester',
    project: 'En-suite',
  },
  {
    quote:
      'The quote was the price we paid. No extras, no drama. The fitters even sorted a sticking back door while they were here.',
    name: 'Tom',
    place: 'Highworth',
    project: 'Kitchen',
  },
];

export const FAQ_GROUPS: { title: string; id: string; faqs: Faq[] }[] = [
  {
    title: 'Quotes and costs',
    id: 'quotes',
    faqs: [
      {
        q: 'Is the home visit and quote really free?',
        a: 'Yes. The design visit, the 3D plan and the written quote are all free, and you are under no obligation to go ahead. We would rather you take your time and choose us because the plan is right.',
      },
      {
        q: 'How much does a new kitchen or bathroom cost?',
        a: 'Most of our fitted kitchens come in between £12,000 and £35,000, and most bathrooms between £8,000 and £20,000, including everything from strip-out to final clean. Our [kitchen cost guide](/advice/how-much-does-a-new-kitchen-cost-swindon) breaks down where the money goes.',
      },
      {
        q: 'Will the price change once you start?',
        a: 'Not unless you change the plan. Our quotes are fixed and itemised. If we uncover a genuine surprise, such as rotten joists under a bath, we stop, show you, and agree the cost in writing before doing anything.',
      },
      {
        q: 'How do payments work?',
        a: 'Typically a deposit when you order, a stage payment when materials arrive on site, and the balance once the work is finished and you are happy. Every stage is written into the quote before you sign.',
      },
    ],
  },
  {
    title: 'Design and planning',
    id: 'design',
    faqs: [
      {
        q: 'Can I supply my own kitchen or bathroom suite?',
        a: 'For bathrooms, often yes, as long as we check the items before fitting day. For kitchens we fit the ranges we supply, because we can then guarantee the whole job, from carcass to worktop.',
      },
      {
        q: 'How far ahead do I need to book?',
        a: 'Design visits are usually available within a week or two. Installation slots tend to be booked six to ten weeks ahead, and kitchen lead times depend on the range and worktop you choose.',
      },
      {
        q: 'Do I need planning permission or building regulations approval?',
        a: 'Replacing a kitchen or bathroom rarely needs planning permission. Some electrical, structural and drainage work falls under building regulations, and our NICEIC-registered electrician and Gas Safe engineer certify their own work. If a wall is coming out, we arrange the structural engineer and building control for you.',
      },
    ],
  },
  {
    title: 'During the work',
    id: 'during',
    faqs: [
      {
        q: 'How long will I be without a kitchen or bathroom?',
        a: 'A typical kitchen takes two to four weeks on site and a bathroom one to two weeks. We set up a temporary sink where we can and, if you only have one bathroom, we plan the work so you are without a toilet for as short a time as possible, usually just a day.',
      },
      {
        q: 'Do you use subcontractors?',
        a: 'No. Our fitters, tiler, plumber, electrician and Gas Safe engineer are all part of our own team of nine. The only outside specialists we use are worktop templaters and, where needed, a structural engineer.',
      },
      {
        q: 'Do I need to be at home while you work?',
        a: 'Not all day. Plenty of customers go to work and leave us a key. Your project manager will message you at the end of each day with progress and photos.',
      },
      {
        q: 'What happens to the old kitchen or bathroom?',
        a: 'We strip it out and take it away as part of the job, using licensed waste carriers. Anything reusable, such as appliances or sanitaryware in good condition, can be left for you or donated.',
      },
    ],
  },
  {
    title: 'Guarantees and aftercare',
    id: 'aftercare',
    faqs: [
      {
        q: 'What does the 10-year guarantee cover?',
        a: 'Our workmanship: the fitting, plumbing, electrics and tiling we carried out. Products are covered separately by their manufacturers, often for longer, and we handle those claims for you.',
      },
      {
        q: 'What if something goes wrong after you finish?',
        a: 'Call or email us. Your project manager will arrange a visit, usually within a few working days, and put it right. Most issues in the first weeks are small adjustments, like a door hinge settling.',
      },
      {
        q: 'Are your trades registered?',
        a: 'Yes. We have a Gas Safe registered engineer and an NICEIC-registered electrician on our own team, and you receive the relevant certificates in your handover pack.',
      },
    ],
  },
];

/** The four questions teased on the homepage. */
export const HOME_FAQS: Faq[] = [
  FAQ_GROUPS[0].faqs[0],
  FAQ_GROUPS[0].faqs[1],
  FAQ_GROUPS[2].faqs[0],
  FAQ_GROUPS[2].faqs[1],
];
