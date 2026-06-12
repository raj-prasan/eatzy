import HomePage from "./pages/HomePage"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginPage } from "./pages/LoginPage"
import { CartPage } from "./pages/CartPage"
import PublicRoute from "./components/publicRoute"
import ProtectedRoute from "./components/protectedRoute"
import SelectRolePage from "./pages/SelectRolePage"
import Accountpage from "./pages/Accountpage"
import AddRestaurantPage from "./pages/AddRestaurantPage"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute/>}>
          <Route path='/login' element={<LoginPage/>}/> 
        </Route>
        <Route element={<ProtectedRoute/>}>
          <Route path='/' element={<HomePage/>}/> 
          <Route path='/cart' element={<CartPage/>}/> 
          <Route path='/select-role' element={<SelectRolePage/>}/> 
          <Route path='/account' element={<Accountpage/>}/> 
          <Route path='/add-restaurant' element={<AddRestaurantPage/>}/>
        </Route>
        
        
        
      </Routes>
    </BrowserRouter>
  )
}

export default App