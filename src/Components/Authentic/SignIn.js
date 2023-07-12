import React from 'react';
import { Button, Form, FormGroup, Label, Input, Card } from 'reactstrap';
import './SignIn.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const SignIn = () => {
 
  return (
    <div className="signin-container">
      <div className="home-icon">
        <Link to="/"><FontAwesomeIcon icon={faHome} /></Link>
      </div>
      <Card className="signin-card">
        <h1 className="welcome-text">Welcome</h1>
        <p className="login-text">Please login to continue</p>
        
        <Form>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" placeholder="Email" />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" placeholder="Password" />
          </FormGroup>
          <Button id="login_btn">Login</Button>
          <div className="forgot-password">
            <a href="#f">Forgot Password?</a>
          </div>
          <div className="signup-redirect">
            Don't have an account? <Link to="/SignUp"><a href="#Sign_up">Sign Up</a></Link>
          </div>
        </Form>
      </Card>
      

    </div>
  );
};

export default SignIn;
