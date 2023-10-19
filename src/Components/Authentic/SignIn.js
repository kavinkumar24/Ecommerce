import React from 'react';
import { Button, Form, FormGroup, Label, Input, Card } from 'reactstrap';
import './SignIn.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Logo from '../images/logo.png'

import Modal from 'react-modal';

import { Button1,Form1,customStyles,GlobalStyle,Hr,Input1 } from './Styled';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import { FaGoogle,FaMobile } from 'react-icons/fa';




const SignIn = () => {


  const [modalIsOpen, setModalIsOpen] = useState(true);
  const openModal = () => {
    setModalIsOpen(true);
  };
  
  const [isRegister, setIsRegister] = useState(false);
const closeModal = () => {
  setModalIsOpen(false);
  setIsRegister(false);

};
 
  return (

    <>
    <GlobalStyle />
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Auth Modal"
    >
      {isRegister ? (
        <>
          <h2><img src={Logo} alt='logo' style={{ width: '190px' }}/></h2>
          <Form>
            <label htmlFor="name">Name:</label>
            <Input1 type="text" name="name" placeholder="Name" required />
            <label htmlFor="email">Email:</label>
            <Input1 type="email" name="email" placeholder="Email" required />
            <label htmlFor="password">Password:</label>
            <Input1 type="password" name="password" placeholder="Password" required />
            <Button1 type="submit" style={{backgroundColor:'#089b7d',color:'white'}}>Register</Button1>
          </Form>
          <p>By signing up, you agree to our <span id = "span_txt">terms</span> & <span id ="span_txt">policy</span></p>
          <p>Or</p>
          <p>Already have an account? <Button id="redirect" onClick={() => setIsRegister(false)}>Login</Button></p>
        </>
      ) : (
        <>
          <h2><img src={Logo} alt='logo' style={{ width: '190px' }}/></h2>
          <Form>
            <label htmlFor="email">Email:</label>
            <Input1 type="email" name="email" placeholder="Email" required />
            <label htmlFor="password">Password:</label>
            <Input1 type="password" name="password" placeholder="Password" required />
            <Button1 type="submit" style={{ backgroundColor: "#089b7d",color:'white'}}>Login</Button1>
              </Form>
              <Hr />
              <Button1 style={{ backgroundColor: "#4285f4",color:'white'}}><FaGoogle />Login with Google</Button1>
              <Button1 style={{ backgroundColor: "#616161",color:'white' }}><FaMobile />Login with Mobile number</Button1>
          <p>Don't have an account? <Button id="redirect" onClick={() => setIsRegister(true)}>Register</Button></p>
        </>
      )}
    </Modal>
    </>
  );
};

export default SignIn;
