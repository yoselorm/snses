import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'

const LoginPage = () => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
  return (
   <div className='w-full'>
   <LoginForm password={password} username={username} setPassword={setPassword} setUsername={setUsername}/>
   </div>
  )
}

export default LoginPage