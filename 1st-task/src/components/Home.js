import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
        <div className='offset-lg-3 col-lg-6'>
            <nav className="flex items-center justify-between flex-wrap bg-[#42bb71] p-6">
              <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-bold text-2xl tracking-tight">Internship - First Task</span>
              </div>
              <div className="flex items-center text-white text-l font-semibold">     
                <Link to="/" className="hover:text-[#414042] ml-3 underline hover:no-underline" 
                  style={{cursor: 'pointer'}}> Logout
                </Link>
              </div>
            </nav>
        </div>
    </div>
  )
}

export default Home