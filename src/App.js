import Header from "./components/header";
import Footer from "./components/footer";
import { Container } from "react-bootstrap"

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomePage from "./pages/homePage";
import ProductPage from "./pages/productPage";
import CartPage from "./pages/cartPage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import ProfilePage from "./pages/profilePage";
import ShippingPage from "./pages/shippingPage";
import PaymentPage from "./pages/paymentPage";
import PlaceOrderPage from "./pages/placeOrderPage";

// App 里面要保留 所有的 register
function App() {
  return (
      <Router>
        <Header/>
            <main>
                <Container className="text-center py-4">
                    <Routes>

                        <Route path='/' element={<HomePage/>} exact />
                        <Route path='/login' element={<LoginPage/>}></Route>
                        <Route path='/register' element={<RegisterPage/>} ></Route>
                        <Route path='/profile'  element={<ProfilePage/>}></Route>
                        <Route path='/shipping' element={<ShippingPage/>}></Route>
                        <Route path='/payment' element={<PaymentPage/>}></Route>
                        <Route path='/placeOrder' element={<PlaceOrderPage/>} />
                        {/*这里进行了设定:所以能够进行最终的跳转*/}
                        <Route path='/product/:id' element={<ProductPage/>} />
                        <Route path='/cart/:id' element={<CartPage/>} />
                        <Route path='/cart' element={<CartPage/>} />
                    </Routes>
                </Container>
            </main>
        <Footer />
      </Router>

  );
}

export default App;
