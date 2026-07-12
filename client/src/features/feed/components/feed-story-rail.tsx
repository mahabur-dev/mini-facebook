import { desktopStories, mobileStories } from "../data/feed-fixtures";
import { cn } from "@/lib/cn";

export function FeedStoryRail() {
  return (
    <>
      <div className="_feed_inner_ppl_card _mar_b16">
        <div className="_feed_inner_story_arrow">
          <button type="button" className="_feed_inner_story_arrow_btn" aria-label="Scroll stories">
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="8" fill="none" viewBox="0 0 9 8">
              <path fill="#fff" d="M8 4l.366-.341.318.341-.318.341L8 4zm-7 .5a.5.5 0 010-1v1zM5.566.659l2.8 3-.732.682-2.8-3L5.566.66zm2.8 3.682l-2.8 3-.732-.682 2.8-3 .732.682zM8 4.5H1v-1h7v1z" />
            </svg>
          </button>
        </div>
        <div className="row">
          {desktopStories.map((story, index) => (
            <div
              className={cn(
                "col-xl-3 col-lg-3 col-md-4 col-sm-4 col",
                index > 1 && index < 3 && "_custom_mobile_none",
                index === 3 && "_custom_none",
              )}
              key={story.id}
            >
              <div className={story.active ? "_feed_inner_profile_story _b_radious6" : "_feed_inner_public_story _b_radious6"}>
                <div className={story.active ? "_feed_inner_profile_story_image" : "_feed_inner_public_story_image"}>
                  <img src={story.image} alt={story.name} className={story.active ? "_profile_story_img" : "_public_story_img"} />
                  <div className={story.active ? "_feed_inner_story_txt" : "_feed_inner_pulic_story_txt"}>
                    {story.active ? (
                      <>
                        <div className="_feed_inner_story_btn">
                          <button className="_feed_inner_story_btn_link" type="button" aria-label="Create story">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                              <path stroke="#fff" strokeLinecap="round" d="M.5 4.884h9M4.884 9.5v-9" />
                            </svg>
                          </button>
                        </div>
                        <p className="_feed_inner_story_para">{story.name}</p>
                      </>
                    ) : (
                      <p className="_feed_inner_pulic_story_para">{story.name}</p>
                    )}
                  </div>
                  {!story.active ? (
                    <div className="_feed_inner_public_mini">
                      <img src={story.avatar ?? "/assets/images/mini_pic.png"} alt="" className="_public_mini_img" />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="_feed_inner_ppl_card_mobile _mar_b16">
        <div className="_feed_inner_ppl_card_area">
          <ul className="_feed_inner_ppl_card_area_list">
            {mobileStories.map((story) => (
              <li className="_feed_inner_ppl_card_area_item" key={story.id}>
                <a href="#story" className="_feed_inner_ppl_card_area_link">
                  <div
                    className={
                      story.active
                        ? "_feed_inner_ppl_card_area_story"
                        : story.id === "m-story-2"
                          ? "_feed_inner_ppl_card_area_story_active"
                          : "_feed_inner_ppl_card_area_story_inactive"
                    }
                  >
                    <img src={story.image} alt={story.name} className={story.active ? "_card_story_img" : "_card_story_img1"} />
                    {story.active ? (
                      <div className="_feed_inner_ppl_btn">
                        <button className="_feed_inner_ppl_btn_link" type="button" aria-label="Create story">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 12 12">
                            <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" d="M6 2.5v7M2.5 6h7" />
                          </svg>
                        </button>
                      </div>
                    ) : null}
                  </div>
                  <p className={story.active ? "_feed_inner_ppl_card_area_link_txt" : "_feed_inner_ppl_card_area_txt"}>{story.name}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
