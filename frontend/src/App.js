import './App.css';
import { Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Pages/Home/Home';
import ProductView from './Pages/productView/ProductView';
import Wishlist from './Pages/wishlist/Wishlist';
import Cart from './Pages/cart/Cart';
import RegUser from './Pages/user/RegUser';
import LogInUser from './Pages/user/LogInUser';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/viewProduct/:id' element={<ProductView/>}/>
        <Route path='/wishlist' element={<Wishlist/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/userReg' element={<RegUser/>}/>
        <Route path='/userLogin' element={<LogInUser/>}/>
      </Routes>


      <Footer/>

    </div>
  );
}

export default App;
