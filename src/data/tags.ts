/** Tag metadata (name, description, feature image). */
export type TagMeta = {
  name: string;
  description?: string;
  feature_image?: string;
};

export const TAGS: Record<string, TagMeta> = {
  development: {
    name: 'Development',
    description:
      "A collection of posts about Web Development, whether it be problems I've faced, solutions I've found, cool stuff I've been trying out or new projects I'm working on.",
    feature_image:
      'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDR8fGRldmVsb3BtZW50fGVufDB8fHx8MTY5MzE5MDg3Mnww&ixlib=rb-4.0.3&q=80&w=2000',
  },
  general: {
    name: 'General',
    description: "General posts that don't really fit anywhere else.",
    feature_image:
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDJ8fGNhZmV8ZW58MHx8fHwxNjkzMTU0MTA2fDA&ixlib=rb-4.0.3&q=80&w=2000',
  },
  music: {
    name: 'Music',
    description:
      "Posts related to music, whether it be a new band I've discovered, an album I've been listening too, or a gig I've recently attended.",
    feature_image:
      'https://images.unsplash.com/photo-1548426589-b5560481a46e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDV8fHJvY2slMjBtdXNpY3xlbnwwfHx8fDE2OTMxOTA5NDF8MA&ixlib=rb-4.0.3&q=80&w=2000',
  },
  'days-out': {
    name: 'Days Out',
    description:
      "Days out, attractions, and trips that aren't conferences or gigs - places worth writing about.",
    feature_image:
      'https://images.unsplash.com/photo-1695793582692-ec6077a3fb05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=2000',
  },
  pestphp: {
    name: 'PestPHP',
    description:
      'All of my posts related to PestPHP, the elegant PHP testing framework. With a focus on simplicity, it is meticulously designed to bring back the joy of testing in PHP.',
    feature_image: '/images/tags/pestphp.jpg',
  },
  ai: {
    name: 'AI',
    description:
      "Posts about AI tools, models, and experiments I've been trying in day-to-day development.",
    feature_image:
      'https://images.unsplash.com/photo-1674027444485-cec3da58eef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDN8fGFpJTIwfGVufDB8fHx8MTc3NTMzNTkwNHww&ixlib=rb-4.1.0&q=80&w=2000',
  },
  saloonphp: {
    name: 'SaloonPHP',
    description:
      'Posts about building, testing, and extending HTTP integrations with SaloonPHP.',
    feature_image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000',
  },
  elephpants: {
    name: 'ElePHPants',
    description:
      "Posts about my ElePHPant collection, trades, and additions to the herd.",
    feature_image:
      'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000',
  },
  speaking: {
    name: 'Speaking',
    description:
      "Talks and speaking engagements I've done, plus notes from preparing and delivering them.",
    feature_image:
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000',
  },
  conferences: {
    name: 'Conferences & Meetups',
    description:
      'Recaps and notes from conferences and meetups I have attended or spoken at.',
    feature_image:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000',
  },
  packages: {
    name: 'Packages',
    description:
      "Posts about open-source packages I've built, released, or contributed to.",
    feature_image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000',
  },
};

export function getTagMeta(slug: string): TagMeta {
  return (
    TAGS[slug] ?? {
      name: slug,
    }
  );
}
