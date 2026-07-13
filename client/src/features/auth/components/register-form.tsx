"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RegisterValues } from "../types/auth.types";
import { registerSchema } from "../schemas/register.schema";
import { useAuthSession } from "../hooks/use-auth-session";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SocialAuthButton } from "@/components/forms/social-auth-button";
import { useState } from "react";

export function RegisterForm() {
  const { register: createSession } = useAuthSession();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      agreeToTerms: true,
    },
  });

  return (
    <form
      className="_social_registration_form"
      noValidate
      onSubmitCapture={(event) => {
        event.preventDefault();
      }}
      onSubmit={handleSubmit(async (values) => {
        setSubmitError(null);
        try {
          await createSession(values);
        } catch (error) {
          setSubmitError(error instanceof Error ? error.message : "Failed to create account");
        }
      })}
    >
      <SocialAuthButton
        iconSrc="/assets/images/google.svg"
        text="Register with google"
        className="_social_registration_content_btn _mar_b40"
        aria-label="Register with Google"
      />
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="_social_registration_form_input _mar_b14">
            <label className="_social_registration_label _mar_b8" htmlFor="register-first-name">
              First Name
            </label>
            <Input id="register-first-name" className="_social_registration_input" {...register("firstName")} />
            {errors.firstName ? <p className="text-danger mt-2">{errors.firstName.message}</p> : null}
          </div>
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="_social_registration_form_input _mar_b14">
            <label className="_social_registration_label _mar_b8" htmlFor="register-last-name">
              Last Name
            </label>
            <Input id="register-last-name" className="_social_registration_input" {...register("lastName")} />
            {errors.lastName ? <p className="text-danger mt-2">{errors.lastName.message}</p> : null}
          </div>
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="_social_registration_form_input _mar_b14">
            <label className="_social_registration_label _mar_b8" htmlFor="register-email">
              Email
            </label>
            <Input id="register-email" type="email" className="_social_registration_input" {...register("email")} />
            {errors.email ? <p className="text-danger mt-2">{errors.email.message}</p> : null}
          </div>
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="_social_registration_form_input _mar_b14">
            <label className="_social_registration_label _mar_b8" htmlFor="register-password">
              Password
            </label>
            <Input
              id="register-password"
              type="password"
              className="_social_registration_input"
              {...register("password")}
            />
            {errors.password ? <p className="text-danger mt-2">{errors.password.message}</p> : null}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12">
          <div className="form-check _social_registration_form_check">
            <input
              className="form-check-input _social_registration_form_check_input"
              type="checkbox"
              id="agree-terms"
              defaultChecked
              {...register("agreeToTerms")}
            />
            <label className="form-check-label _social_registration_form_check_label" htmlFor="agree-terms">
              I agree to terms &amp; conditions
            </label>
          </div>
          {errors.agreeToTerms ? <p className="text-danger mt-2">{errors.agreeToTerms.message}</p> : null}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
          <div className="_social_registration_form_btn _mar_t40 _mar_b60">
            <Button type="submit" className="_social_registration_form_btn_link _btn1" disabled={isSubmitting}>
              Create New Account
            </Button>
          </div>
        </div>
      </div>
      {submitError ? <p className="text-danger mt-2">{submitError}</p> : null}
    </form>
  );
}
