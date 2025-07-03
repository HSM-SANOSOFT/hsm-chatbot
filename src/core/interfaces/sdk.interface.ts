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
} from '../models/messages';

export interface SdkInterface {
  sendAudio(targetId: string, message: AudioModel): Promise<void>;
  sendCard(targetId: string, message: CardModel): Promise<void>;
  sendCarousel(targetId: string, message: CarouselModel): Promise<void>;
  sendFile(targetId: string, message: FileModel): Promise<void>;
  sendImage(targetId: string, message: ImageModel): Promise<void>;
  sendMenu(targetId: string, message: MenuModel): Promise<void>;
  sendText(targetId: string, message: TextModel): Promise<void>;
  sendVideo(targetId: string, message: VideoModel): Promise<void>;
  //sendLocation(targetId: string, message: LocationModel): Promise<void>;
}
