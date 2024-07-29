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
  max-width: 900px;
  margin: 0 auto;
  padding: 30px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const DatePickerWrapper = styled(DatePicker)`
  @apply block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-[8rem] rounded leading-tight;
  &:focus {
    @apply outline-none bg-white border-gray-500;
  }
`;

const Register = () => {
  const [image, setImage] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

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
    } else {
      setImage(null);
    }
  };

  const handleCancel = () => {
    setImage(null);
    setFileInputKey(fileInputKey + 1);
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

      <div className='bg-[#42bb71] min-h-[calc(100vh-90px)] pb-10'>
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

            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
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
              <div className="w-full md:w-1/3 px-3">
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
              <div className="w-full md:w-1/3 px-3">
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
            </div>

            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
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
                  yearDropdownItemNumber={130}
                  scrollableYearDropdown
                  minDate={new Date('1900-01-01')}
                  maxDate={new Date('2024-12-31')}
                  dateFormat="MM/dd/yyyy"
                  id="birthday"
                  placeholderText="MM/DD/YYYY"
                  className={`block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-[8rem] rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${errors.birthday && touched.birthday ? "border-red-500" : ""}`}
                />

                {errors.birthday && touched.birthday && (
                  <div className="text-red-500 text-s">{errors.birthday}</div>
                )}
              </div>

              <div className="w-full md:w-1/3 px-3">
                <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="gender"> GENDER </label>
                <div className="relative">
                  <select
                    value={values.gender} onChange={handleChange} onBlur={handleBlur}
                    id="gender"
                    className={`block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${errors.gender && touched.gender ? "border-red-500" : ""}`}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                  </div>
                </div>
                {errors.gender && touched.gender && (
                  <div className="text-red-500 text-s">{errors.gender}</div>
                )}
              </div>

              <div className="w-full md:w-1/3 px-3 relative">
                <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password"> PASSWORD </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={values.password} onChange={handleChange} 
                  onBlur={(e) => {
                    if (e.relatedTarget && e.relatedTarget.id === 'show-password-button') {
                      return;
                    }
                    handleBlur(e);
                  }}
                  id="password" placeholder="Create your password"
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${errors.password && touched.password ? "border-red-500" : ""}`}
                />
                <button
                  type="button"
                  id="show-password-button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.002 2.002l1.514 1.514a4 4 0 00-5.027-4.996z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                {errors.password && touched.password && (
                  <div className="text-red-500 text-s">{errors.password}</div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-4">
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

            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">PROFILE PICTURE</label>
                <input
                  key={fileInputKey}
                  onChange={handleImageChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="file"
                />
                {image && (
                  <div className="mt-4 flex items-center">
                    <img src={image} alt="Profile" className="w-40 h-40 rounded-full object-cover" />
                    <button
                      type="button" onClick={handleCancel}
                      className="mb-24 bg-red-500 text-white rounded-full p-1"
                    >
                      <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M10 8.586l2.828-2.829a1 1 0 111.415 1.415L11.414 10l2.829 2.828a1 1 0 01-1.415 1.415L10 11.414l-2.828 2.829a1 1 0 11-1.415-1.415L8.586 10 5.757 7.172a1 1 0 111.415-1.415L10 8.586z"/>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full px-3 mb-6 md:mb-0">
                <button 
                  disabled={isSubmitting} type="submit"
                  className={`w-full mt-2 px-6 py-3 font-medium ${isSubmitting ? 'bg-gray-500' : 'bg-[#42bb71]'} 
                  ${isSubmitting ? '' : 'hover:bg-white hover:shadow-[inset_0_0_0_2px_#42bb71] hover:text-[#42bb71]'} 
                  text-white rounded-lg text-center`}
                > {isSubmitting ? 'Processing your registration...' : 'REGISTER'} 
                </button>
              </div>
            </div>
          </div>
        </FormContainer>
      </div>
    </div>
  );
};

export default Register;
