import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Layout from './utils/Layout'
import Overview from './pages/Overview'
import Products from './pages/Products'

const App = () => {
  return (


    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/dashboard' element={<Layout/>}>
      <Route index element={<Overview />} />
      <Route path='products' element={<Products/>}/>

      </Route>
    </Routes>
  )
}

export default App