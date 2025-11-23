export interface Artwork {
  id: string;
  imageUrl: string;
  prompt: string;
  model: string;
  description: string;

  createdAt: { seconds: number };
  uploaderId?: string;
}
