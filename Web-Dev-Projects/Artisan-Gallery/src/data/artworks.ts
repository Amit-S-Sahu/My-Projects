import { Artwork } from '../types';

const artworks: Artwork[] = [
  {
    id: '1',
    title: 'Harmony in Blue',
    artist: 'Elena Mikhailova',
    imageUrl: 'assets\\images\\a1.jpg',
    year: 2022,
    category: 'Abstract',
    description: 'A mesmerizing exploration of color and form, evoking emotions through dynamic brushstrokes and vibrant hues.'
  },
  {
    id: '2',
    title: 'Urban Reflections',
    artist: 'Marcus Chen',
    imageUrl: 'https://images.pexels.com/photos/2119706/pexels-photo-2119706.jpeg?auto=compress&cs=tinysrgb&w=800',
    year: 2021,
    category: 'Modern',
    description: 'A contemporary take on urban landscapes, blending realistic elements with abstract interpretation.'
  },
  {
    id: '3',
    title: 'Serenity',
    artist: 'Sophia Williams',
    imageUrl: 'https://images.pexels.com/photos/3109807/pexels-photo-3109807.jpeg?auto=compress&cs=tinysrgb&w=800',
    year: 2020,
    category: 'Abstract',
    description: 'An ethereal composition that invites viewers into a meditative space of calm and introspection.'
  },
  {
    id: '4',
    title: 'Timeless Portrait',
    artist: 'Jonathan Reed',
    imageUrl: 'https://images.pexels.com/photos/1918290/pexels-photo-1918290.jpeg?auto=compress&cs=tinysrgb&w=800',
    year: 2019,
    category: 'Classic',
    description: 'A masterful portrait rendered in the classical tradition, capturing both physical likeness and inner essence.'
  },
  {
    id: '5',
    title: 'Geometric Illusion',
    artist: 'Maria Lopez',
    imageUrl: 'https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg?auto=compress&cs=tinysrgb&w=800',
    year: 2022,
    category: 'Modern',
    description: 'A bold exploration of geometric forms creating optical illusions that challenge perception.'
  },
  {
    id: '6',
    title: 'Autumn Whispers',
    artist: 'David Kim',
    imageUrl: 'https://images.pexels.com/photos/2440024/pexels-photo-2440024.jpeg?auto=compress&cs=tinysrgb&w=800',
    year: 2020,
    category: 'Classic',
    description: 'A landscape capturing the ephemeral beauty of autumn, with rich colors and detailed brushwork.'
  },
  {
    id: '7',
    title: 'Digital Dreams',
    artist: 'Alex Johnson',
    imageUrl: 'https://images.pexels.com/photos/3094799/pexels-photo-3094799.jpeg?auto=compress&cs=tinysrgb&w=800',
    year: 2023,
    category: 'Modern',
    description: 'A digital artwork exploring the intersection of technology and human consciousness.'
  },
  {
    id: '8',
    title: 'Fluid Emotions',
    artist: 'Chloe Bennett',
    imageUrl: 'assets\\images\\a2.jpg',
    year: 2021,
    category: 'Abstract',
    description: 'A fluid abstraction of emotional states, represented through flowing forms and vibrant colors.'
  },
  {
    id: '9',
    title: 'Contemplation',
    artist: 'Thomas Wright',
    imageUrl: 'https://images.pexels.com/photos/1000366/pexels-photo-1000366.jpeg?auto=compress&cs=tinysrgb&w=800',
    year: 2019,
    category: 'Classic',
    description: 'A thoughtful portrait capturing a moment of quiet reflection and inner peace.'
  },
  {
    id: '10',
    title: 'Dimensional Shift',
    artist: 'Samantha Lee',
    imageUrl: 'https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg?auto=compress&cs=tinysrgb&w=800',
    year: 2022,
    category: 'Modern',
    description: 'A contemporary exploration of space and dimension, challenging traditional perspectives.'
  },
  {
    id: '11',
    title: 'Impressions of Light',
    artist: 'Pierre Dubois',
    imageUrl: 'https://images.pexels.com/photos/3063362/pexels-photo-3063362.jpeg?auto=compress&cs=tinysrgb&w=800',
    year: 2020,
    category: 'Classic',
    description: 'A neo-impressionist study of light and color in the natural world, with meticulous attention to detail.'
  },
  {
    id: '12',
    title: 'Urban Chaos',
    artist: 'Zoe Richards',
    imageUrl: 'assets\\images\\a3.jpg',
    year: 2021,
    category: 'Abstract',
    description: 'A dynamic abstract representation of urban energy and movement, filled with vibrant contrast and rhythm.'
  },
  {
    id: '13',
    title: 'Nature\'s Palette',
    artist: 'Liam Brown',
    imageUrl: 'assets\\images\\c1.jpg',
    year: 2023,
    category: 'Classic',
    description: 'A vibrant landscape painting that captures the essence of nature through a rich color palette.'
  },
  {
    id: '14',
    title: 'Ethereal Landscapes',
    artist: 'Emma Green',
    imageUrl: 'assets\\images\\a4.jpg',
    year: 2022,
    category: 'Abstract',
    description: 'A dreamlike landscape that blurs the lines between reality and imagination, inviting viewers to explore.'
  },
  {
    id: '15',
    title: 'Cultural Fusion',
    artist: 'Aisha Khan',
    imageUrl: 'assets\\images\\m1.jpg',
    year: 2021,
    category: 'Modern',
    description: 'A vibrant piece that celebrates the blending of cultures through color, form, and symbolism.'
  },
  {
    id: '16',
    title: 'Celestial Bodies',
    artist: 'Oliver Smith',
    imageUrl: 'assets\\images\\a5.jpg',
    year: 2023,
    category: 'Abstract',
    description: 'An abstract representation of the cosmos, exploring themes of infinity and interconnectedness.'
  },
  {
    id: '17',
    title: 'Whispers of the Past',
    artist: 'Isabella Martinez',
    imageUrl: 'assets\\images\\c2.jpg',
    year: 2020,
    category: 'Classic',
    description: 'A nostalgic piece that evokes memories of a bygone era through its color palette and composition.'
  },
  {
    id: '18',
    title: 'Rhythms of Nature',
    artist: 'Ethan Taylor',
    imageUrl: 'assets\\images\\m2.jpg',
    year: 2022,
    category: 'Modern',
    description: 'A contemporary exploration of nature\'s rhythms, blending organic forms with modern techniques.'
  },
  {
    id: '19',
    title: 'Abstract Reflections',
    artist: 'Mia Wilson',
    imageUrl: 'assets\\images\\a6.jpg',
    year: 2021,
    category: 'Abstract',
    description: 'A vibrant abstract piece that plays with reflections and light, creating a sense of depth and movement.'
  },
  {
    id: '20',
    title: 'Timeless Beauty',
    artist: 'James Anderson',
    imageUrl: 'assets\\images\\c3.jpg',
    year: 2019,
    category: 'Classic',
    description: 'A classic portrait that captures the essence of beauty through timeless techniques and materials.'
  },
  {
    id: '21',
    title: 'Digital Harmony',
    artist: 'Charlotte White',
    imageUrl: 'assets\\images\\m3.jpg',
    year: 2023,
    category: 'Modern',
    description: 'A digital artwork that harmonizes technology and art, exploring the relationship between the two.'
  },
  {
    id: '22',
    title: 'Nature\'s Embrace',
    artist: 'Benjamin Harris',
    imageUrl: 'assets\\images\\c4.jpg',
    year: 2022,
    category: 'Classic',
    description: 'A serene landscape that captures the beauty of nature through soft colors and gentle brushwork.'
  },
  {
    id: '23',
    title: 'Urban Symphony',
    artist: 'Ava Clark',
    imageUrl: 'assets\\images\\m4.jpg',
    year: 2021,
    category: 'Modern',
    description: 'A contemporary piece that captures the energy of urban life through dynamic forms and vibrant colors.'
  },
  {
    id: '24',
    title: 'Fluid Dynamics',
    artist: 'Lucas Lewis',
    imageUrl: 'assets\\images\\a7.jpg',
    year: 2020,
    category: 'Abstract',
    description: 'An abstract exploration of fluidity and movement, using color and form to evoke a sense of motion.'
  },
  {
    id: '25',
    title: 'Cultural Reflections',
    artist: 'Grace Young',
    imageUrl: 'assets\\images\\c5.jpg',
    year: 2023,
    category: 'Classic',
    description: 'A piece that reflects cultural heritage through traditional techniques and modern interpretation.'
  },
  {
    id: '26',
    title: 'Celestial Dreams',
    artist: 'Henry King',
    imageUrl: 'assets\\images\\m5.jpg',
    year: 2022,
    category: 'Modern',
    description: 'A contemporary piece that explores the cosmos through abstract forms and vibrant colors.'
  },
  {
    id: '27',
    title: 'Nature\'s Symphony',
    artist: 'Lily Scott',
    imageUrl: 'assets\\images\\a8.jpg',
    year: 2021,
    category: 'Abstract',
    description: 'An abstract representation of nature\'s rhythms, using color and form to evoke a sense of harmony.'
  },
  {
    id: '28',
    title: 'Timeless Landscapes',
    artist: 'Samuel Green',
    imageUrl: 'assets\\images\\c6.jpg',
    year: 2020,
    category: 'Classic',
    description: 'A classic landscape that captures the beauty of nature through traditional techniques and materials.'
  },
  {
    id: '29',
    title: 'Digital Reflections',
    artist: 'Ella Adams',
    imageUrl: 'assets\\images\\m6.jpg',
    year: 2023,
    category: 'Modern',
    description: 'A digital artwork that explores the relationship between technology and art through vibrant colors and forms.'
  },
  {
    id: '30',
    title: 'Abstract Landscapes',
    artist: 'Oliver Baker',
    imageUrl: 'assets\\images\\a9.jpg',
    year: 2022,
    category: 'Abstract',
    description: 'An abstract representation of landscapes, using color and form to evoke a sense of place and emotion.'
  },
  {
    id: '31',
    title: 'Cultural Landscapes',
    artist: 'Sofia Nelson',
    imageUrl: 'assets\\images\\c7.jpg',
    year: 2021,
    category: 'Classic',
    description: 'A piece that reflects cultural heritage through traditional techniques and modern interpretation.'
  },
  {
    id: '32',
    title: 'Celestial Landscapes',
    artist: 'Mason Carter',
    imageUrl: 'assets\\images\\c8.jpg',
    year: 2020,
    category: 'Classic',
    description: 'A contemporary piece that explores the cosmos through abstract forms and vibrant colors.'
  },
  {
    id: '33',
    title: 'Urban Reflections',
    artist: 'Ava Mitchell',
    imageUrl: 'assets\\images\\c9.jpg',
    year: 2023,
    category: 'Classic',
    description: 'A contemporary piece that captures the energy of urban life through dynamic forms and vibrant colors.'
  }
];

export default artworks;