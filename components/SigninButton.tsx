"use client";
import React from 'react'
import { login } from '../app/lib/actions/auth'

const SigninButton = () => {
  return (
    <button onClick={()=>login()}>Login</button>
  )
}

export default SigninButton