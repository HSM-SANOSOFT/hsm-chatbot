import type { SdkInterface } from '../../../interfaces/sdk.interface';
import type { LocationModel } from '../../../models/messages';

export class LocationService implements Partial<SdkInterface> {
  constructor(private sdk: SdkInterface) {}

  async sendLocation(targetId: string, message: LocationModel): Promise<void> {
    await this.sdk.sendLocation(targetId, message);
  }
}
