import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { GiPadlock } from "react-icons/gi";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(true);

  const initialValues = {
    email: email,
    password: password,
  };

  const router = useRouter();

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters!"),
  });

  const handleLogin = async (email: string, password: string) => {
    // const formData = new FormData();
    // formData.set('username', username);
    // formData.set('email', email);
    // formData.set('password', password);
    console.log(email);
    console.log(password);

    const formData = new URLSearchParams();
    formData.append("email", email);
    formData.append("password", password);

    const response = await fetch("http://127.0.0.1:5000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });
    console.log("Response login", response);
    const result = await response.json();

    try {
      if (!response.ok) {
        alert("Login Failed!");
      } else {
        console.log("Response success", result);
        alert("Login success!");
        router.push('/dashboard')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="relative min-h-screen items-center justify-center">
      <div className="absolute inset-0 bg-gray-900">
        <img
          src="./assets/bg-register.jpg"
          alt="Background"
          className="object-cover w-full h-full blur-md opacity-80"
        />
      </div>
      <div className="relative z-10">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 drop-shadow-2xl">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="w-40 h-20 mx-auto">
                <img src="./assets/logo.png" alt="logo" />
              </div>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Login Here
              </h1>
              <Formik
                initialValues={initialValues}
                validationSchema={loginSchema}
                onSubmit={(values) => {
                  handleLogin(values.email, values.password);
                }}
              >
                <Form className="space-y-4 md:space-y-6">
                  <div>
                    <div className="flex gap-2 ">
                      <IoIosMail className="mt-[3px]" />
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email
                      </label>
                    </div>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example123@ex.com"
                      values={onChangeEmail}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <ErrorMessage name="email" component="div" />
                  </div>

                  <div>
                    <div className="flex gap-2 ">
                      <GiPadlock className="mt-[3px]" />
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                    </div>
                    <div className="mb-6 flex justify-between items-center p-2.5 rounded-lg space-x-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <Field
                        id="password"
                        name="password"
                        values={onChangePassword}
                        type={visible ? "password" : "text"}
                        placeholder="**********"
                        // onChange={(e) => setPassword(e.target.value)}
                        className="block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      />
                      <div
                        className="cursor-pointer"
                        onClick={() => setVisible(!visible)}
                      >
                        {visible ? <FaEyeSlash /> : <IoEyeSharp />}
                      </div>
                    </div>
                    <ErrorMessage name="password" component="div" />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-600 hover:bg-blue-800 transition duration-300"
                  >
                    Login
                  </button>
                  <p>
                    don't have an account?{" "}
                    <a
                      href="/register"
                      className="text-primary-600 hover:underline text-blue-600"
                    >
                      sign up
                    </a>
                  </p>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
