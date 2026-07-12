import { MediaEntity } from "../../domain/entities/media.entity";

export function presentMedia(media: MediaEntity) {
  return {
    ...media,
    fileSize: media.fileSize.toString(),
  };
}
