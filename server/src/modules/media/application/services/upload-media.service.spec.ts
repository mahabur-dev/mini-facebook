import { UploadMediaService } from "./upload-media.service";
import { InvalidMediaException } from "../../domain/exceptions/invalid-media.exception";

describe("UploadMediaService", () => {
  const mediaRepository = {
    create: jest.fn(),
  };
  const storageService = {
    uploadImage: jest.fn(),
  };
  const imageValidationService = {
    validateMimeType: jest.fn(),
  };
  const imageUploadPolicy = {
    canUpload: jest.fn(),
  };
  const configService = {
    get: jest.fn(),
  };

  const service = new UploadMediaService(
    mediaRepository as any,
    storageService as any,
    imageValidationService as any,
    imageUploadPolicy as any,
    configService as any,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("rejects unsupported image types before upload", async () => {
    imageValidationService.validateMimeType.mockImplementation(() => {
      throw new InvalidMediaException("Unsupported image type");
    });

    await expect(
      service.execute("user-1", {
        buffer: Buffer.from("image"),
        mimetype: "image/gif",
        size: 1234,
      }),
    ).rejects.toBeInstanceOf(InvalidMediaException);
    expect(storageService.uploadImage).not.toHaveBeenCalled();
  });

  it("rejects oversized images before upload", async () => {
    configService.get.mockReturnValue("1048576");
    imageUploadPolicy.canUpload.mockImplementation(() => {
      throw new InvalidMediaException("Image size is out of allowed range");
    });
    imageValidationService.validateMimeType.mockReturnValue(undefined);

    await expect(
      service.execute("user-1", {
        buffer: Buffer.from("image"),
        mimetype: "image/jpeg",
        size: 2_000_000,
      }),
    ).rejects.toBeInstanceOf(InvalidMediaException);
    expect(storageService.uploadImage).not.toHaveBeenCalled();
  });

  it("uploads and persists media metadata", async () => {
    configService.get.mockReturnValue("5242880");
    imageValidationService.validateMimeType.mockReturnValue(undefined);
    imageUploadPolicy.canUpload.mockReturnValue(undefined);
    storageService.uploadImage.mockResolvedValue({
      imageUrl: "https://example.com/image.jpg",
      storageKey: "storage-key",
      mimeType: "image/jpeg",
      fileSize: 2048,
      width: 640,
      height: 480,
    });
    mediaRepository.create.mockResolvedValue({
      id: "media-1",
    });

    await expect(
      service.execute("user-1", {
        buffer: Buffer.from("image"),
        mimetype: "image/jpeg",
        size: 2048,
      }),
    ).resolves.toEqual({ media: { id: "media-1" } });

    expect(storageService.uploadImage).toHaveBeenCalledWith({
      buffer: expect.any(Buffer),
      mimetype: "image/jpeg",
      size: 2048,
    });
    expect(mediaRepository.create).toHaveBeenCalledWith({
      ownerId: "user-1",
      imageUrl: "https://example.com/image.jpg",
      storageKey: "storage-key",
      mimeType: "image/jpeg",
      fileSize: BigInt(2048),
      width: 640,
      height: 480,
    });
  });
});
