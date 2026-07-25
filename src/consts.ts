export const SITE_TITLE = 'Jon Purvis';
export const SITE_DESCRIPTION =
  'PHP Developer. Eater of Chicken. Gamer of Games. Collector of ElePHPants.';
export const SITE_META_DESCRIPTION =
  'Write of Code, Eater of Food, Player of Games, Listener of Music and Drinker of Rum.';
export const SITE_URL = 'https://www.jonathanpurvis.co.uk';
export const TWITTER_HANDLE = '@JonPurvis_';
export const SITE_LOGO = '/images/logo.svg';
/** Default Open Graph image dimensions (feature images are shown ~3:2). */
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 800;

export const PRIMARY_NAV = [
  { label: 'About', href: '/about/' },
  { label: 'Uses', href: '/uses/' },
  { label: 'Open Source', href: '/packages/' },
  { label: 'Herd', href: 'https://elephpant.me/herd/jonpurvis_', external: true },
] as const;

export const FOOTER_TAGS = [
  { label: 'Development', slug: 'development' },
  { label: 'General', slug: 'general' },
  { label: 'Conferences', slug: 'conferences' },
  { label: 'ElePHPants', slug: 'elephpants' },
] as const;

export const SOCIAL_LINKS = [
  {
    label: 'X',
    href: 'https://x.com/JonPurvis_',
    icon: 'x',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jonathanpurvisvs',
    icon: 'linkedin',
  },
] as const;

export const RECOMMENDATIONS = [
  {
    title: 'The PHP Foundation',
    url: 'thephp.foundation',
    href: 'https://thephp.foundation/',
  },
  {
    title: 'PHP',
    url: 'php.net',
    href: 'https://www.php.net/',
  },
  {
    title: 'Laravel Daily',
    url: 'laraveldaily.com',
    href: 'https://laraveldaily.com/',
  },
  {
    title: 'ElePHPant.me',
    url: 'elephpant.me',
    href: 'https://www.elephpant.me/',
  },
  {
    title: 'Laracasts',
    url: 'laracasts.com',
    href: 'https://laracasts.com/',
  },
] as const;

export const TAG_LABELS: Record<string, string> = {
  development: 'Development',
  elephpants: 'ElePHPants',
  conferences: 'Conferences & Meetups',
  packages: 'Packages',
  pestphp: 'PestPHP',
  saloonphp: 'SaloonPHP',
  ai: 'AI',
  speaking: 'Speaking',
  music: 'Music',
  general: 'General',
};

/** Homepage highlight hero: 1 + 3 + 6 */
export const HERO_COUNT = 10;
/** Homepage "Latest" grid below the hero */
export const LATEST_COUNT = 12;
/** Posts shown on /page/N/ archive pages */
export const POSTS_PER_PAGE = 12;
/** Posts consumed by the homepage before archive pagination starts */
export const HOMEPAGE_POST_COUNT = HERO_COUNT + LATEST_COUNT;
