export class CardModel {
  constructor(
    public type: unknown,
    public title: string,
    public description: string,
    public imageUrl?: string,
    public buttons?: Array<{
      label: string;
      value: string;
      type?: unknown;
    }>,
  ) {}
}
