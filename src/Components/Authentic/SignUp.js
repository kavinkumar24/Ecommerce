import React from 'react';
import { Button, Form, FormGroup, Label, Input, Card } from 'reactstrap';
import './SignUp.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const SignUp = () => {


  return (
    <div className="signup-container">
      <div className="home-icon">
        <Link to="/"><FontAwesomeIcon icon={faHome} /></Link>
      </div>
      <Card className="signup-card">
        <h1 className="welcome-text">Welcome</h1>
        <p className="signup-text">Please sign up to continue</p>
        <Form>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" placeholder="Email" required/>
          </FormGroup>
          <FormGroup>
            <Label for="phone">Mobile No</Label>
            <Input type="number" name="phone" id="phone" placeholder="phone" required/>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" placeholder="Password" required/>
          </FormGroup>
          <Button id="signup_btn">Sign Up</Button>
          <div className="signin-redirect">
            Already have an account? <Link to="/SignIn"><a href="#Sign_in">Sign In</a></Link>
          </div>
        </Form>
      </Card>
     
    </div>
  );
};

export default SignUp;
