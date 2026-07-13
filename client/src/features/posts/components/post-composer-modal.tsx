"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { createPortal } from "react-dom";
import { ComposerActionIcons } from "./post-composer";

export type ComposerMediaSelection = {
  file?: File;
  previewUrl: string;
  mimeType: string;
  name: string;
} | null;

type PostComposerModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  submitLabel?: string;
  submittingLabel?: string;
  authorName: string;
  authorAvatar: string;
  value: string;
  onChange: (value: string) => void;
  visibility: "Public" | "Private";
  onVisibilityChange: (value: "Public" | "Private") => void;
  media?: ComposerMediaSelection;
  onMediaSelect?: (file: File) => void;
  onMediaRemove?: () => void;
  onSubmit: () => void | Promise<void>;
  submitting?: boolean;
  error?: string | null;
};

const actionLabels = ["Photo", "Video", "Event", "Article"] as const;

export function PostComposerModal({
  open,
  onClose,
  title = "Create post",
  submitLabel = "Post",
  submittingLabel = "Posting...",
  authorName,
  authorAvatar,
  value,
  onChange,
  visibility,
  onVisibilityChange,
  media,
  onMediaSelect,
  onMediaRemove,
  onSubmit,
  submitting,
  error,
}: PostComposerModalProps) {
  const [visibilityMenuOpen, setVisibilityMenuOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const canSubmit = Boolean(value.trim() || media) && !submitting;

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => textareaRef.current?.focus(), 80);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  if (!open) {
    return null;
  }

  const firstName = authorName.split(" ")[0] || "there";
  const isVideo = Boolean(media?.mimeType.startsWith("video/"));

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const [file] = Array.from(event.target.files ?? []);
    event.target.value = "";

    if (file) {
      onMediaSelect?.(file);
    }
  };

  const handleTextPreset = (label: "Event" | "Article") => {
    if (!value.trim()) {
      onChange(label === "Event" ? "Event: " : "Article: ");
    }
    textareaRef.current?.focus();
  };

  return createPortal(
    <div className="_post_modal_overlay" role="presentation" onMouseDown={onClose}>
      <form
        className="_post_modal_card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="post-composer-title"
        onMouseDown={(event) => event.stopPropagation()}
        onSubmit={(event) => {
          event.preventDefault();
          if (canSubmit) {
            void onSubmit();
          }
        }}
      >
        <div className="_post_modal_header">
          <h2 id="post-composer-title" className="_post_modal_title">
            {title}
          </h2>
          <button type="button" className="_post_modal_close" aria-label="Close composer" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l12 12M15 3L3 15" />
            </svg>
          </button>
        </div>

        <div className="_post_modal_body">
          <div className="_post_modal_author">
            <img src={authorAvatar} alt={authorName} className="_post_modal_author_img" />
            <div>
              <h3 className="_post_modal_author_name">{authorName}</h3>
              <div className="_post_modal_visibility_wrap">
                <button type="button" className="_post_modal_visibility_btn" onClick={() => setVisibilityMenuOpen((current) => !current)} aria-expanded={visibilityMenuOpen}>
                  {visibility}
                  <svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" fill="none" viewBox="0 0 9 6">
                    <path fill="currentColor" d="M4.5 6L.603.75h7.794L4.5 6z" />
                  </svg>
                </button>
                {visibilityMenuOpen ? (
                  <div className="_post_modal_visibility_menu">
                    {(["Public", "Private"] as const).map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`_post_modal_visibility_option${visibility === option ? " _post_modal_visibility_option_active" : ""}`}
                        onClick={() => {
                          onVisibilityChange(option);
                          setVisibilityMenuOpen(false);
                        }}
                      >
                        <span>{option}</span>
                        <small>{option === "Public" ? "Anyone can see this post" : "Only you can see this post"}</small>
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <textarea
            ref={textareaRef}
            className="_post_modal_textarea"
            placeholder={`What's on your mind, ${firstName}?`}
            value={value}
            onChange={(event) => onChange(event.target.value)}
          />

          {media ? (
            <div className="_post_modal_media_preview">
              {onMediaRemove ? (
                <button type="button" className="_post_modal_media_remove" aria-label="Remove selected media" onClick={onMediaRemove}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l12 12M15 3L3 15" />
                  </svg>
                </button>
              ) : null}
              {isVideo ? (
                <video src={media.previewUrl} className="_post_modal_media" controls playsInline />
              ) : (
                <img src={media.previewUrl} alt={media.name} className="_post_modal_media" />
              )}
            </div>
          ) : null}

          <input ref={photoInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="_post_modal_file" onChange={handleFileChange} />
          <input ref={videoInputRef} type="file" accept="video/mp4,video/webm,video/quicktime" className="_post_modal_file" onChange={handleFileChange} />

          <div className="_post_modal_feed_actions _feed_inner_text_area_bottom">
            <div className="_feed_inner_text_area_item">
              {actionLabels.map((label) => (
                <div key={label} className={`_feed_inner_text_area_bottom_${label.toLowerCase()} _feed_common`}>
                  <button
                    type="button"
                    className="_feed_inner_text_area_bottom_photo_link"
                    disabled={(label === "Photo" || label === "Video") && !onMediaSelect}
                    onClick={() => {
                      if (label === "Photo") {
                        photoInputRef.current?.click();
                      } else if (label === "Video") {
                        videoInputRef.current?.click();
                      } else {
                        handleTextPreset(label);
                      }
                    }}
                  >
                    <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                      <ComposerActionIcons label={label} />
                    </span>
                    {label}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {error ? <p className="_post_modal_error">{error}</p> : null}

          <div className="_post_modal_submit_row _feed_inner_text_area_btn">
            <button type="submit" className="_feed_inner_text_area_btn_link" disabled={!canSubmit}>
              <svg className="_mar_img" xmlns="http://www.w3.org/2000/svg" width="14" height="13" fill="none" viewBox="0 0 14 13">
                <path fill="#fff" fillRule="evenodd" d="M6.37 7.879l2.438 3.955a.335.335 0 00.34.162c.068-.01.23-.05.289-.247l3.049-10.297a.348.348 0 00-.09-.35.341.341 0 00-.34-.088L1.75 4.03a.34.34 0 00-.247.289.343.343 0 00.16.347L5.666 7.17 9.2 3.597a.5.5 0 01.712.703L6.37 7.88zM9.097 13c-.464 0-.89-.236-1.14-.641L5.372 8.165l-4.237-2.65a1.336 1.336 0 01-.622-1.331c.074-.536.441-.96.957-1.112L11.774.054a1.347 1.347 0 011.67 1.682l-3.05 10.296A1.332 1.332 0 019.098 13z" clipRule="evenodd" />
              </svg>
              <span>{submitting ? submittingLabel : submitLabel}</span>
            </button>
          </div>
        </div>
      </form>
    </div>,
    document.body,
  );
}
