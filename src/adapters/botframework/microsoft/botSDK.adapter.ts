import type { Attachment } from 'botbuilder';
import {
  CardFactory,
  //Location,
  MessageFactory,
} from 'botbuilder';

import type { ContextInterface } from '../../../core/interfaces';
import type { SdkInterface } from '../../../core/interfaces/sdk.interface';
import type {
  AudioModel,
  CardModel,
  CarouselModel,
  FileModel,
  ImageModel,
  //LocationModel,
  MenuModel,
  TextModel,
  VideoModel,
} from '../../../core/models/messages';

export class MsBotSDKAdapter implements SdkInterface {
  constructor(private readonly ctx: ContextInterface) {}

  async sendText(message: TextModel): Promise<void> {
    await this.ctx.sendActivity(MessageFactory.text(message.content));
  }

  async sendMenu(message: MenuModel): Promise<void> {
    const choices = message.items.map(item => item.label);
    const activity = MessageFactory.suggestedActions(
      choices,
      message.description,
    );
    await this.ctx.sendActivity(activity);
  }

  async sendCard(message: CardModel): Promise<void> {
    const card: Attachment = CardFactory.heroCard(
      message.title,
      message.description,
      message.imageUrl ? [message.imageUrl] : undefined,
      message.buttons?.map(btn => ({
        type: 'postBack',
        title: btn.label,
        value: btn.value,
      })),
    );
    await this.ctx.sendActivity(card);
  }

  async sendCarousel(message: CarouselModel): Promise<void> {
    const attachments: Attachment[] = message.cards.map(card =>
      CardFactory.heroCard(
        card.title,
        card.description,
        card.imageUrl ? [card.imageUrl] : undefined,
        card.buttons?.map(btn => ({
          type: 'postBack',
          title: btn.label,
          value: btn.value,
        })),
      ),
    );
    await this.ctx.sendActivity({
      attachments,
      attachmentLayout: 'carousel',
    });
  }

  async sendImage(message: ImageModel): Promise<void> {
    const attachment: Attachment = {
      contentType: message.mimeType || 'image/jpeg',
      contentUrl: message.url,
      name: message.title || 'Image',
    };
    await this.ctx.sendActivity(MessageFactory.attachment(attachment));
  }

  async sendVideo(message: VideoModel): Promise<void> {
    const attachment: Attachment = {
      contentType: message.mimeType || 'video/mp4',
      contentUrl: message.url,
      name: message.title || 'Video',
    };
    await this.ctx.sendActivity(MessageFactory.attachment(attachment));
  }

  async sendAudio(message: AudioModel): Promise<void> {
    const attachment: Attachment = {
      contentType: message.mimeType || 'audio/mpeg',
      contentUrl: message.url,
      name: message.title || 'Audio',
    };
    await this.ctx.sendActivity(MessageFactory.attachment(attachment));
  }

  async sendFile(message: FileModel): Promise<void> {
    const attachment: Attachment = {
      contentType: message.mimeType || 'application/pdf',
      contentUrl: message.url,
      name: message.title || 'File',
    };
    await this.ctx.sendActivity(MessageFactory.attachment(attachment));
  }

  /*
  
  async sendLocation(  message: LocationModel): Promise<void> {
    const location: Location = {
      latitude: message.latitude,
      longitude: message.longitude,
      name: message.name || 'Location',
      address: message.address || '',
    };
    await this.context.sendActivity(MessageFactory.attachment(Location.));
  }  
  */
}
