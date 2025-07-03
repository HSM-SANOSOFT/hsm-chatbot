export class LocationModel {
  constructor(
    public latitude: number,
    public longitude: number,
    public name?: string,
    public address?: string,
  ) {}
}
