import { Layout } from "./Layout/Layout"

import {Route,BrowserRouter, Routes,} from "react-router-dom"
import Register from "./pages/Register"
import SignIn from "./pages/SignIn"
import AddHotel from "./pages/AddHotel"
import { useAppContext } from "./contexts/contextApp"
import MyHotels from "./pages/MyHotels"
import EditHotel from "./pages/EditHotel"
import Search from "./pages/Search"
import Details from "./pages/Details"
import Booking from "./pages/Booking"
import MyBookings from "./pages/MyBookings"
import Home from "./pages/Home"

const App= () =>{
  const {isLoggedIn} = useAppContext ()

  return (
   
    
 <BrowserRouter>
   <Routes>
     <Route path="/" element={<Layout><Home/></Layout>} />
     <Route path="/search" element={<Layout><Search/></Layout>} />
     <Route path="/detail/:hotelId" element={<Layout><Details/></Layout>} />
     <Route path="/register" element={<Layout><Register/></Layout>} />
    <Route path="/sign-in" element={<Layout><SignIn></SignIn></Layout>} />
    {isLoggedIn && (
      (
        <> 
        <Route path="/add-hotel/:hotelId/bookings" element={<Layout><Booking /></Layout>} /> 
        <Route path="/add-hotel" element={<Layout><AddHotel /></Layout>} /> 
        <Route path="/edit-hotel/:hotelId" element={<Layout><EditHotel/></Layout>} />
         <Route path="/my-hotels" element={<Layout><MyHotels /></Layout>} />
         <Route path="/my-bookings" element={<Layout><MyBookings /></Layout>} />
         </>
      )
    )
      
      }
     
   </Routes></BrowserRouter>

  
  )
}

export default App

