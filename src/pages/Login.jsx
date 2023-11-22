import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Show, Hide, Lock, Message } from "react-iconly";
import { useState } from "react";
import Banner from "@/assets/LandingPage/banner-img.png";
import { InputWithLogo } from "@/components/inputs";

const Login = () => {
  // react hooks form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //useState
  const [valid, setValid] = useState({});
  const [passwordType, setPasswordType] = useState("password");
  //react router dom
  const navigate = useNavigate();
  // handle submit
  const onSubmit = (data) => {
    let error = {};
    let loginValid = true;
    const dummyUser = { email: "admin@gmail.com", password: "123" };
    if (
      data.email === dummyUser.email &&
      data.password === dummyUser.password
    ) {
      localStorage.setItem("user", JSON.stringify(dummyUser));
      localStorage.setItem("isLoggedIn", true);
      loginValid = false;
      navigate("/dashboard");
    } else {
      error.email = "Invalid username or password";
      error.password = "Invalid username or password";
      loginValid = true;
    }
    setValid(error);
    return loginValid;
  };

  // Handle untuk menampilkan password
  const handleShowPassword = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-1 items-center p-5 h-screen">
        <div className="banner rounded-md bg-green-500 flex justify-center items-center h-full p-10">
          <img src={Banner} alt="" className="w-4/5" />
        </div>

        {/* Form Login */}
        <form className="p-10 w-3/4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <p className="text-3xl font-bold">Selamat Datang👋 </p>
          <p className="font-regular text-gray-400 my-3 w-2/3">
            Login terlebih dahulu untuk mengakses halaman Admin
          </p>
          <div className="wrapper flex flex-col gap-3 my-5">
            <Controller
              name={"email"}
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <InputWithLogo
                  type={"text"}
                  id={"email"}
                  label={"Email"}
                  Logo={Message}
                  error={errors.email}
                  autoComplete={"off"}
                  {...field}
                />
              )}
            />
            {/* Menampilkan error pada email */}
            {errors.email && (
              <p className="error" style={{ color: "red" }}>
                {errors.email.message}
              </p>
            )}

            <div className="relative wrapper">
              <Controller
                name={"password"}
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 2,
                    message: "Password must be at least 2 characters long",
                  },
                }}
                render={({ field }) => (
                  <InputWithLogo
                    label={"Password"}
                    id={"password"}
                    Logo={Lock}
                    type={passwordType}
                    error={errors.password}
                    {...field}
                  />
                )}
              />

              {/* Button Hide and Seek */}
              <button
                className="absolute z-10 inset-y-0 right-5 flex items-center pl-3.5"
                onClick={handleShowPassword}
              >
                {passwordType === "password" ? <Show /> : <Hide />}
              </button>
            </div>
            {/* menampilkan error pada password */}
            {errors.password && (
              <p className="error" style={{ color: "red" }}>
                {errors.password.message}
              </p>
            )}

            {/* Validasi email password salah */}
            {valid?.email && valid?.password && (
              <p className="error py-2" style={{ color: "red" }}>
                {valid?.email && valid?.password}
              </p>
            )}
          </div>

          {/* Button Submit */}
          <button
            type="submit"
            className="w-full p-3 text-center bg-green-500 text-white font-bold rounded-lg"
          >
            Login
          </button>
        </form>
        {/* End Form Login */}
      </div>
    </>
  );
};

export default Login;
