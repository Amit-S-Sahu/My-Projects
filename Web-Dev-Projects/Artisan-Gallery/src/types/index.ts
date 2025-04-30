export interface Artwork {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  year: number;
  category: string;
  description?: string;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  artworks: Artwork[];
  thumbnail: string;
}

export interface TimelineEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  imageUrl?: string;
}