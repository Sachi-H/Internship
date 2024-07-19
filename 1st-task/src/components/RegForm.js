import React from 'react'

const RegForm = () => {
  return (
    <div>
        <div className='offset-lg-3 col-lg-6'>
            <form className='container'>
                <div className='card'>
                    <div className='card-header'>
                        <nav style={{ display: 'flex', justifyContent: 'center' }}>
                            <h1> User Registration </h1>
                        </nav>
                    </div>
                    <div className='card-body'>
                        
                    </div>
                    <div className='flex justify-center'>
                        <button type='submit' className='
                          px-6 py-3 font-medium text-white  
                          bg-green-700 hover:bg-green-800
                          rounded-lg text-center'
                        > Register </button>
                    </div>
                </div>
            </form>    
        </div>
    </div>
  )
}

export default RegForm