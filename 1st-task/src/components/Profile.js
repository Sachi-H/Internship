import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as CryptoJS from 'crypto-js';

const Container = styled.div`
  overflow: hidden;
`;

const Profile = () => {
  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  }, []);
  
  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  const currentUserIndex = localStorage.getItem('currentUser');

  if (currentUserIndex === null) {
    return <div>User not logged in.</div>;
  }

  const currentUser = storedUsers[currentUserIndex];
  const decryptedPassword = CryptoJS.AES.decrypt(currentUser.password, 'internship').toString(CryptoJS.enc.Utf8);

  return (
    <Container>
      <div className='offset-lg-3 col-lg-6'>
        <nav className="flex items-center justify-between flex-wrap bg-white p-4">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <img src='https://www.hacktiv.io/wp-content/uploads/2023/10/Logo2.png' alt='Brand Logo' className='w-48 h-15' />
          </div>
          <div className="flex items-center text-[#42bb71] text-l font-bold">         
            <Link to="/" className="hover:text-[#414042] ml-3 underline hover:no-underline" 
              style={{cursor: 'pointer'}}> Sign Out
            </Link>
          </div>
        </nav>

        <div className='bg-[#42bb71] min-h-[calc(100vh-90px)]'>
          <h1 className='flex items-center justify-center text-white font-bold text-3xl p-5'> User Profile </h1>

          <div className="bg-white overflow-hidden shadow rounded-lg border max-w-md mx-auto">
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0 text-white font-bold">
              <dl className='sm:divide-y sm:divide-gray-200'>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Profile Image
                  </dt>
                  <dd className="mt-1 text-sm text-[#414042] sm:mt-0 sm:col-span-2">
                    {currentUser.image ? (
                      <img
                        src={currentUser.image}
                        alt="Profile"
                        className="w-32 h-32 object-cover rounded-full"
                      />
                    ) : (
                      <div>No image uploaded</div>
                    )}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm text-[#414042] sm:mt-0 sm:col-span-2">
                    {currentUser.fullname}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-[#414042] sm:mt-0 sm:col-span-2">
                    {currentUser.email}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Mobile Number
                  </dt>
                  <dd className="mt-1 text-sm text-[#414042] sm:mt-0 sm:col-span-2">
                    {currentUser.number}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Birthday
                  </dt>
                  <dd className="mt-1 text-sm text-[#414042] sm:mt-0 sm:col-span-2">
                    {currentUser.birthday}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Gender
                  </dt>
                  <dd className="mt-1 text-sm text-[#414042] sm:mt-0 sm:col-span-2">
                    {currentUser.gender}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Address
                  </dt>
                  <dd className="mt-1 text-sm text-[#414042] sm:mt-0 sm:col-span-2">
                    {currentUser.address}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Password
                  </dt>
                  <dd className="mt-1 text-sm text-[#414042] sm:mt-0 sm:col-span-2">
                    {decryptedPassword}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Profile;
