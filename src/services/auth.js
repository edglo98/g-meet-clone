import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from './firebaseConfig'

export const signUpWithEmail = async ({ email, password, name, username }) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const { uid } = userCredential.user
  await setDoc(doc(db, 'users', uid), {
    name,
    username,
    email,
    uid,
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

export const getUserData = async (uid) => {
  return await getDoc(doc(db, 'users', uid))
}

export const loginWithEmail = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  const { uid } = userCredential.user
  const user = await getUserData(uid)
  return user.data()
}

export const signOutUser = async () => await auth.signOut()

export const verifyUserAuth = (callback, errorCallback) => {
  return onAuthStateChanged(auth, callback, errorCallback)
}
