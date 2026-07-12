type ReactionSummaryProps = {
  text: string;
};

export function ReactionSummary({ text }: ReactionSummaryProps) {
  return <p className="_feed_inner_timeline_reaction_bottom_para">{text}</p>;
}
