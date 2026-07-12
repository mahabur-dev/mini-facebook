import { AuthPageShell } from "@/features/auth/components/auth-page-shell";
import { RegisterForm } from "@/features/auth/components/register-form";

export default function RegisterPage() {
  return (
    <AuthPageShell
      image="/assets/images/registration.png"
      imageAlt="Registration illustration"
      logo="/assets/images/logo.svg"
      eyebrow="Get Started Now"
      title="Registration"
      footerHref="/login"
      footerLabel="Log in to your account"
      footerPrefixText="Already have an account?"
      sectionClassName="_social_registration_wrapper"
      wrapClassName="_social_registration_wrap"
      imageColumnClassName="col-xl-8 col-lg-8 col-md-12 col-sm-12"
      imageOuterClassName="_social_registration_right"
      imageClassName="_social_registration_right_image"
      imageElementClassName="_left_img _registration_left_img"
      secondaryImage="/assets/images/registration1.png"
      secondaryImageAlt="Registration dark illustration"
      secondaryImageClassName="_social_registration_right_image_dark"
      logoWrapperClassName="_social_registration_right_logo _mar_b28"
      contentClassName="_social_registration_content"
      eyebrowClassName="_social_registration_content_para _mar_b8"
      titleClassName="_social_registration_content_title _titl4 _mar_b50"
      footerClassName="_social_registration_bottom_txt"
      footerTextClassName="_social_registration_bottom_txt_para"
    >
      <div className="_social_registration_content_bottom_txt _mar_b40">
        <span>Or</span>
      </div>
      <RegisterForm />
    </AuthPageShell>
  );
}
