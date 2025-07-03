import type { SdkInterface } from '../../../interfaces/sdk.interface';
import type { FileModel } from '../../../models/messages';

export class FileService implements Partial<SdkInterface> {
  constructor(private sdk: SdkInterface) {}

  async sendFile(targetId: string, message: FileModel): Promise<void> {
    await this.sdk.sendFile(targetId, message);
  }
}
