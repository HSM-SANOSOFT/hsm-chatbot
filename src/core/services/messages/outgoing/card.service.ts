import type { SdkInterface } from '../../../interfaces/sdk.interface';
import type { CardModel } from '../../../models/messages';

export class CardService implements Partial<SdkInterface> {
  constructor(private sdk: SdkInterface) {}

  async sendCard(targetId: string, message: CardModel): Promise<void> {
    await this.sdk.sendCard(targetId, message);
  }
}
