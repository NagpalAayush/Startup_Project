import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { auth } from '@/auth'
import SignoutButton from './SignoutButton'
import SigninButton from './SigninButton'
const Navbar = async() => {
    const session = await auth();
  return (
    <header className='px-5 py-3 bg-white shadow-sm font-wor-sans'>
        <nav className='flex justify-between items-center'>
            <Link href={'/'}>
            <Image src="/logo.png" alt='logo' width={144} height={30}/>
            </Link>

        <div className='flex items-center gap-5'>
        {session && session?.user? (
                <>
                <Link href={"/startup/create"}>
                <span>Create</span></Link>

                <SignoutButton/>

                <Link href={`/user/${session?.id}`}>
                <span>{session?.user?.name}</span>
                </Link>
                </>

        ) : (
            <SigninButton/>
        )
        
    }
        </div>


        </nav>
    </header>
  )
}

export default Navbar