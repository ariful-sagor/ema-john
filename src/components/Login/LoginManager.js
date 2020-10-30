import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './Firebase.config';

export const initializeLoginFramework = () => {
    if (firebase.apps.length ===0){
        firebase.initializeApp(firebaseConfig); 
    }
}

export const handleGoogleSignIn=()=>{
  const googleProvider = new firebase.auth.GoogleAuthProvider();
   return firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
      const {displayName, photoURL, email} = res.user;
      const signedInUSer={
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      }
      return signedInUSer;
      console.log(displayName, photoURL, email)
    })
    .catch(err=>{
      console.log(err)
      console.log(err.message)
    })  
}
export const handleFbLogIn=()=>{
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        user.success=true;
        return user;
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
    }
export const handleSignOut= () => {
    return firebase.auth().signOut()
        .then(res =>{
          const signedOutUser={
          newUser: false,
          isSignedIn: false,
          name:'',
          photo:'',
          password:'',
          email:'',
          error:'',
          success:false,
          }
        return signedOutUser;
        })
}
export const createUserWithEmailAndPassword = (name, email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res =>{
          const newUserInfo =res.user;
          newUserInfo.error='';
          newUserInfo.success=true;
          updateUserName(name);
          verifyEmail();
          return newUserInfo;
        })
        .catch(function(error) {
         const newUserInfo= {};
         newUserInfo.error=error.message;
         newUserInfo.success=false;
         return newUserInfo;

        });
}
export const signInWithEmailAndPassword= (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res=>{
          const newUserInfo =res.user;
          newUserInfo.error='';
          newUserInfo.success=true;
          return newUserInfo;

        })
        .catch(function(error) {
          const newUserInfo= {};
         newUserInfo.error=error.message;
         newUserInfo.success=false;
         return newUserInfo;
        });
}
const updateUserName= name=> {
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name  
    }).then(function() {
      console.log('User updated successfully')
    }).catch(function(error) {
      console.log(error)
    });
  }
  const verifyEmail= () => {
    var User = firebase.auth().currentUser;
    User.sendEmailVerification().then(function() {
    }).catch(function(error) {
    });
  }

  export const resetPassword = email => {
    var auth = firebase.auth();
    auth.sendPasswordResetEmail(email).then(function() {
      // Email sent.
    }).catch(function(error) {
      // An error happened.
    });
  }