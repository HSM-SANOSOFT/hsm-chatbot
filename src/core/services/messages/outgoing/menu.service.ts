import type { SdkInterface } from '../../../interfaces/sdk.interface';
import type { MenuModel } from '../../../models/messages';

export class MenuService implements Partial<SdkInterface> {
  constructor(private sdk: SdkInterface) {}

  async sendMenu(targetId: string, message: MenuModel): Promise<void> {
    await this.sdk.sendMenu(targetId, message);
  }
}
