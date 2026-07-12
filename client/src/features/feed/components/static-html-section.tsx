type StaticHtmlSectionProps = {
  html: string;
};

export function StaticHtmlSection({ html }: StaticHtmlSectionProps) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
