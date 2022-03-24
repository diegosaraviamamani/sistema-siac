import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { firebaseAuth } from '../utils/firebaseConfig'

const login = ({ email, password }) =>
  signInWithEmailAndPassword(firebaseAuth, email, password)

const logout = () => signOut(firebaseAuth)

const authService = { login, logout }
export default authService
