import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { saveFormData } from '../store/actions';

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

const RegForm = ({ saveFormData }) => {
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
              style={{cursor: 'pointer'}}> Sign Up
            </Link>
          </div>
        </nav>

        <div className='bg-[#42bb71] min-h-[calc(100vh-90px)]'>
          <h1 className='flex items-center justify-center text-white font-bold text-3xl p-5'> User Registration </h1>
          <FormContainer>
            <Formik
              initialValues={{
                name: '',
                number: '',
                email: '',
                gender: '',
                address: '',
                birthday: '',
                password: '',
              }}

              onSubmit={(values, { setSubmitting }) => {
                saveFormData(values); // Dispatch action to save form data to Redux store
                setSubmitting(false);
              }}

              validate={(values) => {
                const errors = {};
                if (!values.name) {
                  errors.name = 'This field is required.';
                }
                if (!values.number) {
                  errors.number = 'This field is required.';
                } else if (isNaN(values.number)) {
                  errors.number = 'Must be a number.';
                } else if (values.number.length !== 11) {
                  errors.number = 'Must be 11 digits.';
                } else {
                  // no errors
                }
                if (!values.email) {
                  errors.email = 'This field is required.';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                  errors.email = 'Invalid email address.';
                }
                if (!values.address) {
                  errors.address = 'This field is required.';
                }
                if (!values.birthday) {
                  errors.birthday = 'This field is required.';
                } else if (!/^(0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(19|20)\d{2}$/.test(values.birthday)) {
                  errors.birthday = 'Invalid birthday format. Please use mm/dd/yyyy.';
                } else {
                  const birthdayParts = values.birthday.split('/');
                  const birthdayYear = parseInt(birthdayParts[2], 10);
                  const birthdayMonth = parseInt(birthdayParts[0], 10);
                  const birthdayDay = parseInt(birthdayParts[1], 10);
                  const today = new Date();
                  let age = today.getFullYear() - birthdayYear;
                  if (birthdayMonth > today.getMonth() || (birthdayMonth === today.getMonth() && birthdayDay > today.getDate())) {
                    age--;
                  }
                  if (age < 18) {
                    errors.birthday = 'You must be at least 18 years old to register.';
                  }
                }
                if (!values.password) {
                  errors.password = 'You must create your password.';
                }
                if (Object.keys(errors).length === 0) {
                  if (!values.name || !values.number || !values.email || !values.address || !values.birthday || !values.password) {
                    errors.allFields = 'All fields must be filled up!';
                  }
                }
                return errors;
              }}
              validateOnChange={true}
            >
            {(formikProps) => (
              <Form>
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

                <div className='flex justify-center'>
                  <button type="submit" className='
                    mt-3 px-6 py-3 font-medium 
                    bg-[#42bb71] hover:bg-white 
                    hover:shadow-[inset_0_0_0_2px_#42bb71]
                    text-white hover:text-[#42bb71]
                    rounded-lg text-center'
                  > Register </button>
                </div> 
              </Form>
            )}
            </Formik>
          </FormContainer> 
        </div>
      </div>
    </Container>
  )
}

export default connect(null, { saveFormData })(RegForm);