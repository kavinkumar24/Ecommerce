import { useState } from 'react'
import { Card, Form, Col, Row, Button } from 'react-bootstrap'
import { CreditCard, Bank, Money } from 'phosphor-react'
import './form.css'
import NavigationBar from '../navbar/Navbar'
const paymentMethods = [
  {
    label: 'Credit card',
    icon: <CreditCard size={16} />,
  },
  {
    label: 'Net banking',
    icon: <Bank size={16} />,
  },
  {
    label: 'Cash on delivery',
    icon: <Money size={16} />,
  },
]
 function AddressForm({ cartItems }) {
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);


  const [paymentMethod, setPaymentMethod] = useState('')
  const [pincode, setPincode] = useState('')
  const [street, setStreet] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [district, setDistrict] = useState('')
  const [city, setCity] = useState('')
  const [alternativeMobileNumber, setAlternativeMobileNumber] = useState('')
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [billDetails, setBillDetails] = useState({})

  const handleSubmit = (event) => {
    event.preventDefault()

    let newErrors = {}

    if (!pincode) {
      newErrors.pincode = 'Pincode is required'
    }

    if (!street) {
      newErrors.street = 'Street is required'
    }

    if (!mobileNumber) {
      newErrors.mobileNumber = 'Mobile number is required'
    }

    if (!district) {
      newErrors.district = 'District is required'
    }

    if (!city) {
      newErrors.city = 'City is required'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true)
      setBillDetails({
        pincode,
        street,
        mobileNumber,
        district,
        city,
        paymentMethod,
      })
      setPincode('')
      setStreet('')
      setMobileNumber('')
      setDistrict('')
      setCity('')
      //setPaymentMethod('')
      //setAlternativeMobileNumber('')
    }
  }

  return (
    <> <NavigationBar cartItems={cartItems} showSlideshow={false} showHeader={false} showDropdown={false} />
    
    <div className="form-container" id="container1" style={{ height: '100vh', width: '100%' }}>
      <br></br>
      <h1 className="form-heading">Address Form</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <Card className="mb-3" style={{ width: '600px' }} id="card1">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group as={Row}>
                  <Col sm="12">
                    <Form.Control id="input"
                      type="number"
                      placeholder="Pincode"
                      value={pincode}
                      onChange={(event) => setPincode(event.target.value)}
                      isInvalid={!!errors.pincode}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.pincode}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <br />

                <Form.Group as={Row}>
                  <Col sm="12">
                    <Form.Control id="input"
                      placeholder="Street"
                      value={street}
                      onChange={(event) => setStreet(event.target.value)}
                      isInvalid={!!errors.street}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.street}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <br></br>
                <Form.Group as={Row}>
                  <Col sm="6">
                    <Form.Control id="input"
                      type="number"
                      placeholder="Mobile number"
                      value={mobileNumber}
                      onChange={(event) => setMobileNumber(event.target.value)}
                      isInvalid={!!errors.mobileNumber}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.mobileNumber}
                    </Form.Control.Feedback>
                  </Col>
                  <Col sm="6"> 
                    <Form.Control id="input"
                      placeholder="District"
                      value={district}
                      onChange={(event) => setDistrict(event.target.value)}
                      isInvalid={!!errors.district}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.district}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
            <br></br>
                <Form.Group as={Row}>
                  <Col sm="6">
                    <Form.Control id="input"
                      placeholder="City"
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                      isInvalid={!!errors.city}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.city}
                    </Form.Control.Feedback>
                  </Col>
                  <Col sm="6">
                    <Form.Control id="input"   
                      type="number"
                      placeholder="Alternative mobile number"
                      value={alternativeMobileNumber}
                      onChange={(event) =>
                        setAlternativeMobileNumber(event.target.value)
                      }
                    />
                  </Col>
                </Form.Group>

              </Form>
            </Card.Body>
          </Card>

          <Card className="mt-3 mb-3" style={{ width: '600px' }} id="card1">
            <Card.Header>Payment</Card.Header>
            <Card.Body className="d-flex">
              {paymentMethods.map(({ label, icon }) => (
                <Card
                  key={label}
                  className={`mx-2 flex-grow-1 text-center ${
                    paymentMethod === label ? 'border-primary' : ''
                  }`}
                  onClick={() => setPaymentMethod(label)}
                >
                  <Card.Body className="d-flex flex-column align-items-center">
                    {icon}
                    {label}
                  </Card.Body>
                </Card>
              ))}
            </Card.Body>
          </Card>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button id="submit" type="submit" className="mt-3" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          {submitted && (
            <>
              <h2>Bill</h2>
              <Card style={{ width: '500px',position:'relative',left:'45px' }}id="result"> 
                <Card.Body className="bill-details">
                  <div className="bill-row">
                    <span className="bill-label">Pincode:  </span>
                    <span className="bill-value">{billDetails.pincode}</span>
                  </div>
                  <div className="bill-row">
                    <span className="bill-label">Street:  </span>
                    <span className="bill-value">{billDetails.street}</span>
                  </div>
                  <div className="bill-row">
                    <span className="bill-label">Mobile number:  </span>
                    <span className="bill-value">{billDetails.mobileNumber}</span>
                  </div>
                  <div className="bill-row">
                    <span className="bill-label">District:  </span>
                    <span className="bill-value">{billDetails.district}</span>
                  </div>
                  <div className="bill-row">
                    <span className="bill-label">City:  </span>
                    <span className="bill-value">{billDetails.city}</span>
                  </div>
                  <div className="bill-row">
                    <span className="bill-label">Payment method:  </span>
                    <span className="bill-value">{billDetails.paymentMethod}</span>
                  </div>
                </Card.Body>
              </Card>

              <Card id="items"style={{position:'relative',left:'45px',top:'20px',padding:'20px'}}>
      {submitted && (
        <div>
          <h3 style={{fontSize:'25px'}}>Items</h3>
          {cartItems.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 'bold', marginRight: '20px' }}>{item.title}</span>
              <span>₹{item.price}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <strong>Total:</strong>
        <strong>₹{total}</strong>
      </div>
        </div>
      )}
      </Card>
            </>
          )}
        </div>
      </div>
      
    </div>
    </>
  )
}


export default AddressForm