import type { ReactNode } from "react";

type AuthPageShellProps = {
  image: string;
  imageAlt: string;
  logo: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  footerHref: string;
  footerLabel: string;
  sectionClassName: string;
  wrapClassName: string;
  imageColumnClassName: string;
  imageOuterClassName: string;
  imageClassName: string;
  logoWrapperClassName: string;
  contentClassName: string;
  eyebrowClassName: string;
  titleClassName: string;
  footerClassName: string;
  footerTextClassName: string;
  secondaryImage?: string;
  secondaryImageAlt?: string;
  secondaryImageClassName?: string;
};

export function AuthPageShell({
  image,
  imageAlt,
  logo,
  eyebrow,
  title,
  children,
  footerHref,
  footerLabel,
  sectionClassName,
  wrapClassName,
  imageColumnClassName,
  imageOuterClassName,
  imageClassName,
  logoWrapperClassName,
  contentClassName,
  eyebrowClassName,
  titleClassName,
  footerClassName,
  footerTextClassName,
  secondaryImage,
  secondaryImageAlt,
  secondaryImageClassName,
}: AuthPageShellProps) {
  return (
    <section className={`${sectionClassName} _layout_main_wrapper`}>
      <div className="_shape_one">
        <img src="/assets/images/shape1.svg" alt="" className="_shape_img" />
        <img src="/assets/images/dark_shape.svg" alt="" className="_dark_shape" />
      </div>
      <div className="_shape_two">
        <img src="/assets/images/shape2.svg" alt="" className="_shape_img" />
        <img src="/assets/images/dark_shape1.svg" alt="" className="_dark_shape _dark_shape_opacity" />
      </div>
      <div className="_shape_three">
        <img src="/assets/images/shape3.svg" alt="" className="_shape_img" />
        <img src="/assets/images/dark_shape2.svg" alt="" className="_dark_shape _dark_shape_opacity" />
      </div>
      <div className={wrapClassName}>
        <div className="container">
          <div className="row align-items-center">
            <div className={imageColumnClassName}>
              <div className={imageOuterClassName}>
                <div className={imageClassName}>
                  <img src={image} alt={imageAlt} className="_left_img" />
                </div>
              </div>
              {secondaryImage ? (
                <div className={secondaryImageClassName}>
                  <img src={secondaryImage} alt={secondaryImageAlt ?? ""} />
                </div>
              ) : null}
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div className={contentClassName}>
                <div className={logoWrapperClassName}>
                  <img src={logo} alt="Image" className="_left_logo" />
                </div>
                <p className={eyebrowClassName}>{eyebrow}</p>
                <h4 className={titleClassName}>{title}</h4>
                {children}
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className={footerClassName}>
                      <p className={footerTextClassName}>
                        Dont have an account? <a href={footerHref}>{footerLabel}</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
