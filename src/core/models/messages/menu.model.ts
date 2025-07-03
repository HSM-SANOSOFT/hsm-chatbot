type MenuItem = {
  label: string;
  value: string;
  type?: unknown;
};

export class MenuModel {
  constructor(
    public title: string,
    public description: string,
    public items: MenuItem[],
  ) {}
}
