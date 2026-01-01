import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAQVUDyO3QQ1Akk-6NsrKyfOgaFqiDVee8',
  authDomain: 'cooking-work-tool.firebaseapp.com',
  projectId: 'cooking-work-tool',
  storageBucket: 'cooking-work-tool.firebasestorage.app',
  messagingSenderId: '104589867676',
  appId: '1:104589867676:web:7b3cb0e7b197f28590cb59',
  measurementId: 'G-RJEHY95XJN',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
