import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"

import PublicRouteComponent from "./components/PublicRouteComponent"
import PrivateRouteComponent from "./components/PrivateRouteComponent"
import SelectRoleComponent from './pages/SelectRoleComponent';
import Navbar from './components/Navbar'
import Account from "./pages/Account"
import Restaurant from "./pages/Restaurant"
import { useApplicationData } from "./context/ApplicationDataContext"

const App = () => {
  const { user } = useApplicationData();

  if(user?.role === 'Seller'){
    return <Restaurant />
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<PrivateRouteComponent />}>
          <Route path='/' element={<Home />} />
          <Route path='/select-role' element={<SelectRoleComponent />} />
          <Route path="/account" element={<Account />} />
          {/* <Route path='*' element={<Navigate to='/' replace />} /> */}
        </Route>
        <Route element={<PublicRouteComponent />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App