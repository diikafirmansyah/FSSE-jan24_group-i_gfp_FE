import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { API_URL } from "@/utils/config";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { GiPadlock } from "react-icons/gi";
import { toastAlert } from "@/utils/toastAlert";

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
    email: Yup.string().email("*Invalid email").required("*Email is required"),
    password: Yup.string()
      .required("*Password is required")
      .min(6, "*Password must be at least 6 characters!"),
  });

  const handleLogin = async (email: string, password: string) => {

    const formData = new URLSearchParams();
    formData.append("email", email);
    formData.append("password", password);

    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const result = await response.json();
    try {
      if (!response.ok) {
        toastAlert("error" ,"Login Failed!");
      } else {
        localStorage.setItem('access_token', result.access_token);
        toastAlert("success", "Login Success!");
        router.push('/dashboard');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="relative min-h-screen items-center justify-center">
      <div className="absolute inset-0">
        <img
          src="./assets/bg-register.jpg"
          alt="Background"
          className="object-cover w-full h-full blur-md opacity-80"
        />
      </div>
      <div className="relative z-10">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 drop-shadow-2xl">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 border-white">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="w-40 h-20 mx-auto">
                <img src="./assets/logo.png" alt="logo" />
              </div>
              <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-gray-700 text-center py-5">
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
                      <IoIosMail className="mt-[3px] icon-black" />
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900"
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
                      className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  border-gray-600 placeholder-gray-400 text-black focus:ring-border-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage name='email' component='div' className='text-red-600 text-sm' />
                  </div>

                  <div>
                    <div className="flex gap-2 ">
                      <GiPadlock className="mt-[3px] icon-black" />
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Password
                      </label>
                    </div>
                    <div className="relative w-full">
												<Field
													id="password"
													name="password"
													type={visible ? 'password' : 'text'}
													placeholder="**********"
													values={onChangePassword}
													className="block w-full p-2.5 rounded-lg border border-gray-600 placeholder-gray-400 text-gray-900 focus:ring-primary-600 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
												/>
												<div
												
													className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
													onClick={() => setVisible(!visible)}
												>
													{visible ? <FaEyeSlash className='text-gray-600' /> : <IoEyeSharp className='text-gray-600' />}
												</div>
											</div>
                    <ErrorMessage name='password' component='div' className='text-red-600 text-sm' />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-600 hover:bg-blue-800 transition duration-300"
                  >
                    Login
                  </button>
                  <p>
                    Don't have an account?{" "}
                    <a
                      href="/register"
                      className="text-primary-600 hover:underline text-blue-600"
                    >
                      Sign up
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
