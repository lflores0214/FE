import React, {useState, useEffect} from 'react';
import { NavLink } from "react-router-dom"
import {withFormik, Form, Field} from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import {colors} from '../../colors';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { doSignup } from '../../action/index';
import Sideimg from '../../assets/Vegfruit.png';

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const SideDiv = styled.div`
  width: 55vw;
  background-image: url(${Sideimg});
  background-size: cover;
  height: auto;
  @media (max-width: 500px) {
  display: none;
}
`;

const SignupFormStyle = styled.div`
  form {
    width: 460px;
    margin: auto 100px;
    padding: 32px;
    text-align: center;
    font-weight: bold;
  }
  h1:before {
    content: "Vegan";
    font-style: normal;
    color: ${colors.fern};
    padding-left: 20px;
  }
  h1:after {
    content: "Meets";
    font-style: normal;
    color: ${colors.mainText};
  }
  h3 {
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 27px;
    color: ${colors.mainText};
  }
  h4 {
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: ${colors.mainText}; 
  }
  input {
    margin-top: 32px;
    padding: 0.5rem;
    font-size: 16px;
    width: 100%;
    display: block;
    background: ${colors.white};
    border: 1px solid #CCCCCC;
    box-sizing: border-box;
    border-radius: 10px;
  }
  button {
    width: 250px;
    margin: 32px 0;
    padding: 12px 20px;
    background: ${colors.fern};
    border-radius: 10px;
    color: ${colors.white};
  }
`

const SignupForm = ({errors, touched, status}) => {
    const [newUser, setNewUser] = useState([]);
    
    useEffect(() => {
      if (status) {
        setNewUser([...newUser, status]);
      }
    }, [status]);

  
    return(
      <Container>
      <SignupFormStyle>
        <h1></h1>
        <div className="signup-form">
        <Form>
          <h3>Sign up with your email address</h3>
  
          <Field 
          type="text"
          name="username"
          placeholder="Username"
          />
        {touched.username && errors.username && (<p className="error">{errors.username}</p>)}
  
        <Field 
        type="password"
        name="password"
        placeholder="Password"
        />
       {touched.password && errors.password && (<p className="error">{errors.password}</p>)} 

       <Field 
        type="text"
        name="useremail"
        placeholder="User Email"
        />
       {touched.useremail && errors.useremail && (<p className="error">{errors.useremail}</p>)} 

       <Field 
        type="text"
        name="primaryemail"
        placeholder="Primary Email"
        />
       {touched.primaryemail && errors.primaryemail && (<p className="error">{errors.primaryemail}</p>)} 
  
      <NavLink to={`/login`}>
      <button type="submit">Sign Up</button>
      </NavLink>
      <h4>Already have an account? <NavLink to={`/login`}>Log in.</NavLink></h4>
  
        </Form>
      </div>
      </SignupFormStyle>
      <SideDiv></SideDiv>
      </Container>
    )
  };
  
  const FormikSignupForm = withFormik({
    mapPropsToValues({username, password, useremail, primaryemail}) {
      return {
        username: username || '',
        password: password || '',
        useremail: useremail || '',
        primaryemail: primaryemail || ''
      };
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required('Please enter email'),
      password: Yup.string().required('Please enter password'),
      usermail: Yup.string().required('Please input user email'),
      primaryemail: Yup.string().required('Please input primary email')

    }),
    handleSubmit({username, password, useremail, primaryemail}, {setStatus, doSignup}){
     setStatus({username, password, useremail, primaryemail})
     doSignup({username, password, useremail, primaryemail})
    } 
  })(SignupForm);

  export const SignupFormik = connect((state) => {
    return {...state.signup};
  }, {doSignup})(FormikSignupForm);