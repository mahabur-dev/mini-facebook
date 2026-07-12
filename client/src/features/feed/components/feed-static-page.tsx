type FeedStaticPageProps = {
  html: string;
};

export function FeedStaticPage({ html }: FeedStaticPageProps) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
