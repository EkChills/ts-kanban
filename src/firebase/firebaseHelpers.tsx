import { FirebaseApp, initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  Auth,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyD8rL7p6n7tBXSXdCuISsqVTY3ff4RmMko",

  authDomain: "kanban-d6430.firebaseapp.com",

  projectId: "kanban-d6430",

  storageBucket: "kanban-d6430.appspot.com",

  messagingSenderId: "940208572214",

  appId: "1:940208572214:web:eaae33269b91c0208b1597"

};


const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);

export const signUpUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Signed in
    const user = userCredential.user;
    console.log(user);
  } catch (error) {
    console.log(error);
  }
};

const signInUser = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

const signOut = async (auth: Auth) => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};

export const isUser = () => {
  return auth.currentUser;
};
