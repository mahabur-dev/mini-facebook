import { StaticHtmlSection } from "./static-html-section";

type FeedMainLayoutProps = {
  html: string;
};

export function FeedMainLayout({ html }: FeedMainLayoutProps) {
  return <StaticHtmlSection html={html} />;
}
