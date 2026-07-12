"use client";

import { useNavigationStore } from "@/store/navigation.store";

export function MobileHeader() {
  const { toggleMobileMenu } = useNavigationStore();

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
                    <div className="_header_mobile_toggle">
                      <button type="button" className="_header_mobile_btn_link" value="go to mobile menu" onClick={toggleMobileMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" fill="none" viewBox="0 0 18 14">
                          <path stroke="#666" strokeLinecap="round" strokeWidth="1.5" d="M1 1h16M1 7h16M1 13h16" />
                        </svg>
                      </button>
                    </div>
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
