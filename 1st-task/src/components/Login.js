import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required')
});

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, actions) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  
    let foundUser = null;
    storedUsers.forEach((user) => {
      if (user.email === values.email && user.password === values.password) {
        foundUser = user;
      }
    });
  
    if (foundUser) {
      alert('Login successful!');
      navigate('/profile', { replace: true });
    } else {
      alert('Invalid email or password.');
    }
  
    actions.setSubmitting(false);
  };

  return (
    <div className="bg-white dark:bg-gray-900">
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
              <p className="mt-3 text-gray-500 dark:text-gray-300">Sign in to access your account</p>
            </div>

            <div className="mt-8">
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form>
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Email Address
                      </label>
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        placeholder="example@example.com"
                        className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border ${errors.email && touched.email ? 'border-red-500' : 'border-gray-200'} rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                      />
                      {errors.email && touched.email && (
                        <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                      )}
                    </div>

                    <div className="mt-6">
                      <div className="flex justify-between mb-2">
                        <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">
                          Password
                        </label>
                      </div>
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Your Password"
                        className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border ${errors.password && touched.password ? 'border-red-500' : 'border-gray-200'} rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                      />
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
                Don't have an account yet? <Link to="/register" className="text-blue-500 focus:outline-none focus:underline hover:underline">Sign up</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
