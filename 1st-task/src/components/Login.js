import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
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
                  <img src='https://www.hacktiv.io/wp-content/uploads/2023/10/Logo2.png' alt='Brand Logo' className='w-64 h-auto' />
                  <h1 className="max-w-xl mt-3 text-4xl font-bold leading-tight text-left text-green-500 text-shadow-lg">
                    Empowering the Future of AI Technologies
                  </h1>
                  <div className="flex mt-60 justify-center space-x-12">
                    <div className="flex-1 text-center max-w-md">
                      <p className="text-gray-300 text-2xl font-semibold leading-relaxed text-left">
                        Mission
                      </p>
                      <p className="mt-4 text-lg leading-relaxed text-gray-400 text-left">
                      Hacktiv exists to democratize deep technologies, making them accessible to all organizations. By doing so, we drive transformative impact and enable businesses throughout the Philippines to harness the power of cutting-edge solutions.                      </p>
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
              <form>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@example.com"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">
                      Password
                    </label>
                  </div>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your Password"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  >
                    Sign in
                  </button>
                </div>
              </form>

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
