"use client";
import Image from "next/image";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import useForm from "@/app/hooks/useFrom";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/services/authApi";

const initialFormState = {
  email: "",
  password: "",
};

function Login() {
  const [login, { data: result, isLoading, isError, isSuccess }] = useLoginMutation();
  const router = useRouter();
  const { formData, handleChange, resetForm } = useForm(initialFormState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: formData.email,
      password: formData.password,
    };
    await login(user);
    if (isSuccess) {
      router.push(`/profile/${result._id}`);
    } else {
    }
    resetForm();
  };

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <>
      <div className="mt-10 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            width={400}
            height={70}
            alt="Dorpon"
            src="/b_logo.png"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-base-content">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm rounded-2xl border border-[#D4AF37]/12 bg-base-100 p-6 shadow-[0_10px_35px_rgba(0,0,0,0.08)]">
          <form onSubmit={handleSubmit} method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-base-content"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  onChange={handleChange}
                  value={formData.email}
                  autoComplete="email"
                  className="block w-full rounded-md border border-[#D4AF37]/15 bg-base-100 px-3 py-1.5 text-base text-base-content outline-none placeholder:text-base-content/40 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-base-content"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    href="/forget"
                    className="font-semibold text-[#b89220] transition hover:text-[#D4AF37]"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type={isVisible ? "text" : "password"}
                    required
                    onChange={handleChange}
                    value={formData.password}
                    autoComplete="current-password"
                    className="block w-full rounded-md border border-[#D4AF37]/15 bg-base-100 px-3 py-1.5 text-base text-base-content outline-none placeholder:text-base-content/40 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 sm:text-sm/6"
                  />
                </div>

                <button
                  type="button"
                  onClick={toggleVisibility}
                  aria-label={isVisible ? "Hide password" : "Show password"}
                  aria-pressed={isVisible}
                  aria-controls="password"
                  className="absolute inset-y-0 end-0 z-20 flex cursor-pointer items-center rounded-e-md px-2.5 text-base-content/50 transition-colors hover:text-[#D4AF37] focus:outline-none"
                >
                  {isVisible ? (
                    <EyeOff size={20} aria-hidden="true" />
                  ) : (
                    <Eye size={20} aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#D4AF37] px-3 py-1.5 text-sm/6 font-semibold text-black shadow-lg transition hover:bg-[#c9a42f] hover:shadow-[#D4AF37]/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          <div className="p-2">
            <p className="text-center text-sm/6 text-base-content">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-[#b89220] transition hover:text-[#D4AF37]"
              >
                Register
              </Link>
            </p>
          </div>

          <div className="my-4 flex items-center gap-4 content-center">
            <hr className="w-7/22 border-[#D4AF37]/20" />
            <span className="flex text-center text-sm text-base-content/70">
              Or continue with
            </span>
            <hr className="w-7/22 border-[#D4AF37]/20" />
          </div>

          <div className="flex items-center justify-center gap-4 rounded-md border border-[#D4AF37]/15 bg-base-100 px-3 py-1.5 transition hover:border-[#D4AF37]/35 hover:bg-[#D4AF37]/5">
            <FcGoogle />
            <span className="text-center text-base-content">Google</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;