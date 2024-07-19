import React from 'react'

const RegForm = () => {
  return (
    <div>
        <div className='offset-lg-3 col-lg-6'>
            <nav>

            </nav>
            <form className='container'>
              <h1 style={{ display: 'flex', justifyContent: 'center' }}> User Registration </h1>
            </form> 
            <div className='flex justify-center'>
              <button type='submit' className='
                px-6 py-3 font-medium text-white  
                bg-green-700 hover:bg-green-800
                rounded-lg text-center'
              > Register </button>
            </div>   
        </div>
    </div>
  )
}

export default RegForm