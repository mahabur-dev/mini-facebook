type AuthStaticPageProps = {
  html: string;
};

export function AuthStaticPage({ html }: AuthStaticPageProps) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
