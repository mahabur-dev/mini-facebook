import { StaticHtmlSection } from "./static-html-section";

type FeedMobileBottomNavProps = {
  html: string;
};

export function FeedMobileBottomNav({ html }: FeedMobileBottomNavProps) {
  return <StaticHtmlSection html={html} />;
}
