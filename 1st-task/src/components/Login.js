import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import * as CryptoJS from 'crypto-js';

const validationSchema = Yup.object({
  loginCredential: Yup.string()
    .test('email-or-phone', 'Invalid email or phone number', (value) => {
      const userEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const userNumber = /^\d{11}$/; 
      return userEmail.test(value) || userNumber.test(value);
    })
    .required('Required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required')
});

const Login = () => {
  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  }, []);
  
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values, actions) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    let foundUser = null;
    storedUsers.forEach((user, index) => {
      if ((user.email === values.loginCredential || user.number === values.loginCredential)) {
        try {
          const decryptedPassword = CryptoJS.AES.decrypt(user.password, 'internship').toString(CryptoJS.enc.Utf8);
          console.log('Decrypted Password:', decryptedPassword); // Debugging: Check decrypted password
          if (decryptedPassword === values.password) {
            foundUser = user;
            localStorage.setItem('currentUser', index);
          }
        } catch (error) {
          console.error('Decryption error:', error); // Debugging: Log any decryption errors
        }
      }
    });

    if (foundUser) {
      await new Promise((resolve) => setTimeout(resolve, 2500));
      navigate('/profile', { replace: true });
    } else {
      alert('Invalid login credential or password.');
    }

    actions.setSubmitting(false);
  };

  return (
    <div className="bg-white">
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/031/351/947/non_2x/3d-rendering-technology-robotics-data-analytics-or-futuristic-cyborg-with-artificial-intelligence-concept-by-ai-generated-free-photo.jpg)',
          }}
        >
          <div className="flex items-start justify-start h-full px-20 bg-gray-900 bg-opacity-40">
            <div className="flex items-start justify-start">
              <div>
                <div className="flex flex-col">
                  <img src='https://www.hacktiv.io/wp-content/uploads/2023/10/Logo2.png' alt='Brand Logo' className='w-64 h-auto mt-7' />
                  <h1 className="max-w-xl mt-5 text-4xl font-bold leading-tight text-left text-green-500 text-shadow-lg">
                    Empowering the Future of AI Technologies
                  </h1>
                  <div className="flex mt-60 justify-center space-x-12">
                    <div className="flex-1 text-center max-w-md">
                      <p className="text-gray-300 text-2xl font-semibold leading-relaxed text-left">
                        Mission
                      </p>
                      <p className="mt-4 text-lg leading-relaxed text-gray-400 text-left">
                        Hacktiv exists to democratize deep technologies, making them accessible to all organizations. By doing so, we drive transformative impact and enable businesses throughout the Philippines to harness the power of cutting-edge solutions.
                      </p>
                    </div>
                    <div className="flex-1 text-center max-w-md">
                      <p className="text-gray-300 text-2xl font-semibold leading-relaxed text-left">
                        Purpose
                      </p>
                      <p className="mt-4 text-lg leading-relaxed text-gray-400 text-left">
                        Hacktiv exists to democratize AI, making it accessible to all organizations. By doing so, we drive transformative impact and enable businesses throughout the Philippines to harness the power of cutting-edge AI solutions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <img src='https://www.hacktiv.io/wp-content/uploads/2023/10/Logo2.png' alt='Brand Logo' className='w-48 h-auto' />
              <p className="mt-3 text-gray-500">Sign in to access your account</p>
            </div>

            <div className="mt-8">
              <Formik
                initialValues={{ loginCredential: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form>
                    <div>
                      <label htmlFor="loginCredential" className="block mb-2 text-sm text-gray-600">
                        Email Address or Mobile Number
                      </label>
                      <Field
                        type="text"
                        name="loginCredential"
                        id="loginCredential"
                        placeholder="example@example.com or 09123456789"
                        className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border ${errors.loginCredential && touched.loginCredential ? 'border-red-500' : 'border-gray-200'} rounded-md focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                      />
                      {errors.loginCredential && touched.loginCredential && (
                        <div className="text-red-500 text-sm mt-1">{errors.loginCredential}</div>
                      )}
                    </div>

                    <div className="mt-6">
                      <div className="flex justify-between mb-2">
                        <label htmlFor="password" className="text-sm text-gray-600">
                          Password
                        </label>
                      </div>
                      <div className="relative">
                        <Field
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          id="password"
                          placeholder="Your Password"
                          className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border ${errors.password && touched.password ? 'border-red-500' : 'border-gray-200'} rounded-md focus:border-green-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
                        >
                          {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.002 2.002l1.514 1.514a4 4 0 00-5.027-4.996z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      </div>
                      {errors.password && touched.password && (
                        <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                      )}
                    </div>

                    <div className="mt-6 justify-center">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full mt-3 px-6 py-3 tracking-wide font-medium 
                          ${isSubmitting ? 'bg-gray-500' : 'bg-[#42bb71] hover:bg-white'} 
                          ${isSubmitting ? '' : 'hover:shadow-[inset_0_0_0_2px_#42bb71] hover:text-[#42bb71]'} 
                          text-white rounded-lg text-center`}
                      >
                        {isSubmitting ? 'Signing in...' : 'Sign in'}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>

              <p className="mt-6 text-sm text-center text-gray-400">
                Don't have an account yet? <Link to="/register" className="text-green-500 focus:outline-none focus:underline hover:underline">Sign up</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
