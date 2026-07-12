"use client";

import { useMemo } from "react";
import { useNavigationStore } from "@/store/navigation.store";
import { useModalStore } from "@/store/modal.store";
import { usePostComposerStore } from "@/store/post-composer.store";
import { cn } from "@/lib/cn";
import { desktopStories, friends, mobileStories, sidebarSuggestions } from "../data/feed-fixtures";

function FeedHeader() {
  const { notificationsOpen, profileMenuOpen, timelineMenuOpen, toggleNotifications, toggleProfileMenu, toggleTimelineMenu } =
    useModalStore();

  return (
    <nav className="navbar navbar-expand-lg navbar-light _header_nav _padd_t10">
      <div className="container _custom_container">
        <div className="_logo_wrap">
          <a className="navbar-brand" href="/feed">
            <img src="/assets/images/logo.svg" alt="Buddy Script" className="_nav_logo" />
          </a>
        </div>
        <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="_header_form ms-auto">
            <form className="_header_form_grp">
              <svg className="_header_form_svg" xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 17 17">
                <circle cx="7" cy="7" r="6" stroke="#666" />
                <path stroke="#666" strokeLinecap="round" d="M16 16l-3-3" />
              </svg>
              <input className="form-control me-2 _inpt1" type="search" placeholder="input search text" aria-label="Search" />
            </form>
          </div>
          <ul className="navbar-nav mb-2 mb-lg-0 _header_nav_list ms-auto _mar_r8">
            <li className="nav-item _header_nav_item">
              <a className="nav-link _header_nav_link_active _header_nav_link" aria-current="page" href="/feed">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" fill="none" viewBox="0 0 18 21">
                  <path className="_home_active" stroke="#000" strokeWidth="1.5" strokeOpacity=".6" d="M1 9.924c0-1.552 0-2.328.314-3.01.313-.682.902-1.187 2.08-2.196l1.143-.98C6.667 1.913 7.732 1 9 1c1.268 0 2.333.913 4.463 2.738l1.142.98c1.179 1.01 1.768 1.514 2.081 2.196.314.682.314 1.458.314 3.01v4.846c0 2.155 0 3.233-.67 3.902-.669.67-1.746.67-3.901.67H5.57c-2.155 0-3.232 0-3.902-.67C1 18.002 1 16.925 1 14.77V9.924z" />
                  <path className="_home_active" stroke="#000" strokeOpacity=".6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.857 19.341v-5.857a1 1 0 00-1-1H7.143a1 1 0 00-1 1v5.857" />
                </svg>
              </a>
            </li>
            <li className="nav-item _header_nav_item">
              <a className="nav-link _header_nav_link" aria-current="page" href="#friends">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="20" fill="none" viewBox="0 0 26 20">
                  <path fill="#000" fillOpacity=".6" fillRule="evenodd" d="M12.79 12.15h.429c2.268.015 7.45.243 7.45 3.732 0 3.466-5.002 3.692-7.415 3.707h-.894c-2.268-.015-7.452-.243-7.452-3.727 0-3.47 5.184-3.697 7.452-3.711l.297-.001h.132zm0 1.75c-2.792 0-6.12.34-6.12 1.962 0 1.585 3.13 1.955 5.864 1.976l.255.002c2.792 0 6.118-.34 6.118-1.958 0-1.638-3.326-1.982-6.118-1.982zm9.343-2.224c2.846.424 3.444 1.751 3.444 2.79 0 .636-.251 1.794-1.931 2.43a.882.882 0 01-1.137-.506.873.873 0 01.51-1.13c.796-.3.796-.633.796-.793 0-.511-.654-.868-1.944-1.06a.878.878 0 01-.741-.996.886.886 0 011.003-.735zm-17.685.735a.878.878 0 01-.742.997c-1.29.19-1.944.548-1.944 1.059 0 .16 0 .491.798.793a.873.873 0 01-.314 1.693.897.897 0 01-.313-.057C.25 16.259 0 15.1 0 14.466c0-1.037.598-2.366 3.446-2.79.485-.06.929.257 1.002.735zM12.789 0c2.96 0 5.368 2.392 5.368 5.33 0 2.94-2.407 5.331-5.368 5.331h-.031a5.329 5.329 0 01-3.782-1.57 5.253 5.253 0 01-1.553-3.764C7.423 2.392 9.83 0 12.789 0zm0 1.75c-1.987 0-3.604 1.607-3.604 3.58a3.526 3.526 0 001.04 2.527 3.58 3.58 0 002.535 1.054l.03.875v-.875c1.987 0 3.605-1.605 3.605-3.58S14.777 1.75 12.789 1.75zm7.27-.607a4.222 4.222 0 013.566 4.172c-.004 2.094-1.58 3.89-3.665 4.181a.88.88 0 01-.994-.745.875.875 0 01.75-.989 2.494 2.494 0 002.147-2.45 2.473 2.473 0 00-2.09-2.443.876.876 0 01-.726-1.005.881.881 0 011.013-.721zm-13.528.72a.876.876 0 01-.726 1.006 2.474 2.474 0 00-2.09 2.446A2.493 2.493 0 005.86 7.762a.875.875 0 11-.243 1.734c-2.085-.29-3.66-2.087-3.664-4.179 0-2.082 1.5-3.837 3.566-4.174a.876.876 0 011.012.72z" clipRule="evenodd" />
                </svg>
              </a>
            </li>
            <li className="nav-item _header_nav_item">
              <button type="button" className="nav-link _header_nav_link _header_notify_btn" aria-label="Notifications" onClick={toggleNotifications}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" fill="none" viewBox="0 0 20 22">
                  <path fill="#000" fillOpacity=".6" fillRule="evenodd" d="M7.547 19.55c.533.59 1.218.915 1.93.915.714 0 1.403-.324 1.938-.916a.777.777 0 011.09-.056c.318.284.344.77.058 1.084-.832.917-1.927 1.423-3.086 1.423h-.002c-1.155-.001-2.248-.506-3.077-1.424a.762.762 0 01.057-1.083.774.774 0 011.092.057zM9.527 0c4.58 0 7.657 3.543 7.657 6.85 0 1.702.436 2.424.899 3.19.457.754.976 1.612.976 3.233-.36 4.14-4.713 4.478-9.531 4.478-4.818 0-9.172-.337-9.528-4.413-.003-1.686.515-2.544.973-3.299l.161-.27c.398-.679.737-1.417.737-2.918C1.871 3.543 4.948 0 9.528 0zm0 1.535c-3.6 0-6.11 2.802-6.11 5.316 0 2.127-.595 3.11-1.12 3.978-.422.697-.755 1.247-.755 2.444.173 1.93 1.455 2.944 7.986 2.944 6.494 0 7.817-1.06 7.988-3.01-.003-1.13-.336-1.681-.757-2.378-.526-.868-1.12-1.851-1.12-3.978 0-2.514-2.51-5.316-6.111-5.316z" clipRule="evenodd" />
                </svg>
                <span className="_counting">6</span>
                <div id="_notify_drop" className={cn("_notification_dropdown", notificationsOpen && "show")}>
                  <div className="_notifications_content">
                    <h4 className="_notifications_content_title">Notifications</h4>
                    <div className="_notification_box_right">
                      <button type="button" className="_notification_box_right_link" onClick={toggleProfileMenu} aria-label="Notification menu">
                        <svg xmlns="http://www.w3.org/2000/svg" width="4" height="17" fill="none" viewBox="0 0 4 17">
                          <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
                          <circle cx="2" cy="8" r="2" fill="#C4C4C4" />
                          <circle cx="2" cy="15" r="2" fill="#C4C4C4" />
                        </svg>
                      </button>
                      <div className={cn("_notifications_drop_right", profileMenuOpen && "show")}>
                        <ul className="_notification_list">
                          <li className="_notification_item"><span className="_notification_link">Mark as all read</span></li>
                          <li className="_notification_item"><span className="_notification_link">Notifivations seetings</span></li>
                          <li className="_notification_item"><span className="_notification_link">Open Notifications</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="_notifications_drop_box">
                    <div className="_notifications_drop_btn_grp">
                      <button className="_notifications_btn_link" type="button">All</button>
                      <button className="_notifications_btn_link1" type="button">Unread</button>
                    </div>
                    <div className="_notifications_all">
                      {sidebarSuggestions.map((item) => (
                        <div className="_notification_box" key={item.id}>
                          <div className="_notification_image">
                            <img src="/assets/images/friend-req.png" alt="Notification" className="_notify_img" />
                          </div>
                          <div className="_notification_txt">
                            <p className="_notification_para">
                              <span className="_notify_txt_link">{item.name}</span> posted a link in your timeline.
                            </p>
                            <div className="_nitification_time"><span>42 minutes ago</span></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function MobileHeader() {
  return (
    <div className="_header_mobile_menu">
      <div className="_header_mobile_menu_wrap">
        <div className="container">
          <div className="_header_mobile_menu">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="_header_mobile_menu_top_inner">
                  <div className="_header_mobile_menu_logo">
                    <a href="/feed" className="_mobile_logo_link">
                      <img src="/assets/images/logo.svg" alt="Buddy Script" className="_nav_logo" />
                    </a>
                  </div>
                  <div className="_header_mobile_menu_right">
                    <form className="_header_form_grp">
                      <a href="#search" className="_header_mobile_search" aria-label="Search">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 17 17">
                          <circle cx="7" cy="7" r="6" stroke="#666" />
                          <path stroke="#666" strokeLinecap="round" d="M16 16l-3-3" />
                        </svg>
                      </a>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileBottomNav() {
  return (
    <div className="_mobile_navigation_bottom_wrapper">
      <div className="_mobile_navigation_bottom_wrap">
        <div className="conatiner">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <ul className="_mobile_navigation_bottom_list">
                <li className="_mobile_navigation_bottom_item">
                  <a href="/feed" className="_mobile_navigation_bottom_link _mobile_navigation_bottom_link_active">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="27" fill="none" viewBox="0 0 24 27">
                      <path className="_mobile_svg" fill="#000" fillOpacity=".6" stroke="#666666" strokeWidth="1.5" d="M1 13.042c0-2.094 0-3.141.431-4.061.432-.92 1.242-1.602 2.862-2.965l1.571-1.321C8.792 2.232 10.256 1 12 1c1.744 0 3.208 1.232 6.136 3.695l1.572 1.321c1.62 1.363 2.43 2.044 2.86 2.965.432.92.432 1.967.432 4.06v6.54c0 2.908 0 4.362-.92 5.265-.921.904-2.403.904-5.366.904H7.286c-2.963 0-4.445 0-5.365-.904C1 23.944 1 22.49 1 19.581v-6.54z" />
                      <path fill="#fff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.07 18.497h5.857v7.253H9.07v-7.253z" />
                    </svg>
                  </a>
                </li>
                <li className="_mobile_navigation_bottom_item">
                  <a href="#friends" className="_mobile_navigation_bottom_link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="20" fill="none" viewBox="0 0 27 20">
                      <path className="_dark_svg" fill="#000" fillOpacity=".6" fillRule="evenodd" d="M13.334 12.405h.138l.31.001c2.364.015 7.768.247 7.768 3.81 0 3.538-5.215 3.769-7.732 3.784h-.932c-2.364-.015-7.77-.247-7.77-3.805 0-3.543 5.405-3.774 7.77-3.789l.31-.001h.138zm0 1.787c-2.91 0-6.38.348-6.38 2.003 0 1.619 3.263 1.997 6.114 2.018l.266.001c2.91 0 6.379-.346 6.379-1.998 0-1.673-3.469-2.024-6.38-2.024zm9.742-2.27c2.967.432 3.59 1.787 3.59 2.849 0 .648-.261 1.83-2.013 2.48a.953.953 0 01-.327.058.919.919 0 01-.858-.575.886.886 0 01.531-1.153c.83-.307.83-.647.83-.81 0-.522-.682-.886-2.027-1.082a.9.9 0 01-.772-1.017c.074-.488.54-.814 1.046-.75zm-18.439.75a.9.9 0 01-.773 1.017c-1.345.196-2.027.56-2.027 1.082 0 .163 0 .501.832.81a.886.886 0 01.531 1.153.92.92 0 01-.858.575.953.953 0 01-.327-.058C.262 16.6 0 15.418 0 14.77c0-1.06.623-2.417 3.592-2.85.506-.061.97.263 1.045.751zM13.334 0c3.086 0 5.596 2.442 5.596 5.442 0 3.001-2.51 5.443-5.596 5.443H13.3a5.616 5.616 0 01-3.943-1.603A5.308 5.308 0 017.74 5.439C7.739 2.442 10.249 0 13.334 0zm0 1.787c-2.072 0-3.758 1.64-3.758 3.655-.003.977.381 1.89 1.085 2.58a3.772 3.772 0 002.642 1.076l.03.894v-.894c2.073 0 3.76-1.639 3.76-3.656 0-2.015-1.687-3.655-3.76-3.655zm7.58-.62c2.153.344 3.717 2.136 3.717 4.26-.004 2.138-1.647 3.972-3.82 4.269a.911.911 0 01-1.036-.761.897.897 0 01.782-1.01c1.273-.173 2.235-1.248 2.237-2.501 0-1.242-.916-2.293-2.179-2.494a.897.897 0 01-.756-1.027.917.917 0 011.055-.736zM6.81 1.903a.897.897 0 01-.757 1.027C4.79 3.13 3.874 4.182 3.874 5.426c.002 1.251.963 2.327 2.236 2.5.503.067.853.519.783 1.008a.912.912 0 01-1.036.762c-2.175-.297-3.816-2.131-3.82-4.267 0-2.126 1.563-3.918 3.717-4.262.515-.079.972.251 1.055.736z" clipRule="evenodd" />
                    </svg>
                  </a>
                </li>
                <li className="_mobile_navigation_bottom_item">
                  <a href="#composer" className="_mobile_navigation_bottom_link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="27" fill="none" viewBox="0 0 25 27">
                      <path className="_dark_svg" fill="#000" fillOpacity=".6" fillRule="evenodd" d="M10.17 23.46c.671.709 1.534 1.098 2.43 1.098.9 0 1.767-.39 2.44-1.099.36-.377.976-.407 1.374-.067.4.34.432.923.073 1.3-1.049 1.101-2.428 1.708-3.886 1.708h-.003c-1.454-.001-2.831-.608-3.875-1.71a.885.885 0 01.072-1.298 1.01 1.01 0 011.374.068zM12.663 0c5.768 0 9.642 4.251 9.642 8.22 0 2.043.549 2.909 1.131 3.827.576.906 1.229 1.935 1.229 3.88-.453 4.97-5.935 5.375-12.002 5.375-6.067 0-11.55-.405-11.998-5.296-.004-2.024.649-3.053 1.225-3.959l.203-.324c.501-.814.928-1.7.928-3.502C3.022 4.25 6.897 0 12.664 0zm0 1.842C8.13 1.842 4.97 5.204 4.97 8.22c0 2.553-.75 3.733-1.41 4.774-.531.836-.95 1.497-.95 2.932.216 2.316 1.831 3.533 10.055 3.533 8.178 0 9.844-1.271 10.06-3.613-.004-1.355-.423-2.016-.954-2.852-.662-1.041-1.41-2.221-1.41-4.774 0-3.017-3.161-6.38-7.696-6.38z" clipRule="evenodd" />
                      <span className="_counting">6</span>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StoryRail() {
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
            <div className={cn("col-xl-3 col-lg-3 col-md-4 col-sm-4 col", index > 1 && index < 3 && "_custom_mobile_none", index === 3 && "_custom_none")} key={story.id}>
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
                  <div className={story.active ? "_feed_inner_ppl_card_area_story" : story.id === "m-story-2" ? "_feed_inner_ppl_card_area_story_active" : "_feed_inner_ppl_card_area_story_inactive"}>
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

function Composer() {
  const { text, visibility, setText, setVisibility, reset } = usePostComposerStore();

  return (
    <div id="composer" className="_feed_inner_text_area _b_radious6 _padd_b24 _padd_t24 _padd_r24 _padd_l24 _mar_b16">
      <div className="_feed_inner_text_area_box">
        <div className="_feed_inner_text_area_box_image">
          <img src="/assets/images/txt_img.png" alt="Create post" className="_txt_img" />
        </div>
        <div className="form-floating _feed_inner_text_area_box_form">
          <textarea
            className="form-control _textarea"
            placeholder="Leave a comment here"
            id="floatingTextarea"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <label className="_feed_textarea_label" htmlFor="floatingTextarea">
            Write something ...
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" fill="none" viewBox="0 0 23 24">
              <path fill="#666" d="M19.504 19.209c.332 0 .601.289.601.646 0 .326-.226.596-.52.64l-.081.005h-6.276c-.332 0-.602-.289-.602-.645 0-.327.227-.597.52-.64l.082-.006h6.276zM13.4 4.417c1.139-1.223 2.986-1.223 4.125 0l1.182 1.268c1.14 1.223 1.14 3.205 0 4.427L9.82 19.649a2.619 2.619 0 01-1.916.85h-3.64c-.337 0-.61-.298-.6-.66l.09-3.941a3.019 3.019 0 01.794-1.982l8.852-9.5zm-.688 2.562l-7.313 7.85a1.68 1.68 0 00-.441 1.101l-.077 3.278h3.023c.356 0 .698-.133.968-.376l.098-.096 7.35-7.887-3.608-3.87zm3.962-1.65a1.633 1.633 0 00-2.423 0l-.688.737 3.606 3.87.688-.737c.631-.678.666-1.755.105-2.477l-.105-.124-1.183-1.268z" />
            </svg>
          </label>
        </div>
      </div>
      <div className="_feed_inner_text_area_bottom">
        <div className="_feed_inner_text_area_item">
          <div className="_feed_inner_text_area_bottom_photo _feed_common">
            <button type="button" className="_feed_inner_text_area_bottom_photo_link"><span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">Photo</span></button>
          </div>
          <div className="_feed_inner_text_area_bottom_video _feed_common">
            <button type="button" className="_feed_inner_text_area_bottom_photo_link"><span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">Video</span></button>
          </div>
          <div className="_feed_inner_text_area_bottom_event _feed_common">
            <button type="button" className="_feed_inner_text_area_bottom_photo_link"><span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">Event</span></button>
          </div>
          <div className="_feed_inner_text_area_bottom_article _feed_common">
            <button type="button" className="_feed_inner_text_area_bottom_photo_link"><span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">Article</span></button>
          </div>
        </div>
        <div className="_feed_inner_text_area_btn">
          <button type="button" className="_feed_inner_text_area_btn_link" onClick={reset}>
            <span>Post {visibility}</span>
          </button>
          <div className="mt-2 d-flex gap-2">
            <button type="button" className="_feed_inner_story_btn_link" onClick={() => setVisibility("Public")}>
              Public
            </button>
            <button type="button" className="_feed_inner_story_btn_link" onClick={() => setVisibility("Private")}>
              Private
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelinePost() {
  const isLiked = false;
  const likeCount = 19;

  return (
    <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
      <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
        <div className="_feed_inner_timeline_post_top">
          <div className="_feed_inner_timeline_post_box">
            <div className="_feed_inner_timeline_post_box_image">
              <img src="/assets/images/post_img.png" alt="Karim Saif" className="_post_img" />
            </div>
            <div className="_feed_inner_timeline_post_box_txt">
              <h4 className="_feed_inner_timeline_post_box_title">Karim Saif</h4>
              <p className="_feed_inner_timeline_post_box_para">5 minute ago . <a href="#0">Public</a></p>
            </div>
          </div>
          <div className="_feed_inner_timeline_post_box_dropdown">
            <div className="_feed_timeline_post_dropdown">
              <button type="button" className="_feed_timeline_post_dropdown_link" aria-label="Open post menu">
                <svg xmlns="http://www.w3.org/2000/svg" width="4" height="17" fill="none" viewBox="0 0 4 17">
                  <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
                  <circle cx="2" cy="8" r="2" fill="#C4C4C4" />
                  <circle cx="2" cy="15" r="2" fill="#C4C4C4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="_feed_inner_timeline_post_content">
          <p>
            This is a sample feed card rendered through React components. It keeps the same visual class names and spacing
            while moving the structure out of one huge HTML block.
          </p>
        </div>
        <div className="_feed_inner_timeline_post_image">
          <img src="/assets/images/feed_event1.png" alt="Post media" className="_post_cover_img" />
        </div>
        <div className="_feed_inner_timeline_reaction">
          <div className="_feed_inner_timeline_reaction_top">
            <button type="button" className="_feed_inner_timeline_reaction_link">
              {isLiked ? "Unlike" : "Like"} {likeCount}
            </button>
            <button type="button" className="_feed_inner_timeline_reaction_link">Comments 8</button>
            <button type="button" className="_feed_inner_timeline_reaction_link">Shares 2</button>
          </div>
          <div className="_feed_inner_timeline_reaction_bottom">
            <div className="_feed_inner_timeline_reaction_bottom_image">
              <img src="/assets/images/react_img1.png" alt="Liked by" className="_reaction_user_img" />
              <img src="/assets/images/react_img2.png" alt="Liked by" className="_reaction_user_img" />
              <img src="/assets/images/react_img3.png" alt="Liked by" className="_reaction_user_img" />
            </div>
            <span className="_feed_inner_timeline_reaction_bottom_para">Liked by Ryan Roslansky and 18 others</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeftSidebar() {
  return (
    <div className="_layout_left_sidebar_wrap">
      <div className="_layout_left_sidebar_inner">
        <div className="_left_inner_area_explore _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
          <h4 className="_left_inner_area_explore_title _title5 _mar_b24">Explore</h4>
          <ul className="_left_inner_area_explore_list">
            <li className="_left_inner_area_explore_item _explore_item"><a href="#0" className="_left_inner_area_explore_link">Learning</a> <span className="_left_inner_area_explore_link_txt">New</span></li>
            <li className="_left_inner_area_explore_item"><a href="#0" className="_left_inner_area_explore_link">Insights</a></li>
            <li className="_left_inner_area_explore_item"><a href="#0" className="_left_inner_area_explore_link">Find friends</a></li>
            <li className="_left_inner_area_explore_item"><a href="#0" className="_left_inner_area_explore_link">Bookmarks</a></li>
            <li className="_left_inner_area_explore_item"><a href="#0" className="_left_inner_area_explore_link">Group</a></li>
            <li className="_left_inner_area_explore_item _explore_item"><a href="#0" className="_left_inner_area_explore_link">Gaming</a> <span className="_left_inner_area_explore_link_txt">New</span></li>
            <li className="_left_inner_area_explore_item"><a href="#0" className="_left_inner_area_explore_link">Messages</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function RightSidebar() {
  return (
    <div className="_layout_right_sidebar_wrap">
      <div className="_layout_right_sidebar_inner">
        <div className="_right_inner_area_info _padd_t24 _padd_b24 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
          <div className="_right_inner_area_info_content _mar_b24">
            <h4 className="_right_inner_area_info_content_title _title5">You Might Like</h4>
            <span className="_right_inner_area_info_content_txt">
              <a className="_right_inner_area_info_content_txt_link" href="#0">See All</a>
            </span>
          </div>
          <hr className="_underline" />
          {sidebarSuggestions.map((item) => (
            <div className="_right_inner_area_info_ppl" key={item.id}>
              <div className="_right_inner_area_info_box">
                <div className="_right_inner_area_info_box_image">
                  <a href="#0">
                    <img src={item.image} alt={item.name} className="_ppl_img" />
                  </a>
                </div>
                <div className="_right_inner_area_info_box_txt">
                  <a href="#0"><h4 className="_right_inner_area_info_box_title">{item.name}</h4></a>
                  <p className="_right_inner_area_info_box_para">{item.role}</p>
                </div>
              </div>
              <div className="_right_info_btn_grp">
                <button type="button" className="_right_info_btn_link">Ignore</button>
                <button type="button" className="_right_info_btn_link _right_info_btn_link_active">Follow</button>
              </div>
            </div>
          ))}
        </div>
        <div className="_layout_right_sidebar_inner">
          <div id="friends" className="_feed_right_inner_area_card _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
            <div className="_feed_top_fixed">
              <div className="_feed_right_inner_area_card_content _mar_b24">
                <h4 className="_feed_right_inner_area_card_content_title _title5">Your Friends</h4>
                <span className="_feed_right_inner_area_card_content_txt">
                  <a className="_feed_right_inner_area_card_content_txt_link" href="#0">See All</a>
                </span>
              </div>
              <form className="_feed_right_inner_area_card_form">
                <svg className="_feed_right_inner_area_card_form_svg" xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 17 17">
                  <circle cx="7" cy="7" r="6" stroke="#666" />
                  <path stroke="#666" strokeLinecap="round" d="M16 16l-3-3" />
                </svg>
                <input className="form-control me-2 _feed_right_inner_area_card_form_inpt" type="search" placeholder="input search text" aria-label="Search" />
              </form>
            </div>
            <div className="_feed_bottom_fixed">
              {friends.map((friend) => (
                <div key={friend.id} className={cn("_feed_right_inner_area_card_ppl", !friend.online && "_feed_right_inner_area_card_ppl_inactive")}>
                  <div className="_feed_right_inner_area_card_ppl_box">
                    <div className="_feed_right_inner_area_card_ppl_image">
                      <a href="#0"><img src={friend.image} alt={friend.name} className="_box_ppl_img" /></a>
                    </div>
                    <div className="_feed_right_inner_area_card_ppl_txt">
                      <a href="#0"><h4 className="_feed_right_inner_area_card_ppl_title">{friend.name}</h4></a>
                      <p className="_feed_right_inner_area_card_ppl_para">{friend.role}</p>
                    </div>
                  </div>
                  <div className="_feed_right_inner_area_card_ppl_side">
                    {friend.online ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 14 14">
                        <rect width="12" height="12" x="1" y="1" fill="#0ACF83" stroke="#fff" strokeWidth="2" rx="6" />
                      </svg>
                    ) : (
                      <span>5 minute ago</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeedPageClient() {
  const { darkMode, toggleDarkMode } = useNavigationStore();
  const layoutClass = useMemo(() => cn("_layout _layout_main_wrapper", darkMode && "_dark_wrapper"), [darkMode]);

  return (
    <div className={layoutClass}>
      <div className="_layout_mode_swithing_btn">
        <button type="button" className="_layout_swithing_btn_link" onClick={toggleDarkMode} aria-label="Toggle dark mode">
          <div className="_layout_swithing_btn">
            <div className="_layout_swithing_btn_round" />
          </div>
          <div className="_layout_change_btn_ic1">
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="16" fill="none" viewBox="0 0 11 16">
              <path fill="#fff" d="M2.727 14.977l.04-.498-.04.498zm-1.72-.49l.489-.11-.489.11zM3.232 1.212L3.514.8l-.282.413zM9.792 8a6.5 6.5 0 00-6.5-6.5v-1a7.5 7.5 0 017.5 7.5h-1zm-6.5 6.5a6.5 6.5 0 006.5-6.5h1a7.5 7.5 0 01-7.5 7.5v-1zm-.525-.02c.173.013.348.02.525.02v1c-.204 0-.405-.008-.605-.024l.08-.997zm-.261-1.83A6.498 6.498 0 005.792 7h1a7.498 7.498 0 01-3.791 6.52l-.495-.87zM5.792 7a6.493 6.493 0 00-2.841-5.374L3.514.8A7.493 7.493 0 016.792 7h-1zm-3.105 8.476c-.528-.042-.985-.077-1.314-.155-.316-.075-.746-.242-.854-.726l.977-.217c-.028-.124-.145-.09.106-.03.237.056.6.086 1.165.131l-.08.997zm.314-1.956c-.622.354-1.045.596-1.31.792a.967.967 0 00-.204.185c-.01.013.027-.038.009-.12l-.977.218a.836.836 0 01.144-.666c.112-.162.27-.3.433-.42.324-.24.814-.519 1.41-.858L3 13.52zM3.292 1.5a.391.391 0 00.374-.285A.382.382 0 003.514.8l-.563.826A.618.618 0 012.702.95a.609.609 0 01.59-.45v1z" />
            </svg>
          </div>
          <div className="_layout_change_btn_ic2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="4.389" stroke="#fff" transform="rotate(-90 12 12)" />
              <path stroke="#fff" strokeLinecap="round" d="M3.444 12H1M23 12h-2.444M5.95 5.95L4.222 4.22M19.778 19.779L18.05 18.05M12 3.444V1M12 23v-2.445M18.05 5.95l1.728-1.729M4.222 19.779L5.95 18.05" />
            </svg>
          </div>
        </button>
      </div>

      <div className="_main_layout" onClick={() => useModalStore.getState().closeAll()}>
        <FeedHeader />
        <MobileHeader />
        <MobileBottomNav />
        <div className="container _custom_container">
          <div className="_layout_inner_wrap">
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                <LeftSidebar />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <div className="_layout_middle_wrap">
                  <div className="_layout_middle_inner">
                    <StoryRail />
                    <Composer />
                    <TimelinePost />
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                <RightSidebar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
