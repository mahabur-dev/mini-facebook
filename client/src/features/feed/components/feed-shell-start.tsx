import { StaticHtmlSection } from "./static-html-section";

type FeedShellStartProps = {
  html: string;
};

export function FeedShellStart({ html }: FeedShellStartProps) {
  return <StaticHtmlSection html={html} />;
}
