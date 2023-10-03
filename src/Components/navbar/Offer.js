import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import NavigationBar from './Navbar';

const colors = ['#ee6952', '#fc9f9a', '#8d71fe', '#45b3ac', '#01bcd6', '#faa96e'];
const offers = ['Rs 5 OFF', 'Rs 10 OFF', 'Rs 15 OFF', 'Rs 20 OFF', 'Rs 25 OFF', 'Rs 30 OFF']; 

const OffersPage = ({ cartItems, setCartItems}) => {
  const [showAlert, setShowAlert] = useState(false);
  const uniqueItems = [...new Set(cartItems)];
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000); 
  };
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
       <NavigationBar cartItems={cartItems} showSlideshow={true} showHeader = {true} showDropdown={true} onSearch={setSearchTerm} showImageContainer={false} uniqueItems={uniqueItems}/>
      <div className="container" style={{position:'relative',top:'140px'}}>
        {showAlert && <Alert variant="success">Code copied to clipboard!</Alert>}
        <div className="row" >
          {colors.map((color, index) => {
            const code = "CODE" + (index + 1); // generates a new code for each card
            const offer = offers[index]; // gets the corresponding offer
            return (
              <div className="col-md-3 mb-4" key={index}>
                <Card style={{ backgroundColor: color, height: '200px' }}>
                  <Card.Body>
                    <Card.Title style={{border: '2px dotted #fff', color: '#fff',padding:'50px',fontSize:'30px'}}>{offer}</Card.Title>
                    <Card.Text>
                      <div className="d-flex justify-content-between align-items-center">
                        <span style={{color: '#fff'}}>{code}</span>
                        <Button variant="link" style={{color: '#fff'}} onClick={() => handleCopyCode(code)}>
                          Copy Code
                        </Button>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default OffersPage;
