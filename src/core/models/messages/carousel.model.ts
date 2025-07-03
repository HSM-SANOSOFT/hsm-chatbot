export class CarouselModel {
  constructor(
    public cards: Array<{
      type: unknown;
      title: string;
      description: string;
      imageUrl?: string;
      buttons?: Array<{
        label: string;
        value: string;
        type?: unknown;
      }>;
    }>,
  ) {}
}
