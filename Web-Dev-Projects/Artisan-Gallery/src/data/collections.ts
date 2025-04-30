import { Collection } from '../types';
import artworks from './artworks';

const abstractArtworks = artworks.filter(artwork => artwork.category === 'Abstract');
const modernArtworks = artworks.filter(artwork => artwork.category === 'Modern');
const classicArtworks = artworks.filter(artwork => artwork.category === 'Classic');

const collections: Collection[] = [
  {
    id: '1',
    title: 'Abstract Expressions',
    description: 'A collection exploring emotion and form through abstract compositions.',
    artworks: abstractArtworks,
    thumbnail: 'https://images.pexels.com/photos/3705944/pexels-photo-3705944.jpeg'
  },
  {
    id: '2',
    title: 'Modern Perspectives',
    description: 'Contemporary works that challenge traditional viewpoints and explore new artistic frontiers.',
    artworks: modernArtworks,
    thumbnail: 'https://images.pexels.com/photos/3222686/pexels-photo-3222686.jpeg'
  },
  {
    id: '3',
    title: 'Classical Elegance',
    description: 'Timeless pieces that celebrate the enduring traditions of classical artistry.',
    artworks: classicArtworks,
    thumbnail: 'https://images.pexels.com/photos/20967/pexels-photo.jpg'
  }
];

export default collections;