"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ClockIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { loginFormControls, registrationFormControls } from "../utils";
import { useSession } from "next-auth/react";
import InputComponent from "./FormElements/InputComponent";
import { registerNewUser } from "../services/register";
import { sendMailResetPassword } from "../services/sendEmail";

const initialFormDataLogin = {
  email: "",
  password: "",
};

const initialFormDataRegister = {
  name: "",
  email: "",
  password: "",
  repeatPassword: "",
  image: "",
};

type variant =
  | "LOGIN"
  | "REGISTER"
  | "FORGOT_PASSWORD"
  | "INSERT_CODE"
  | "CHANGE_NEW_PASSWORD";

function Login() {
  const { data: session } = useSession();
  const [formDataLogin, setFormDataLogin] = useState(initialFormDataLogin);
  const [formDataRegister, setFormDataRegister] = useState(
    initialFormDataRegister
  );
  const [formForgotPassword, setFormForgotPassword] = useState("");

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [code, setCode] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [variant, setVariant] = useState<variant>("LOGIN");
  const router = useRouter();

  function startTimer() {
    setMinutes(1);
    setSeconds(0);
    setCode(Math.floor(100000 + Math.random() * 900000));
    setIsRunning(true);
  }

  function isValidForm() {
    if (variant === "LOGIN") {
      return formDataLogin &&
        formDataLogin.email &&
        formDataLogin.email.trim() !== "" &&
        formDataLogin.password &&
        formDataLogin.password.trim() !== ""
        ? true
        : false;
    } else if (variant === "REGISTER") {
      return formDataRegister &&
        formDataRegister.name &&
        formDataRegister.name.trim() !== "" &&
        formDataRegister.email &&
        formDataRegister.email.trim() !== "" &&
        formDataRegister.password &&
        formDataRegister.password.trim() !== "" &&
        formDataRegister.repeatPassword &&
        formDataRegister.repeatPassword.trim() !== ""
        ? true
        : false;
    } else {
      return formForgotPassword && formForgotPassword.trim() !== ""
        ? true
        : false;
    }
  }

  async function handleLogin() {
    // Toast notification to say loading...
    const notification = toast.loading("Loading ...");
    signIn("credentials", {
      ...formDataLogin,
      redirect: false,
    }).then((callback) => {
      if (callback?.error) {
        toast.error(callback?.error, {
          id: notification,
        });
      }

      if (callback?.ok && !callback?.error) {
        toast.success("Login successfully!", {
          id: notification,
        });
        router.refresh();
      }
    });
    // console.log(res);
    // if (res.success) {
    // toast.success(res.message, {
    //   id: notification,
    // });
    //   setIsAuthUser(true);
    //   setUser(res?.finalData?.user);
    //   setFormData(initialFormdata);
    //   Cookies.set("token", res?.finalData?.token);
    //   localStorage.setItem("user", JSON.stringify(res?.finalData?.user));
    //   setComponentLevelLoader({ loading: false, id: "" });
    // } else {
    // toast.error(res.message, {
    //   id: notification,
    // });
    //   setIsAuthUser(false);
    //   setComponentLevelLoader({ loading: false, id: "" });
    // }
  }

  async function handleRegisterOnSubmit() {
    // Toast notification to say loading...
    const notification = toast.loading("Loading ...");
    const data = await registerNewUser(formDataRegister);
    if (data.success) {
      toast.success(data.message, {
        id: notification,
      });
      setFormDataRegister(initialFormDataRegister);
    } else {
      toast.error(data.message, {
        id: notification,
      });
    }
  }
  async function handleResetPasswordOnSubmit() {
    // Toast notification to say loading...
    startTimer();
    console.log(formForgotPassword);

    await sendMailResetPassword({ email: formForgotPassword, code });
    // if (isRunning && minutes == 0 && seconds == 0) {
    //   console.log();

    // } else {
    // }
  }

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
        } else if (minutes > 0) {
          setMinutes((minutes) => minutes - 1);
          setSeconds(59);
        }
      }, 1000);
    }

    console.log(seconds, minutes, isRunning);

    return () => clearInterval(interval);
  }, [seconds, minutes, isRunning]);

  return (
    <div className="bg-[#11A37F] h-screen flexCenter">
      <div className=" flex-1 bg-[#11A37F] relative text-black">
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <div className="flex flex-col justify-center items-center w-full lg:flex-row">
            <div className="mr-10 py-10 border-r-4 max-lg:hidden">
              <Image
                src="https://links.papareact.com/89k"
                width={300}
                height={300}
                alt="image"
              />
            </div>
            <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
              <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
                {variant === "LOGIN" ? (
                  <>
                    <p className="w-full text-4xl font-medium text-center font-serif">
                      Login
                    </p>
                    <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-4">
                      {loginFormControls.map((controlItem) =>
                        controlItem.componentType === "input" ? (
                          <InputComponent
                            key={controlItem.id}
                            type={controlItem.type}
                            placeholder={controlItem.placeholder}
                            label={controlItem.label}
                            value={formDataLogin[controlItem.id]}
                            onChange={(event) => {
                              setFormDataLogin({
                                ...formDataLogin,
                                [controlItem.id]: event.target.value,
                              });
                            }}
                          />
                        ) : null
                      )}
                      <div className="flexCenter">
                        <div className="flex-1 border-t-2"></div>
                        <div className="text-[#e5e7eb] mx-4 text-sm">HOẶC</div>
                        <div className="flex-1 border-t-2"></div>
                      </div>
                      <div className="flexCenter">
                        <button
                          className="flex-1 flexCenter px-4 py-2 border-2 rounded hover:bg-slate-50 mr-4"
                          onClick={() => {
                            signIn("google");
                          }}
                        >
                          <Image
                            src="https://i.pinimg.com/originals/74/65/f3/7465f30319191e2729668875e7a557f2.png"
                            width={30}
                            height={30}
                            alt="image"
                          />
                          <div className="ml-2 text-xl">Google</div>
                        </button>
                        <button
                          className="flex-1 flexCenter px-4 py-2 border-2 rounded hover:bg-slate-50"
                          onClick={() => signIn("github")}
                        >
                          <Image
                            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                            width={30}
                            height={30}
                            alt="image"
                          />
                          <div className="ml-2 text-xl">Github</div>
                        </button>
                      </div>
                      <button
                        className="hover:text-red-600"
                        onClick={() => {
                          setVariant("FORGOT_PASSWORD");
                          if (isRunning) {
                            setIsRunning(false);
                          }
                        }}
                      >
                        Forgot Password?
                      </button>
                      <button
                        className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-[#11A37F] px-6 py-4 text-lg 
                     text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                        disabled={!isValidForm()}
                        onClick={handleLogin}
                      >
                        Login
                      </button>
                      <div className="flex flex-col gap-2">
                        <p>New to website ?</p>
                        <button
                          className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                     text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                          onClick={() => {
                            setVariant("REGISTER");
                            setFormDataLogin(initialFormDataLogin);
                          }}
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  </>
                ) : variant === "REGISTER" ? (
                  <>
                    <p className="w-full text-4xl font-medium text-center font-serif">
                      Sign up for an account
                    </p>
                    <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-4">
                      {registrationFormControls.map((controlItem) => {
                        return (
                          <InputComponent
                            key={controlItem.id}
                            type={controlItem.type}
                            placeholder={controlItem.placeholder}
                            label={controlItem.label}
                            onChange={(event) => {
                              setFormDataRegister({
                                ...formDataRegister,
                                [controlItem.id]: event.target.value,
                              });
                            }}
                            value={formDataRegister[controlItem.id]}
                          />
                        );
                      })}
                      <button
                        className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-[#11A37F] px-6 py-4 text-lg 
                     text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                        disabled={!isValidForm()}
                        onClick={handleRegisterOnSubmit}
                      >
                        Register
                      </button>
                      <div className="flex flex-col gap-2">
                        <button
                          className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                     text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                          onClick={() => {
                            setVariant("LOGIN");
                            setFormDataRegister(initialFormDataRegister);
                          }}
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="w-full text-4xl font-medium text-center font-serif">
                      Reset
                    </p>
                    <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-4">
                      <InputComponent
                        type="email"
                        placeholder="Enter your email"
                        label="Email"
                        onChange={(event) => {
                          console.log(
                            Math.floor(100000 + Math.random() * 900000)
                          );
                          setFormForgotPassword(event.target.value);
                        }}
                        value={formForgotPassword}
                      />
                      {isRunning ? (
                        minutes == 0 && seconds == 0 ? (
                          <>
                            <div className="text-red-600 ml-2">
                              Thay đổi mk sau
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="text-red-600 ml-2 flex items-center">
                              <ClockIcon className="w-5 h-5 mr-2" />
                              <div>
                                {minutes} : {seconds}
                              </div>
                            </div>
                          </>
                        )
                      ) : (
                        <></>
                      )}
                      <button
                        className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-[#11A37F] px-6 py-4 text-lg 
                     text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                        disabled={!isValidForm()}
                        onClick={handleResetPasswordOnSubmit}
                      >
                        Reset
                      </button>
                      <div className="flex flex-col gap-2">
                        <button
                          className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                     text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                          onClick={() => {
                            setVariant("LOGIN");
                            setFormForgotPassword("");
                          }}
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
