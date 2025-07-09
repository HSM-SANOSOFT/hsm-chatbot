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
  sendAudio(message: AudioModel): Promise<void>;
  sendCard(message: CardModel): Promise<void>;
  sendCarousel(message: CarouselModel): Promise<void>;
  sendFile(message: FileModel): Promise<void>;
  sendImage(message: ImageModel): Promise<void>;
  sendMenu(message: MenuModel): Promise<void>;
  sendText(message: TextModel): Promise<void>;
  sendVideo(message: VideoModel): Promise<void>;
  //sendLocation( message: LocationModel): Promise<void>;
}
