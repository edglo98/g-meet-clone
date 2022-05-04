// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCWxgdIPsUzMpU0O6ttGWpmdIhv6TNn9mw',
  authDomain: 'g-meet-clone-d4408.firebaseapp.com',
  projectId: 'g-meet-clone-d4408',
  storageBucket: 'g-meet-clone-d4408.appspot.com',
  messagingSenderId: '371276968787',
  appId: '1:371276968787:web:661cb5032fe7cab82827a6',
  measurementId: 'G-XCL76SP2D3'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const analytics = getAnalytics(app)
