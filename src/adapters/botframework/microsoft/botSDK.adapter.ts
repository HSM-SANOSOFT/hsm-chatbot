import type { Attachment, TurnContext } from 'botbuilder';
import {
  CardFactory,
  //Location,
  MessageFactory,
} from 'botbuilder';

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

export class BotSDKAdapter implements SdkInterface {
  constructor(private context: TurnContext) {}

  async sendText(targetId: string, message: TextModel): Promise<void> {
    await this.context.sendActivity(MessageFactory.text(message.content));
  }

  async sendMenu(targetId: string, message: MenuModel): Promise<void> {
    const choices = message.items.map(item => item.label);
    const activity = MessageFactory.suggestedActions(
      choices,
      message.description,
    );
    await this.context.sendActivity(activity);
  }

  async sendCard(targetId: string, message: CardModel): Promise<void> {
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
    await this.context.sendActivity(card);
  }

  async sendCarousel(targetId: string, message: CarouselModel): Promise<void> {
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
    await this.context.sendActivity({
      attachments,
      attachmentLayout: 'carousel',
    });
  }

  async sendImage(targetId: string, message: ImageModel): Promise<void> {
    const attachment: Attachment = {
      contentType: message.mimeType || 'image/jpeg',
      contentUrl: message.url,
      name: message.title || 'Image',
    };
    await this.context.sendActivity(MessageFactory.attachment(attachment));
  }

  async sendVideo(targetId: string, message: VideoModel): Promise<void> {
    const attachment: Attachment = {
      contentType: message.mimeType || 'video/mp4',
      contentUrl: message.url,
      name: message.title || 'Video',
    };
    await this.context.sendActivity(MessageFactory.attachment(attachment));
  }

  async sendAudio(targetId: string, message: AudioModel): Promise<void> {
    const attachment: Attachment = {
      contentType: message.mimeType || 'audio/mpeg',
      contentUrl: message.url,
      name: message.title || 'Audio',
    };
    await this.context.sendActivity(MessageFactory.attachment(attachment));
  }

  async sendFile(targetId: string, message: FileModel): Promise<void> {
    const attachment: Attachment = {
      contentType: message.mimeType || 'application/pdf',
      contentUrl: message.url,
      name: message.title || 'File',
    };
    await this.context.sendActivity(MessageFactory.attachment(attachment));
  }

  /*
  
  async sendLocation(targetId: string, message: LocationModel): Promise<void> {
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
