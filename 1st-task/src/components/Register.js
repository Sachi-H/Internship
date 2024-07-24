import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { clearMessage } from "../slices/message";
import axios from 'axios';

const Container = styled.div`
  overflow: hidden;
`;

const FormContainer = styled.form`
  max-width: 550px;
  margin: 0 auto;
  padding: 30px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Register = () => {
  const [successful, setSuccessful] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);
  
  const initialValues = {
    name: '',
    number: '',
    email: '',
    gender: '',
    address: '',
    birthday: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field is required."),
    number: Yup.string()
      .test("len", "Must be 11 digits.", (val) => val && val.length === 11)
      .test("number", "Must be a number.", (val) => val && !isNaN(val))
      .required("This field is required."),
    email: Yup.string()
      .email("Invalid email address.")
      .required("This field is required."),
    address: Yup.string().required("This field is required."),
    birthday: Yup.string()
      .test("date", "Invalid birthday format. Please use mm/dd/yyyy.", (val) =>
        val && /^(0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(19|20)\d{2}$/.test(val)
      )
      .test("age", "You must be at least 18 years old to register.", (val) => {
        const birthdayParts = val.split("/");
        const birthdayYear = parseInt(birthdayParts[2], 10);
        const birthdayMonth = parseInt(birthdayParts[0], 10);
        const birthdayDay = parseInt(birthdayParts[1], 10);
        const today = new Date();
        let age = today.getFullYear() - birthdayYear;
        if (birthdayMonth > today.getMonth() || (birthdayMonth === today.getMonth() && birthdayDay > today.getDate())) {
          age--;
        }
        return age >= 18;
      })
      .required("This field is required."),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters.")
      .required("You must create your password."),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post('/register', values);
      setSuccessful(true);
      console.log('Successful registration:', successful);
      alert('Registration successful, redirecting to root page...');
      navigate('');
    } catch (error) { // <--- Add this catch block
      console.error(error);
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <div className='offset-lg-3 col-lg-6'>
        <nav className="flex items-center justify-between flex-wrap bg-white p-4">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <img src='https://www.hacktiv.io/wp-content/uploads/2023/10/Logo2.png' alt='Brand Logo' className='w-48 h-15' />
          </div>
          <div className="flex items-center text-[#42bb71] text-l font-bold">
            <span>Already have an account?</span>          
            <Link to="/" className="hover:text-[#414042] ml-3 underline hover:no-underline" 
              style={{cursor: 'pointer'}}> Sign In
            </Link>
          </div>
        </nav>

        <div className='bg-[#42bb71] min-h-[calc(100vh-90px)]'>
          <h1 className='flex items-center justify-center text-white font-bold text-3xl p-5'> User Registration </h1>
          <FormContainer>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              
            {(formikProps) => (
              <Form>
                {!successful && (
                  <div>
                  <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-name"> NAME </label>
                      <Field
                        type="text" id="grid-name" name="name" placeholder="Enter your name"
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      />
                      <ErrorMessage name="name" component="div" className="text-red-500" />
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                      <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-number"> MOBILE NUMBER </label>
                      <Field
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-number" type="tel" name='number' placeholder="Enter your mobile number"
                      />
                      <ErrorMessage name="number" component="div" className="text-red-500" />
                    </div>
                  </div>

                  <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email"> EMAIL </label>
                      <Field
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                        id="grid-email" type="email" name='email' placeholder="Enter your email"
                      />
                      <ErrorMessage name="email" component="div" className="text-red-500" />
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                      <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-gender"> GENDER </label>
                      <div class="relative">
                        <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                          id="grid-gender" name='gender' style={{cursor: 'pointer'}}>
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                      <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-address"> ADDRESS </label>
                      <Field 
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                        id="grid-address" type="text" name="address" placeholder="Enter your address"
                      />
                      <ErrorMessage name="address" component="div" className="text-red-500" />
                    </div>
                  </div>

                  <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-birthday"> BIRTHDAY </label>
                      <Field 
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                        id="grid-birthday" type="text" name="birthday" placeholder="MM/DD/YYYY"
                      />
                      <ErrorMessage name="birthday" component="div" className="text-red-500" />
                    </div>
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password"> PASSWORD </label>
                      <Field
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-password" type="password" name="password" placeholder="Enter your password"
                      />
                      <ErrorMessage name="password" component="div" className="text-red-500" />
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className='flex justify-center'>
                      <button type="submit" className='
                        mt-3 px-6 py-3 font-medium 
                        bg-[#42bb71] hover:bg-white 
                        hover:shadow-[inset_0_0_0_2px_#42bb71]
                        text-white hover:text-[#42bb71]
                        rounded-lg text-center'
                      > Register </button>
                    </div> 
                  </form>
                </div>
                )}
              </Form>
            )}
            </Formik>
          </FormContainer> 
        </div>
      </div>
    </Container>
  )
}

export default Register