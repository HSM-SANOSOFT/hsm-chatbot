import type { SdkInterface } from '../../../interfaces/sdk.interface';
import type { TextModel } from '../../../models/messages';

export class TextService implements Partial<SdkInterface> {
  constructor(private sdk: SdkInterface) {}

  async sendText(targetId: string, message: TextModel): Promise<void> {
    await this.sdk.sendText(targetId, message);
  }
}
