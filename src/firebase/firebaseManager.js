import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBBJKtydYHHJiOtJz1pdRTbQkKkSm_cly4",
    authDomain: "task-8f8b6.firebaseapp.com",
    databaseURL: "https://task-8f8b6.firebaseio.com",
    projectId: "task-8f8b6",
    storageBucket: "",
    messagingSenderId: "352463508369",
    appId: "1:352463508369:web:0ed3ad34d9075993"
};

export const fire = firebase.initializeApp(firebaseConfig);


export function signIn(email,password) {
    return new Promise((resolve, reject)=>{
        fire.auth().signInWithEmailAndPassword(email, password)
            .then((data)=>{
                resolve(data)
            })
            .catch(e=> reject(e))
    })
}

export function createUser(email,password) {
    return new Promise((resolve, reject)=>{
        fire.auth().createUserWithEmailAndPassword(email, password)
            .then((data)=>resolve(data)).catch(e=> reject(e))

    })
}


