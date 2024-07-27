import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("This field is required."),
    number: Yup.string()
      .test("len", "Must be 11 digits.", (val) => val && val.length === 11)
      .test("number", "Must be a number.", (val) => val && !isNaN(val))      
      .test("mobile", "Invalid mobile number.", (val) => val && val.startsWith("09"))
      .required("This field is required."),
    email: Yup.string()
      .email("Invalid email address.")
      .required("This field is required."),
    gender: Yup.string()
      .test("gender", "This field is required.", (val) => val!== "")
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
      .min(8, "Password must be at least 8 characters.")
      .required("You must create your password."),
  });