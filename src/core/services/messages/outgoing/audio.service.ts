import type { SdkInterface } from '../../../interfaces/sdk.interface';
import type { AudioModel } from '../../../models/messages';

export class AudioService implements Partial<SdkInterface> {
  constructor(private sdk: SdkInterface) {}

  async sendAudio(targetId: string, message: AudioModel): Promise<void> {
    await this.sdk.sendAudio(targetId, message);
  }
}
