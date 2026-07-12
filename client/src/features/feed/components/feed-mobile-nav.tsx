import { StaticHtmlSection } from "./static-html-section";

type FeedMobileNavProps = {
  html: string;
};

export function FeedMobileNav({ html }: FeedMobileNavProps) {
  return <StaticHtmlSection html={html} />;
}
