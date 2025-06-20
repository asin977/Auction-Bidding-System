import React from 'react'
import {SignIn} from '../components/SignIn';
import {SiteDetails} from '../components/SiteDetails';
import {Footer} from '../components/Footer'

export const SignInPage =()=> {
  return (
    <div>
        <SignIn />
        <SiteDetails />
        <Footer />
    </div>
  )
}

export default SignInPage
