import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'
import { doc, setDoc } from "firebase/firestore";
// Register 
export const registerApi = async (email, password, confirmPassword, firstName, lastName, phone) => {
  if (password !== confirmPassword) {
    toast.error("Passwords do not match.")
    return;
  }
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Save additional details in a doc of 'user' collection
      await setDoc(doc(db, 'users', email), {
        firstName, lastName, phone, email, groups: []
      })
      window.location.href="/";
    })
    .catch((error) => {
      console.log(error.code)
      switch (error.code) {
        case 'auth/weak-password':
          toast.info("The password must have atleast 6 characters")
          return;
        case 'auth/email-already-in-use':
          toast.error("This email is already registered.")
          return;
        default:
          toast.error("Some error occured in auth, try again!")
          return;
      }
    });
}

// Login
export const loginApi = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      window.location.href = "/groups"
    })
    .catch((error) => {
      console.log(error.code)
      switch (error.code) {
        case 'auth/user-not-found':
          toast.warning("The email is not registered.")
          return;
        case 'auth/wrong-password':
          toast.info("The password does not match")
          return;
        default:
          toast.error("Error occured in auth, try again!")
          return;
      }
    });
}

// Logout
export const logoutApi = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    window.location.href = "/login"
  }).catch((error) => {
    // An error happened.
    toast.error("Sign out was unsuccessful")
  });
}

// Forgot Password
export const forgotPasswordApi = async (email) => {
  await sendPasswordResetEmail(auth, email)
  toast.success("Password reset email sent")
  toast.info("Check your spam folders!")
}