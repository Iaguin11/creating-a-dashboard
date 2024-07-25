'use client'

import User from "@/model/user";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import firebase from '@/firebase/config'
import Cookies from 'js-cookie'

type AuthContextProps = {
  user: User | null,
  loading: boolean,
  register: (email: string, pass: string)=> Promise<void>,
  login: (email: string, pass: string)=> Promise<void>,
  loginGoogle: ()=> Promise<void>,
  logout: ()=> Promise<void>
}

async function normalizeUser(user: firebase.User) {
  const normalizedUser: User = {
    uid: user.uid,
    name: user.displayName || '',
    email: user.email || '',
    token: await user.getIdToken(),
    imageUrl: user.photoURL || '',
    provider: user.providerId
  }

  return normalizedUser
}

function manageCookies(logged: boolean) {
  if(logged) {
    Cookies.set('admin-template-auth', 'true', {
      expires: 7
    })
  } else {
    Cookies.remove('admin-template-auth')
  }
}

export const AuthContext = createContext({} as AuthContextProps)

export default function AuthProvider({ children } : { children: any }) {
  const [ user, setUser ] = useState<User | null>(null)
  const [ loading, setLoading ] = useState(true)
  const router = useRouter()

  async function configurationSession(firebaseUser: firebase.User | null) {
    if(firebaseUser?.email) {
      const userLogged = await normalizeUser(firebaseUser)
      setUser(userLogged)
      manageCookies(true)
      setLoading(false)
      return userLogged.email
    } else {
      setUser(null)
      manageCookies(false)
      setLoading(false)
    }
  }

  async function register(email: string, pass: string) {
    console.log('Registrar com o email e senha...')

    try {
      const resp = await firebase.auth().createUserWithEmailAndPassword(email, pass)
      console.log(resp)

      if(resp.user) {
        await configurationSession(resp.user)
        router.push('/')
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async function login(email: string, pass: string) {
    console.log('Login com o email e senha...', email, pass)

    try {
      const resp = await firebase.auth().signInWithEmailAndPassword(email, pass)
      console.log(resp)

      if(resp.user) {
        await configurationSession(resp.user)
        router.push('/')
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async function loginGoogle() {
    console.log('Login com o Google...')

    try {
      const resp = await firebase.auth().signInWithPopup(
        new firebase.auth.GoogleAuthProvider
      )

      if(resp.user) {
        await configurationSession(resp.user)
        router.push('/')
      }
    } catch (error) {
      
    }
  }

  async function logout() {
    try {
      setLoading(true)
      await firebase.auth().signOut()
      await configurationSession(null)

    } finally {
      setLoading(false)
    }
  }

  useEffect(()=> {
    const cancel = firebase.auth().onIdTokenChanged(configurationSession)
    return cancel
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        loginGoogle,
        logout
      }}
    >
      { children }
    </AuthContext.Provider>
  )
}