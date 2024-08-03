import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { GiPadlock } from "react-icons/gi";
import { BsPhone } from "react-icons/bs";


const Register = () => {

  const [username, setuserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
	const [phoneNumber, setPhoneNumber] = useState<string>('');
	

  const [visible, setVisible] = useState<boolean>(true);

  const initialValues = {
    username: username,
    email: email,
    password: password,
		phoneNumber: phoneNumber,
  };

  const router = useRouter();

//   const onChangeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setuserName(event.target.value);
//   };

//   const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setEmail(event.target.value);
//   };

//   const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setPassword(event.target.value);
//   };

// 	const onChangePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
// 		setPhoneNumber(event.target.value);
// 	};

  const registerSchema = Yup.object().shape({
    username: Yup.string().required('*Name is required').min(3, '*Name must be at least 3 characters!'),
    email: Yup.string().email('*Invalid email').required('*Email is required'),
    password: Yup.string().required('*Password is required').min(6, '*Password must be at least 6 characters!'),
		phoneNumber: Yup.string().required('*Phone number is required')
  });

  const handleRegister = async (values: {username: string, email: string, password: string, phoneNumber: string}) => {
		const response = await fetch('http://localhost:3000/users/register,', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ 
				name: values.username, email: values.email, password: values.password, phone: values.phoneNumber }),
		})
		console.log('Response register', response);
    const result = await response.json()

		try {
			if(!response.ok){
				alert('Registration Failed!')
			}else{
				console.log('Response success', result);
				alert('Registration success!')
				router.push('/login')
			}
		}catch (error) {
			console.log(error);
		}
  };


  return (
    <section className='relative min-h-screen items-center justify-center'>
			<div className="absolute inset-0 bg-gray-900">
        <img
          src="./assets/bg-register.jpg"
          alt="Background"
          className="object-cover w-full h-full blur-md opacity-80"
        />
			</div>
      <div className="relative z-10">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 drop-shadow-2xl">
					<div className="md:flex-wrap w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-2xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<div className="w-40 h-20 mx-auto">
								<img src="./assets/logo.png" alt="logo"/>
							</div>
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">Register Here</h1>
							<Formik
								initialValues={initialValues}
								validationSchema={registerSchema}
								onSubmit={(values) => {
									console.log('register', {
										username: values.username,
										email: values.email,
										password: values.password,
										phoneNumber: values.phoneNumber
									})
									const data = {
										username: values.username,
										email: values.email,
										password: values.password,
										phoneNumber: values.phoneNumber
									}
									if (values.username && values.email && values.password && values.phoneNumber) handleRegister(data)
								}}>
								<Form action="#" className="space-y-4 md:space-y-6">
									<div className='flex flex-row justify-between gap-[2.5em]'>
										<div className="w-1/2">
											<div className='flex gap-2'>
												<FaUser className='mt-[2px]'/>
												<label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
											</div>
											<input
												id = "name"
												name="name"
												type="text"
												placeholder="your name"
												onChange={(e:any) => setuserName(e.target.value)}
												className="border border-blue-500 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500"
											/>
											<ErrorMessage name='username' component='div' className='text-red-600 text-sm'/>
										</div>
										<div className="w-1/2">
											<div className='flex gap-2 '>
												<IoIosMail className='mt-[3px]'/>
												<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
											</div>
											<input
												id = "email"
												name="email"
												type="email"
												placeholder="example123@ex.com"
												onChange={(e:any) => setEmail(e.target.value)}
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											/>
											<ErrorMessage name='email' component='div' className='text-red-600 text-sm'/>
										</div>
									</div>
									
									<div className='flex flex-row justify-between gap-[2.5em]'>
										<div className="w-1/2">
												<div className='flex gap-2'>
													<BsPhone className='mt-[2px]'/>
													<label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
												</div>
												<input
													id = "name"
													name="name"
													type="number"
													placeholder="your phone number"
													onChange={(e:any) => setPhoneNumber(e.target.value)}
													className="border border-blue-500 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500"
												/>
												<ErrorMessage name='phoneNumber' component='div' className='text-red-600 text-sm'/>
												</div>
										<div className="w-1/2">
											<div className='flex gap-2 '>
												<GiPadlock className='mt-[3px]'/>
												<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
											</div>
											<div className = "flex justify-between items-center p-2.5 rounded-lg space-x-1 border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
												<input
													id = "password"
													name="password"
													onChange={(e:any) => setPassword(e.target.value)}
													type={visible ? 'password' : 'text'}
													placeholder="**********"
													className="block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
												/>
												<div className='cursor-pointer' onClick={() => setVisible(!visible)}>
													{visible?  <FaEyeSlash /> : <IoEyeSharp />}
												</div>
											</div>
											<ErrorMessage name='password' component='div' className='text-red-600 text-sm'/>
										</div>	
									</div>	
									<div className='flex gap-10 justify-center'>
										<h4 className="items-center mt-[13px] font-bold">Role:</h4>
										<div className="flex justify-center gap-[3em] cursor-pointer">
											<div className="flex items-center  ">
												<input 
													id="bordered-1" 
													type="radio"
													value=" "
													name="bordered-radio"
													className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
												<label htmlFor='bordered-1' className='w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'>Seller</label>
											</div>
											<div className="flex items-center ">
												<input
													id="bordered-1" 
													type="radio"
													value=" "
													name="bordered-radio"
													className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
												<label htmlFor='bordered-1' className='w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'>Customer</label>
											</div>	
										</div>	
									</div>
									<div className="flex items-start">
										<div className="flex items-center h-5">
											<input 
												id="terms" 
												aria-describedby="terms" 
												type="checkbox" 
												className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
											/>
										</div>
										<div className="ml-3 text-sm">
											<label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline text-blue-600 ">Terms and Conditions</a></label>
										</div>
									</div>
									<button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-600 hover:bg-blue-800 transition duration-300">Create an account</button>
									<p>Already have an account? <a onClick={() => router.push('/login')} className="text-primary-600 hover:underline text-blue-600 cursor-pointer">Login here</a></p>
								</Form>
							</Formik>
						</div>
					</div>
				</div>
			</div>
    </section>
  );
};

export default Register;