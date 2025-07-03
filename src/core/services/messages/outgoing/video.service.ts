import type { SdkInterface } from '../../../interfaces/sdk.interface';
import type { VideoModel } from '../../../models/messages';

export class VideoService implements Partial<SdkInterface> {
  constructor(private sdk: SdkInterface) {}

  async sendVideo(targetId: string, message: VideoModel): Promise<void> {
    await this.sdk.sendVideo(targetId, message);
  }
}
