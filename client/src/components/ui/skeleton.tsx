type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonProps) {
  return <div className={className ?? "_skeleton_box"} aria-hidden="true" />;
}
