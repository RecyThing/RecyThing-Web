import { adminLogin, adminLoginSelector } from "@/store/auth";
import { Controller, useForm } from "react-hook-form";
import { InputWithLogo } from "@/components/inputs";
import { Show, Hide, Lock, Message } from "react-iconly";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Banner from "@/assets/LandingPage/banner-img.png";
import { useCustomToast } from "@/hooks";

const Login = () => {
	// react hooks form
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	//useState
	const [passwordType, setPasswordType] = useState("password");
	const { status, message } = useSelector(adminLoginSelector);
	//react router dom
	const navigate = useNavigate();

	// dispatch
	const dispatch = useDispatch();

	// handle submit
	const handleOnSubmit = (data) => {
		dispatch(adminLogin(data)).then((res) => {
			if (res.payload.status) {
				navigate("/dashboard");
			}
		});
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

	useCustomToast(status, message);

	return (
		<>
			<div className="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-1 items-center p-5 h-screen">
				<div className="banner rounded-md bg-green-500 flex justify-center items-center h-full p-10">
					<img
						src={Banner}
						alt=""
						className="w-4/5"
					/>
				</div>

				{/* Form Login */}
				<form
					className="p-10 w-3/4 mx-auto"
					onSubmit={handleSubmit(handleOnSubmit)}
				>
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
							<p
								className="error"
								style={{ color: "red" }}
							>
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
							<p
								className="error"
								style={{ color: "red" }}
							>
								{errors.password.message}
							</p>
						)}
					</div>

					{/* Button Submit */}
					<button
						type="submit"
						className="w-full p-3 text-center bg-green-500 text-white font-bold rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
						disabled={status === "loading" ? true : false}
					>
						{status === "loading" ? "Loading..." : "Login"}
					</button>
				</form>
				{/* End Form Login */}
			</div>
		</>
	);
};

export default Login;
