import type { SdkInterface } from '../../../interfaces/sdk.interface';
import type { CarouselModel } from '../../../models/messages';

export class CarouselService implements Partial<SdkInterface> {
  constructor(private sdk: SdkInterface) {}

  async sendCarousel(targetId: string, message: CarouselModel): Promise<void> {
    await this.sdk.sendCarousel(targetId, message);
  }
}
