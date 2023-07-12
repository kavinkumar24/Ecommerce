import './App.css';
import NavigationBar from './Components/navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import ProductItem1 from './Components/products/ProductItem1';
import ProductItem2 from './Components/products/ProductItem2';
import Cart from './Components/Cart/Cart';
import { useState } from 'react';
import Products from './Components/products/ProductItem';
import SignIn from './Components/Authentic/SignIn';
import SignUp from './Components/Authentic/SignUp';
import ProductItem3 from './Components/products/ProductItem3';
import AddressForm from './Components/Cart/Addressform';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Products cartItems={cartItems} setCartItems={setCartItems} searchTerm={searchTerm} />}/>
        <Route path="/ProductItem1" element={<ProductItem1 cartItems={cartItems} setCartItems={setCartItems}  />} />
        
        <Route path="/ProductItem2" element={<ProductItem2 cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/SignIn" element={<SignIn/>}></Route>
        <Route path="/SignUp" element ={<SignUp/>}></Route>
 
      <Route path="/ProductItem3" element={<ProductItem3 cartItems={cartItems} setCartItems={setCartItems} />}></Route>

      <Route path="/orderform" element={<AddressForm cartItems={cartItems} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
