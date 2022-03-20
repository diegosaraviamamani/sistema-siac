import React, { useEffect, createContext, useState, useContext } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../utils/firebaseConfig'

const AuthContext = createContext(undefined)

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const value = { user }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, setUser);
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error(
      "useAuthContext must be used within a FirebaseAuthProvider"
    );
  }
  return context;
}

export { AuthProvider, useAuthContext }
