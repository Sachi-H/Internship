import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  overflow: hidden;
`;

const Profile = () => {
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
          <h1 className='flex items-center justify-center text-white font-bold text-3xl p-5'> User Information </h1>
        </div>
      </div>
    </Container>
  )
}

export default Profile