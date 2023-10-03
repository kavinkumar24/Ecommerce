import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, FormControl, Form, Button } from 'react-bootstrap';
import Slideshow from '../Slideshow';
import { Link as RouterLink } from 'react-router-dom';
import './navbar.css'
import img1 from '../images/image3.jpg'
import { useEffect } from 'react';
import Logo from '../images/logo.png'
import { FaSearch } from 'react-icons/fa';
import { useRef } from "react";
import ImageSlider from './ImageSlider';

import '../products/products.css'
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cookie_logo from '../images/cookies/cookies.png'
import fruit_logo from '../images/apple-fruit.png'
import chair_logo from '../images/chair.png'
import clothing_logo from '../images/clothes.png'
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import { FaGoogle,FaMobile } from 'react-icons/fa';


function NavigationBar({ cartItems, uniqueItems,showSlideshow = true ,showHeader = true,showDropdown: initialShowDropdown = false,onSearch ,showImageContainer = true}) {
  
  const [showSearch, setShowSearch] = useState(false);

const [searchTerm, setSearchTerm] = useState('');
const [title, setTitle] = useState('Categories');
const handleSelect = (eventKey,event) => {
  console.log(eventKey);
  setTitle(eventKey);
  setShowSpinner(true);
  setTimeout(() => {
    setShowSpinner(false);

    setSelectedOption(eventKey);
  }, 1000);
};





  const [showDropdown, setShowDropdown] = useState(initialShowDropdown);
  const [showLoader, setShowLoader] = useState(false);
 const [showSpinner,setShowSpinner] = useState(false);


 const [selectedOption, setSelectedOption] = useState('');

 const getBackgroundStyle = () => {
  if (selectedOption === 'Grocery') {
    return {
      backgroundImage: "url('../images/image1.jpg')",
     
    };
  }
   else {
    return { backgroundColor: 'red' };
  }
};
const itemCount = uniqueItems ? uniqueItems.length : 0;

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 380) {
        setShowSearch(true);
      } else {
        setShowSearch(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const typingRef = useRef();

  useEffect(() => {
    const text = "Groceries Delivered in 90 Minute";
    let index = 0;
  
    function type() {
      if (index < text.length) {
        const nextCharacter = String.fromCharCode(text.codePointAt(index));
        if (typingRef.current) {
          const currentText = typingRef.current.textContent;
          typingRef.current.textContent = currentText.slice(0, index) + nextCharacter + currentText.slice(index + 1);
        }
        index++;
        setTimeout(type, 50);
      }
    }
  
    type();
  }, []);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [showMobileLogin, setShowMobileLogin] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };
  const Button1  = styled.button`
  width: 100%;
  border:none;
  padding: 12px 20px;
  border-radius:8px;
  margin: 8px 0;
  svg {
    margin-right: 10px;
  }
  box-sizing: border-box;

  &:hover{
    filter: brightness(120%);
  }
`;
const Form1 = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input1 = styled.input`
width: 100%;
padding: 12px 20px;
margin: 8px 0;
box-sizing: border-box;
border: 1px solid #919191;
border-radius:4px;


&:focus {
  outline-color: #5b7570;
}
`;


const Hr = styled.hr`
  width: 100%;
`;


const GlobalStyle = createGlobalStyle`
  .ReactModal__Content {
    ::-webkit-scrollbar {
      width: 3px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
      background: #089b7d;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    ::-webkit-scrollbar-button {
      height: 5px; /* height of the top and bottom buttons */
      display: block;
      background-color: transparent;
    }
  }
`;
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '440px',
    zIndex                 :1000,
    height                : '90%',
    display               : 'flex',
    flexDirection         : 'column',
    justifyContent        : 'center',
    alignItems            : 'center',
    overflowY             : 'scroll', 
    paddingRight          : '20px',
    scrollbarWidth        : '3px', 
    scrollbarColor        : '#888 #f1f1f1' 
  },
  overlay: {
    zIndex: 1000,
  }

};
const [showLogin, setShowLogin] = useState(false);
const handleShowMobileLogin = () => {
  setShowMobileLogin(true);

};
const handleCloseMobileLogin = () => setShowMobileLogin(false);

