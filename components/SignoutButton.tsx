"use client";

import React from 'react'
import { logout } from '../app/lib/actions/auth'

const SignoutButton = () => {
  return (
    <button onClick={()=>logout()}>SignOut</button>
  )
}

export default SignoutButton