import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { validationSchema } from '../schema/schema';
import { format, isValid } from 'date-fns';
import * as CryptoJS from 'crypto-js';

const FormContainer = styled.form`
  max-width: 550px;
  margin: 0 auto;
  padding: 30px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const DatePickerWrapper = styled(DatePicker)`
  @apply block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight;
  &:focus {
    @apply outline-none bg-white border-gray-500;
  }
`;

const Register = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  }, []);
  
  const navigate = useNavigate();
  
  const onSubmit = async (values, actions) => {  
    const formattedBirthday = values.birthday
      ? format(new Date(values.birthday), 'MM/dd/yyyy')
      : '';
  
    const formattedValues = {
      ...values,
      birthday: formattedBirthday,
      image: image ? image : null, 
    };

    const encryptedPassword = CryptoJS.AES.encrypt(
      formattedValues.password,
      'internship' 
    ).toString();
  
    formattedValues.password = encryptedPassword;

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const errors = {};

    existingUsers.forEach(user => {
      if (user.fullname === formattedValues.fullname) {
        errors.fullname = 'This fullname is already used!';
      }
      if (user.email === formattedValues.email) {
        errors.email = 'This email is already used!';
      }
      if (user.number === formattedValues.number) {
        errors.number = 'This mobile number is already used!';
      }
    });

    if (Object.keys(errors).length > 0) {
      actions.setErrors(errors);
    } else {
      existingUsers.push(formattedValues);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      localStorage.setItem('currentUser', existingUsers.length - 1); 
      await new Promise(resolve => setTimeout(resolve, 2500));
      actions.resetForm();
      alert('You are now registered! Kindly login your account.');
      navigate("/");
    }
  };

  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      fullname: '',
      number: '',
      email: '',
      gender: '',
      address: '',
      birthday: null,
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit,
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='offset-lg-3 col-lg-6'>
      <nav className="flex items-center justify-between flex-wrap bg-white p-4">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <img src='https://www.hacktiv.io/wp-content/uploads/2023/10/Logo2.png' alt='Brand Logo' className='w-48 h-15' />
        </div>
        <div className="flex items-center text-[#42bb71] text-l font-bold">
          <span>Already have an account?</span>
          <Link to="/" className="hover:text-[#414042] ml-3 underline hover:no-underline" style={{ cursor: 'pointer' }}> Sign In</Link>
        </div>
      </nav>

      <div className='bg-[#42bb71] min-h-[calc(100vh-90px)]'>
        <h1 className='flex items-center justify-center text-white font-bold text-3xl p-5'> User Registration </h1>
        <FormContainer onSubmit={handleSubmit}>
          <div>
            <style>
              {`
                .react-datepicker__year-dropdown {
                  max-height: 300px;
                  overflow-y: auto;
                }
                .react-datepicker__month-dropdown {
                  max-height: 250px;
                  overflow-y: auto;
                }
              `}
            </style>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="fullname"> FULL NAME </label>
                <input
                  value={values.fullname} onChange={handleChange} onBlur={handleBlur}
                  type="text" id="fullname" placeholder="Enter your name"
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${errors.fullname && touched.fullname ? "border-red-500" : ""}`}
                />
                {errors.fullname && touched.fullname && (
                  <div className="text-red-500 text-s">{errors.fullname}</div>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="number"> MOBILE NUMBER </label>
                <input
                  value={values.number} onChange={handleChange} onBlur={handleBlur}
                  id="number" type="tel" placeholder="Enter your mobile number"
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${errors.number && touched.number ? "border-red-500" : ""}`}
                />
                {errors.number && touched.number && (
                  <div className="text-red-500 text-s">{errors.number}</div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email"> EMAIL </label>
                <input
                  value={values.email} onChange={handleChange} onBlur={handleBlur}
                  id="email" type="email" placeholder="Enter your email"
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${errors.email && touched.email ? "border-red-500" : ""}`}
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-s">{errors.email}</div>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password"> PASSWORD </label>
                <input
                  value={values.password} onChange={handleChange} onBlur={handleBlur}
                  id="password" type="password" placeholder="Create your password"
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${errors.password && touched.password ? "border-red-500" : ""}`}
                />
                {errors.password && touched.password && (
                  <div className="text-red-500 text-s">{errors.password}</div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="address"> ADDRESS </label>
                <input
                  value={values.address} onChange={handleChange} onBlur={handleBlur}
                  id="address" type="text" placeholder="Enter your address"
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${errors.address && touched.address ? "border-red-500" : ""}`}
                />
                {errors.address && touched.address && (
                  <div className="text-red-500 text-s">{errors.address}</div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="birthday"> BIRTHDAY </label>
                <DatePickerWrapper
                  selected={values.birthday ? new Date(values.birthday) : null}
                  onChange={(date) => {
                    if (date && isValid(date)) {
                      setFieldValue('birthday', format(date, 'MM/dd/yyyy'));
                    } else {
                      setFieldValue('birthday', '');
                    }
                  }}
                  onBlur={handleBlur}
                  showMonthDropdown
                  showYearDropdown
                  minDate={new Date('1900-01-01')}
                  maxDate={new Date('2014-12-31')}
                  dateFormat="MM/dd/yyyy"
                  id="birthday"
                  placeholderText="MM/DD/YYYY"
                  className={`block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${errors.birthday && touched.birthday ? "border-red-500" : ""}`}
                />
                {errors.birthday && touched.birthday && (
                  <div className="text-red-500 text-s">{errors.birthday}</div>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="gender"> GENDER </label>
                <div className="relative">
                  <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    value={values.gender} onChange={handleChange} onBlur={handleBlur}
                    id="gender" style={{ cursor: 'pointer' }}>
                    <option value="" disabled>Select your gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                {errors.gender && touched.gender && (
                  <div className="text-red-500 text-s">{errors.gender}</div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="image"> PROFILE IMAGE </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
                {image && (
                  <div className="mt-2">
                    <img
                      src={image}
                      alt="Preview"
                      className="w-32 h-32 object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className='flex justify-center'>
              <button 
                disabled={isSubmitting}
                type="submit"
                className={`mt-3 px-6 py-3 font-medium ${isSubmitting ? 'bg-gray-500' : 'bg-[#42bb71]'} 
                ${isSubmitting ? '' : 'hover:bg-white hover:shadow-[inset_0_0_0_2px_#42bb71] hover:text-[#42bb71]'} 
                text-white rounded-lg text-center`}
              > {isSubmitting ? 'Submitting...' : 'Register'} </button>
            </div>
          </div>
        </FormContainer>
      </div>
    </div>
  );
};

export default Register;
