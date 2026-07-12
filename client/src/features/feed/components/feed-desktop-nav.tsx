import { StaticHtmlSection } from "./static-html-section";

type FeedDesktopNavProps = {
  html: string;
};

export function FeedDesktopNav({ html }: FeedDesktopNavProps) {
  return <StaticHtmlSection html={html} />;
}