const [isRegister, setIsRegister] = useState(false);
const closeModal = () => {
  setModalIsOpen(false);
  setIsRegister(false);

};
  return (
    <>
      <Navbar collapseOnSelect expand="lg" variant="light" id='Navbar1'>
        <Navbar.Brand href="#home"><img src={Logo} alt='logo' id="logo"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            
          <NavDropdown
    title={title} className='drop'
    id="collasible-nav-dropdown"
    onClick={() => setShowDropdown(true)}
  >
    <NavDropdown.Item as={RouterLink} to="/" eventKey="Grocery" onSelect={handleSelect}><img src={fruit_logo} width="22px" height="22px"alt='2'/> Grocery</NavDropdown.Item>
    <NavDropdown.Item as={RouterLink} to="/ProductItem1" eventKey="Bakery" onSelect={handleSelect}><img src={cookie_logo} width="22px" height="22px"alt='2'/> Bakery</NavDropdown.Item>
    <NavDropdown.Item as={RouterLink} to="/ProductItem2" eventKey="furnitures" onSelect={handleSelect}><img src={chair_logo} width="22px" height="22px"alt='2'/> Furnitures</NavDropdown.Item>
    <NavDropdown.Item as={RouterLink} to="/ProductItem3" eventKey="clothing" onSelect={handleSelect}> <img src={clothing_logo} width="22px" height="22px"alt='2'/> Clothing</NavDropdown.Item>
    <NavDropdown.Item href="#action/5.3" eventKey="clothing" onSelect={handleSelect}>Clothing</NavDropdown.Item>
    <NavDropdown.Divider />
    
  </NavDropdown>
          </Nav>
         

          {showSearch && (
        <Form inline className="mx-auto" style={{ display: 'flex', flexWrap: 'nowrap', marginLeft: '0px', position: 'relative', left: '10px' }} id="form_search">
          <FormControl type="text" placeholder="search your products here" className="mr-sm-2 input_form" onChange={e => setSearchTerm(e.target.value)} />
          <Button className='btn-bg search_btn' onClick={handleClick}><FaSearch /></Button>
        </Form>
      )}
          <Nav style={{ marginLeft: 'auto', marginRight:'40px'}}>
  <Nav.Link as={RouterLink} to="/shops"  href="#home"  id="home">Shops</Nav.Link>
  <Nav.Link as={RouterLink} to="/offer" href="#Offers" id="home">Offers</Nav.Link>

  <Nav.Link href="#FAQ" id="home">FAQ</Nav.Link>
  <Nav.Link as={RouterLink} to="/contact"  href="#Contact" id="home">Contact</Nav.Link>
  <Button style={{ marginRight: '10px' }} id="button">Become seller</Button>
  <Button id="button" onClick={openModal}>Join</Button>

  <Nav.Link as={RouterLink} to="/cart" className='cart'>
              Cart<i class="fa fa-shopping-cart cart_icon"></i>
              {itemCount > 0 && (
                <span style={{
                  position: 'relative',
                  top: '-13px',
                  backgroundColor: '#089b7d',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  fontSize:'9px',
                  fontWeight:'bolder',
                  padding:'0px',
                  textAlign:'center',
                  height: '20px',
                  lineHeight: '20px',
                  display: 'inline-block'
                }}>{itemCount}</span>
              )}
            </Nav.Link>

            {/* <div className="vr"></div>
                        <Nav.Link href="#link" className='signin' as={RouterLink} to="/SignIn">Sign In<i class='fas fa-user-alt sigin_in_logo'></i></Nav.Link> */}
          </Nav>
          <Nav>

          </Nav>
        </Navbar.Collapse>
      </Navbar>
     
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
                <Button1 style={{ backgroundColor: "#616161",color:'white' }}onClick={handleShowMobileLogin}><FaMobile />Login with Mobile number</Button1>
            <p>Don't have an account? <Button id="redirect" onClick={() => setIsRegister(true)}>Register</Button></p>
          </>
        )}

<Modal
  isOpen={showMobileLogin}
  onRequestClose={handleCloseMobileLogin}
  style={customStyles}
  contentLabel="Mobile Login Modal"
>
<img src={Logo} alt='logo' style={{ width: '290px',padding:'20px'}}/>
  <p>We'll send you a code to the given mobile number to login into your account</p>
    
   
    <Input1 type="number" name="mobileNumber" placeholder="Mobile Number" required />
   
  <Button1 style={{backgroundColor:'#089b7d',color:'white'}} > Send OTP</Button1>
  <Hr />
  <p>Or</p>
  <Button1 onClick={handleCloseMobileLogin}style= {{backgroundColor:'#a1a1a1',color:'white'}}> Login</Button1>

</Modal>

      </Modal>
      {showImageContainer && (
        <>
      <div className='image_container' style={getBackgroundStyle()}>
      <div className='text_container'>

      <h1 id="autotype"ref={typingRef} className="typing">
          
          </h1>
          <br></br>
          
            <p id="para">Get your healthy foods & snacks delivered at your doorsteps all day everyday</p>
          </div>
          <br></br>

      <Form inline className="mx-auto" id="search_form1" style={{ display: 'flex', alignItems: 'center', zIndex:'99999', left: '50%', transform: 'translateX(-50%)' }}>
      
      <FormControl id="input_search_form" type="text" placeholder="Search your products from here" className="mr-sm-2 " onChange={e => setSearchTerm(e.target.value)} style={{ borderRadius: '5px 0 0 5px' }} />


    <Button className='btn-bg search_btn' onClick={handleClick} id="search" style={{ borderRadius: '0px 5px 5px 0px' }}>
      <FaSearch/>  Search</Button>
  </Form>
</div>
<ImageSlider  />
</>
      )}

     
{showSpinner && (
  <div
  style={{
    position: "fixed",
    top: "50%",
    left: "50%",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    display: "flex",
    zIndex: 9999,
    transform: "translate(-50%, -50%)"
  }}
  >
    <div>
      <div className="spinner-border" role="status"></div>
      <div>Loading...</div>
    </div>
  </div>
)}

    
    </>
  );
}

export default NavigationBar;
