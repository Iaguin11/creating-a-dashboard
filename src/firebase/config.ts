import firebase from "firebase/compat/app"
import 'firebase/compat/auth'

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ,
  projectId:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_messagingSenderId ,
  appId:process.env.NEXT_PUBLIC_FIREBASE_appId,
}
 
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
}
 
export default firebase