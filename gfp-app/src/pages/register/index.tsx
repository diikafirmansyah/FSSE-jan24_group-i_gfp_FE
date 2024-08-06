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
		role: '',
	};

	const router = useRouter();

	const onChangeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setuserName(event.target.value);
	};

	const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const onChangePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPhoneNumber(event.target.value);
	};

	const registerSchema = Yup.object().shape({
		username: Yup.string().required('*Name is required').min(3, '*Name must be at least 3 characters!'),
		email: Yup.string().email('*Invalid email').required('*Email is required'),
		password: Yup.string().required('*Password is required').min(6, '*Password must be at least 6 characters!'),
		phoneNumber: Yup.string().required('*Phone number is required')
	});

	const handleRegister = async (username: string, email: string, password: string, phoneNumber: string, role: string) => {

		console.log('Register', username, email, password, phoneNumber, role);

		const formData = new URLSearchParams();
		formData.append("email", email);
		formData.append("password", password);
		formData.append("username", username);
		formData.append("phonenumber", phoneNumber);
		formData.append("role", role)

		const response = await fetch('http://127.0.0.1:5000/users/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: formData.toString(),
		})
		console.log('Response register', response);
		const result = await response.json()

		try {
			if (!response.ok) {
				alert('Registration Failed!')
			} else {
				console.log('Response success', result);
				alert('Registration success!')
				router.push('/login')
			}
		} catch (error) {
			console.log(error);
		}
	};


	return (
		<section className='relative min-h-screen items-center justify-center'>
			<div className="absolute inset-0">
				<img
					src="./assets/bg-register.jpg"
					alt="Background"
					className="object-cover w-full h-full blur-md opacity-80"
				/>
			</div>
			<div className="relative z-10">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 drop-shadow-2xl">
					<div className="md:flex-wrap w-full rounded-lg shadow border md:mt-0 sm:max-w-2xl xl:p-0 bg-white border-white">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<div className="w-40 h-20 mx-auto">
								<img src="./assets/logo.png" alt="logo" />
							</div>
							<h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-gray-700 text-center">Register Here</h1>
							<Formik
								initialValues={initialValues}
								validationSchema={registerSchema}
								onSubmit={(values) => {
									handleRegister(
										values.username,
										values.email,
										values.password,
										values.phoneNumber,
										values.role
									);
								}}
							>
								<Form action="#" className="space-y-4 md:space-y-6">
									<div className='flex flex-row justify-between gap-[2.5em]'>
										<div className="w-1/2">
											<div className='flex gap-2'>
												<FaUser className='mt-[2px] icon-black' />
												<label htmlFor="name" className="block mb-2 text-sm font-medium  text-gray-900">Username</label>
											</div>
											<Field
												id="username"
												name="username"
												type="text"
												placeholder="your name"
												values={onChangeUserName}
												className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400 text-black focus:border-blue-500"
											/>
											<ErrorMessage name='username' component='div' className='text-red-600 text-sm' />
										</div>
										<div className="w-1/2">
											<div className='flex gap-2 '>
												<IoIosMail className='mt-[3px] icon-black' />
												<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email address</label>
											</div>
											<Field
												id="email"
												name="email"
												type="email"
												placeholder="example123@ex.com"
												values={onChangeEmail}
												className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  border-gray-600 placeholder-gray-400 text-black focus:ring-border-500 focus:border-blue-500"
											/>
											<ErrorMessage name='email' component='div' className='text-red-600 text-sm' />
										</div>
									</div>

									<div className='flex flex-row justify-between gap-[2.5em]'>
										<div className="w-1/2">
											<div className='flex gap-2'>
												<BsPhone className='mt-[2px] icon-black' />
												<label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Phone</label>
											</div>
											<Field
												id="phoneNumber"
												name="phoneNumber"
												type="number"
												placeholder="your phone number"
												values={onChangePhoneNumber}
												className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  border-gray-600 placeholder-gray-400 text-gray-900 focus:border-blue-500"
											/>
											<ErrorMessage name='phoneNumber' component='div' className='text-red-600 text-sm' />
										</div>
										<div className="w-1/2">
											<div className='flex gap-2 '>
												<GiPadlock className='mt-[3px] icon-black' />
												<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
											</div>
											<div className="flex justify-between items-center p-2.5 rounded-lg space-x-1 border border-gray-600 placeholder-gray-400 text-black focus:ring-border-500 focus:border-blue-500">
												<Field
													id="password"
													name="password"
													values={onChangePassword}
													type={visible ? 'password' : 'text'}
													placeholder="**********"
													className="block w-full  placeholder-gray-400 text-gray-900"
												/>
												<div className='cursor-pointer' onClick={() => setVisible(!visible)}>
													{visible ? <FaEyeSlash className='icon-black' /> : <IoEyeSharp className='icon-black' />}
												</div>
											</div>
											<ErrorMessage name='password' component='div' className='text-red-600 text-sm' />
										</div>
									</div>
									<div className='flex gap-10 justify-center'>
										<h4 className="items-center mt-[13px] font-bold text-gray-900">Role:</h4>
										<div className="flex justify-center gap-[3em] cursor-pointer">
											<div className="flex items-center  ">
												<Field
													id="bordered-1"
													type="radio"
													value="seller"
													name="role"
													className="w-4 h-4 cursor-pointer ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600" />
												<label htmlFor='bordered-1' className='w-full py-4 ms-2 text-sm font-medium text-gray-900'>Seller</label>
											</div>
											<div className="flex items-center ">
												<Field
													id="bordered-1"
													type="radio"
													value="consumer"
													name="role"
													className="w-4 h-4 cursor-pointer text-blue-600  ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600" />
												<label htmlFor='bordered-1' className='w-full py-4 ms-2 text-sm font-medium text-gray-900'>Consumer</label>
											</div>
										</div>
									</div>
									<div className="flex items-start">
										<div className="flex items-center h-5">
											<input
												id="terms"
												aria-describedby="terms"
												type="checkbox"
												className="w-4 h-4 border rounded focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
											/>
										</div>
										<div className="ml-3 text-sm">
											<label htmlFor="terms" className="text-black">I accept the <a className="font-medium text-primary-600 hover:underline text-blue-600 ">Terms and Conditions</a></label>
										</div>
									</div>
									<button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 bg-blue-600 hover:bg-blue-800 transition duration-300">Create an account</button>
									<p className="text-black">Already have an account? <a onClick={() => router.push('/login')} className="text-primary-600 hover:underline text-blue-600 cursor-pointer">Login here</a></p>
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