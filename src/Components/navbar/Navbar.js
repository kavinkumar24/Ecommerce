import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, FormControl, Form, Button } from 'react-bootstrap';
import Slideshow from '../Slideshow';
import { Link as RouterLink } from 'react-router-dom';
import './navbar.css'
import { useEffect } from 'react';

function NavigationBar({ cartItems, showSlideshow = true ,showHeader = true,showDropdown: initialShowDropdown = false,onSearch }) {
  const [showDropdown, setShowDropdown] = useState(initialShowDropdown);
  const [searchTerm, setSearchTerm] = useState('');
  const [showLoader, setShowLoader] = useState(false);
 const [showSpinner,setShowSpinner] = useState(false);

  const itemCount = cartItems.length;
  useEffect(() => {
    let timer;
    if (showLoader) {
      timer = setTimeout(() => {
        setShowLoader(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showLoader]);
  const handleClick = () => {
    onSearch(searchTerm);
    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
    }, 1000);

  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" variant="light" id='Navbar1'>
        <Navbar.Brand href="#home">Brand</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link
              href="#pricing"
            >
              Pricing
            </Nav.Link>
            <NavDropdown
              title="Categories"
              id="collasible-nav-dropdown"
              show={showDropdown}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <NavDropdown.Item as={RouterLink} to="/">Furnitures</NavDropdown.Item>
              <NavDropdown.Item as={RouterLink} to="/ProductItem1">Fashion</NavDropdown.Item>
              <NavDropdown.Item as={RouterLink} to="/ProductItem2">Electronics</NavDropdown.Item>
              <NavDropdown.Item as={RouterLink} to="/ProductItem3">Grocery</NavDropdown.Item>

              <NavDropdown.Item href="#action/5.3">watches</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>

          </Nav>
          <Form inline className="mx-auto" style={{ display: 'flex', flexWrap: 'nowrap', marginLeft: '0px', position: 'relative', left: '-100px' }} id="form_search">
          <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={e => setSearchTerm(e.target.value)} />

          <Button className='btn-bg search_btn' onClick={handleClick}>Search</Button>

          </Form>
          <Nav className="ml-auto" style={{ marginRight: '70px' }}>
            <div className="vr"></div>
            <Nav.Link as={RouterLink} to="/cart" className='cart'>
              Cart<i class="fa fa-shopping-cart cart_icon"></i>
              {itemCount > 0 && (
                <span style={{
                  position: 'relative',
                  top: '-9px',
                  backgroundColor: 'blue',
                  color: 'white',
                  borderRadius: '50%',
                  width: '10px',
                  fontSize:'8px',
                  fontWeight:'bolder',
                  textAlign:'center',
                  height: '10px',
                  lineHeight: '10px',
                  display: 'inline-block'
                }}>{itemCount}</span>
              )}
            </Nav.Link>
            <Nav.Link href="#link" className='signin' as={RouterLink} to="/SignIn">Sign In<i class='fas fa-user-alt sigin_in_logo'></i></Nav.Link>
          </Nav>
          <Nav>

          </Nav>
        </Navbar.Collapse>
      </Navbar>
     
      {showHeader && (
        <>
          <h1 className='greet'>Welcome!!</h1>
          <marquee behavior="scroll" direction="left">
            The sell is live! Hurry Up!!
          </marquee>
        </>
      )}

      {showSlideshow && <Slideshow />}
      {showSpinner && (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(211,211,211,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      }}>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )}
    </>
  );
}

export default NavigationBar;
