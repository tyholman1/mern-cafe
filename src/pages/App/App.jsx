import './App.css'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import NewOrderPage from "../NewOrderPage/NewOrderPage.jsx"
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage.jsx'
import AuthPage from "../AuthPage/AuthPage.jsx"
import NavBar from "../../components/NavBar/NavBar"
import { getUser } from '../../utilities/users-service'


function App() {
  const [user, setUser] = useState(getUser())
 


  return (
    <main className="App">
      {
        user ?
          <>
            <Routes>
              <Route path="/orders/new" element={<NewOrderPage user={user} setUser={setUser}/>} />
              <Route path="/orders" element={<OrderHistoryPage user={user} setUser={setUser} />} />
              <Route path="*" element={<Navigation to='/orders/new' />} />

            </Routes>
          </>
        :
          <AuthPage setUser={setUser} />
      }
    </main>
  )
}

export default App