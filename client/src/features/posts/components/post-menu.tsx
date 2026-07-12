import { cn } from "@/lib/cn";

type PostMenuProps = {
  open: boolean;
};

export function PostMenu({ open }: PostMenuProps) {
  return (
    <div id="_timeline_drop" className={cn("_feed_timeline_dropdown _timeline_dropdown", open && "show")}>
      <ul className="_feed_timeline_dropdown_list">
        <li className="_feed_timeline_dropdown_item">
          <a href="#0" className="_feed_timeline_dropdown_link">
            Save post
          </a>
        </li>
        <li className="_feed_timeline_dropdown_item">
          <a href="#0" className="_feed_timeline_dropdown_link">
            Hide post
          </a>
        </li>
      </ul>
    </div>
  );
}
