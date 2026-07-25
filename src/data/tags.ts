/** Tag metadata migrated from Ghost (name, description, feature image). */
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
  pestphp: {
    name: 'PestPHP',
    description:
      'All of my posts related to PestPHP, the elegant PHP testing framework. With a focus on simplicity, it is meticulously designed to bring back the joy of testing in PHP.',
    feature_image:
      'https://storage.ghost.io/c/43/cb/43cb054d-e069-4e35-94fc-3ca586640327/content/images/size/w1200/2024/08/PestPHP-Banner.png',
  },
  ai: {
    name: 'AI',
    feature_image:
      'https://images.unsplash.com/photo-1674027444485-cec3da58eef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDN8fGFpJTIwfGVufDB8fHx8MTc3NTMzNTkwNHww&ixlib=rb-4.1.0&q=80&w=2000',
  },
  saloonphp: {
    name: 'SaloonPHP',
  },
  elephpants: {
    name: 'ElePHPants',
  },
  speaking: {
    name: 'Speaking',
  },
  conferences: {
    name: 'Conferences & Meetups',
  },
  packages: {
    name: 'Packages',
  },
};

export function getTagMeta(slug: string): TagMeta {
  return (
    TAGS[slug] ?? {
      name: slug,
    }
  );
}
