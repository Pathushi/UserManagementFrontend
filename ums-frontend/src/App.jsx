import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListUserComponent from './components/user/ListUserComponent'
import HeaderComponent from './components/user/HeaderComponent'
import FooterComponent from './components/user/FooterComponent'
import { BrowserRouter,Routes,Route } from 'react-router-dom'  
import UserComponent from './components/user/UserComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
       <HeaderComponent />
       <Routes>
          {/* // http://localhost:3000 */}
          <Route path='/' element={<ListUserComponent />} ></Route>
          {/* // http://localhost:3000/users */}
          <Route path="/users" element={<ListUserComponent />} ></Route>
          {/* // http://localhost:3000/add-user */}
          <Route path="/add-user" element={<UserComponent />} ></Route>
          {/* // http://localhost:3000/edit-user/1 */}
          <Route path="/edit-user/:id" element={<UserComponent />} ></Route>
  
       </Routes>
       <FooterComponent />
       {/* <ListUserComponent /> */}
    </BrowserRouter>
    </>
  )
}

export default App