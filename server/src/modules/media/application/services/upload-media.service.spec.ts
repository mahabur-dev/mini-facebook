import { UploadMediaService } from "./upload-media.service";
import { InvalidMediaException } from "../../domain/exceptions/invalid-media.exception";

describe("UploadMediaService", () => {
  const mediaRepository = {
    create: jest.fn(),
  };
  const storageService = {
    uploadFile: jest.fn(),
  };
  const mediaValidationService = {
    validateMimeType: jest.fn(),
  };
  const mediaUploadPolicy = {
    canUpload: jest.fn(),
  };
  const configService = {
    get: jest.fn(),
  };

  const service = new UploadMediaService(
    mediaRepository as any,
    storageService as any,
    mediaValidationService as any,
    mediaUploadPolicy as any,
    configService as any,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("rejects unsupported media types before upload", async () => {
    mediaValidationService.validateMimeType.mockImplementation(() => {
      throw new InvalidMediaException("Unsupported media type");
    });

    await expect(
      service.execute("user-1", {
        buffer: Buffer.from("image"),
        mimetype: "application/x-msdownload",
        size: 1234,
      }),
    ).rejects.toBeInstanceOf(InvalidMediaException);
    expect(storageService.uploadFile).not.toHaveBeenCalled();
  });

  it("rejects oversized media before upload", async () => {
    configService.get.mockReturnValue("1048576");
    mediaUploadPolicy.canUpload.mockImplementation(() => {
      throw new InvalidMediaException("Media size is out of allowed range");
    });
    mediaValidationService.validateMimeType.mockReturnValue(undefined);

    await expect(
      service.execute("user-1", {
        buffer: Buffer.from("image"),
        mimetype: "image/jpeg",
        size: 2_000_000,
      }),
    ).rejects.toBeInstanceOf(InvalidMediaException);
    expect(storageService.uploadFile).not.toHaveBeenCalled();
  });

  it("uploads and persists media metadata", async () => {
    configService.get.mockReturnValue("5242880");
    mediaValidationService.validateMimeType.mockReturnValue(undefined);
    mediaUploadPolicy.canUpload.mockReturnValue(undefined);
    storageService.uploadFile.mockResolvedValue({
      fileUrl: "https://example.com/image.jpg",
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

    expect(storageService.uploadFile).toHaveBeenCalledWith({
      buffer: expect.any(Buffer),
      mimetype: "image/jpeg",
      size: 2048,
    });
    expect(mediaRepository.create).toHaveBeenCalledWith({
      ownerId: "user-1",
      fileUrl: "https://example.com/image.jpg",
      storageKey: "storage-key",
      mimeType: "image/jpeg",
      fileSize: BigInt(2048),
      width: 640,
      height: 480,
    });
  });
});
