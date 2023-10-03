import React, { useState } from 'react';
import './Contact.css'
import NavigationBar from './Navbar';
import { Card, Form, Col, Row, Button } from 'react-bootstrap'
import { FaTwitter,FaFacebook,FaWhatsapp } from 'react-icons/fa';
import profile from '../images/contact_img.png'
function ContactPage({ cartItems, setCartItems}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
     <NavigationBar cartItems={cartItems} showSlideshow={true} showHeader = {true} showDropdown={true} onSearch={setSearchTerm} showImageContainer={false} />
    <div className="contact-page">
      <div className="profile-info">
        <img src={profile} alt="Profile" width='260px' height='260px'/>
        <h2>Address:</h2>
        <h5>123 Maple Ave, City, State, ZIP</h5><br></br>
        <h2>Phone:</h2>
        <h5>(123) 456-7890</h5><br></br>
        <h2>Website:</h2>
        <h5>www.example.com  - <a href="#link" id="link">Visit</a></h5><br></br>
        <h2>Follow us:</h2>
        <h5>
  <a href="#facebook" className='social_media'><FaFacebook /></a>
  <a href="#twitter"className='social_media'><FaTwitter /></a>
  <a href="#whatsapp" className='social_media'><FaWhatsapp /></a>
</h5>
      </div>
      <div className="contact-form">
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
        <Card className="mb-3" style={{ width: '800px',border:'none'}} id="card1">
  <Card.Body>
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row}>
        <Col sm="6">
          <Form.Label className="label">Name:</Form.Label>
          <Form.Control id="input" type="text" placeholder="Name" />
        </Col>
        <Col sm="6">
          <Form.Label className="label">Email:</Form.Label>
          <Form.Control id="input" type="email" placeholder="Email" />
        </Col>
      </Form.Group>
      <br />

      <Form.Group as={Row}>
        <Col sm="12">
          <Form.Label className="label">Subject:</Form.Label>
          <Form.Control id="input" type="text" placeholder="Subject" />
        </Col>
      </Form.Group>
      <br />

      <Form.Group as={Row}>
        <Col sm="12">
          <Form.Label className="label">Description:</Form.Label>
          <Form.Control id="input" as="textarea" placeholder="Description" />
        </Col>
      </Form.Group>
      <br></br>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button id="submit" type="submit" className="mt-3" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </Form>
  </Card.Body>
</Card>
        </div>

        
      </div>

      </div>
    </div>
    </>
  );
}

export default ContactPage;
