import { AuthPageShell } from "@/features/auth/components/auth-page-shell";
import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <AuthPageShell
      image="/assets/images/login.png"
      imageAlt="Login illustration"
      logo="/assets/images/logo.svg"
      eyebrow="Welcome back"
      title="Login to your account"
      footerHref="/register"
      footerLabel="Create New Account"
      sectionClassName="_social_login_wrapper"
      wrapClassName="_social_login_wrap"
      imageColumnClassName="col-xl-8 col-lg-8 col-md-12 col-sm-12"
      imageOuterClassName="_social_login_left"
      imageClassName="_social_login_left_image"
      logoWrapperClassName="_social_login_left_logo _mar_b28"
      contentClassName="_social_login_content"
      eyebrowClassName="_social_login_content_para _mar_b8"
      titleClassName="_social_login_content_title _titl4 _mar_b50"
      footerClassName="_social_login_bottom_txt"
      footerTextClassName="_social_login_bottom_txt_para"
    >
      <div className="_social_login_content_bottom_txt _mar_b40">
        <span>Or</span>
      </div>
      <LoginForm />
    </AuthPageShell>
  );
}
