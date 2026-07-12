import { readStaticPageBody } from "@/lib/static-html";
import { extractHtmlSection } from "@/lib/utils/extract-html-section";
import { FeedDesktopNav } from "./feed-desktop-nav";
import { FeedMainLayout } from "./feed-main-layout";
import { FeedMobileBottomNav } from "./feed-mobile-bottom-nav";
import { FeedMobileNav } from "./feed-mobile-nav";
import { FeedShellStart } from "./feed-shell-start";

export function FeedPage() {
  const html = readStaticPageBody("feed.html");

  return (
    <>
      <FeedShellStart html={extractHtmlSection(html, "<!--Feed Section Start-->", "<!--Desktop Menu Start-->")} />
      <FeedDesktopNav html={extractHtmlSection(html, "<!--Desktop Menu Start-->", "<!--Desktop Menu End-->")} />
      <FeedMobileNav html={extractHtmlSection(html, "<!--Mobile Menu Start-->", "<!--Mobile Menu End-->")} />
      <FeedMobileBottomNav
        html={extractHtmlSection(html, "<!-- Mobile Bottom Navigation -->", "<!-- Mobile Bottom Navigation End -->")}
      />
      <FeedMainLayout
        html={extractHtmlSection(html, "<!-- Main Layout Structure -->", "<!--Feed Section End-->")}
      />
    </>
  );
}
