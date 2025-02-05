"use client";

import  Link  from 'next/link';
import React from 'react'
import { X } from 'lucide-react';

const SearchFormReset = () => {
    const reset = ()=>{
            const form = document.querySelector(".search-form") as HTMLFormElement;
            if(form) form.reset();
            
        }
  return (
    <button type='reset' onClick={reset} className='search-btn'>
        <Link href='/' className=" text-white ">
        <X className='size-5'/>
        </Link>

    </button>
  )
}

export default SearchFormReset