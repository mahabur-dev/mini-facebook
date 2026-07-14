"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LoginValues } from "../types/auth.types";
import { loginSchema } from "../schemas/login.schema";
import { useAuthSession } from "../hooks/use-auth-session";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SocialAuthButton } from "@/components/forms/social-auth-button";
import { useState } from "react";

export function LoginForm() {
  const { login } = useAuthSession();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  return (
    <form
      className="_social_login_form"
      noValidate
      onSubmitCapture={(event) => {
        event.preventDefault();
      }}
      onSubmit={handleSubmit(async (values) => {
        setSubmitError(null);
        try {
          await login(values);
        } catch (error) {
          setSubmitError(error instanceof Error ? error.message : "Failed to log in");
        }
      })}
    >
      <SocialAuthButton
        iconSrc="/assets/images/google.svg"
        text="Or sign-in with google"
        className="_social_login_content_btn _mar_b40"
        aria-label="Sign in with Google"
      />
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="_social_login_form_input _mar_b14">
            <label className="_social_login_label _mar_b8" htmlFor="login-email">
              Email
            </label>
            <Input id="login-email" type="email" className="_social_login_input" {...register("email")} />
            {errors.email ? <p className="text-danger mt-2">{errors.email.message}</p> : null}
          </div>
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="_social_login_form_input _mar_b14">
            <label className="_social_login_label _mar_b8" htmlFor="login-password">
              Password
            </label>
            <Input id="login-password" type="password" className="_social_login_input" {...register("password")} />
            {errors.password ? <p className="text-danger mt-2">{errors.password.message}</p> : null}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
          <div className="form-check _social_login_form_check">
            <input
              className="form-check-input _social_login_form_check_input"
              type="checkbox"
              id="remember-me"
              {...register("rememberMe")}
            />
            <label className="form-check-label _social_login_form_check_label" htmlFor="remember-me">
              Remember me
            </label>
          </div>
        </div>
        <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
          <div className="_social_login_form_left">
            <p className="_social_login_form_left_para">Forgot password?</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
          <div className="_social_login_form_btn _mar_t40 _mar_b60">
            <Button type="submit" className="_social_login_form_btn_link _btn1" disabled={isSubmitting} aria-busy={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login now"}
            </Button>
          </div>
        </div>
      </div>
      {submitError ? <p className="text-danger mt-2">{submitError}</p> : null}
    </form>
  );
}
