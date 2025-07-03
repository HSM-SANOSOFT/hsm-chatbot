import type { SdkInterface } from '../../../interfaces/sdk.interface';
import type { ImageModel } from '../../../models/messages';

export class ImageService implements Partial<SdkInterface> {
  constructor(private sdk: SdkInterface) {}

  async sendImage(targetId: string, message: ImageModel): Promise<void> {
    await this.sdk.sendImage(targetId, message);
  }
}
