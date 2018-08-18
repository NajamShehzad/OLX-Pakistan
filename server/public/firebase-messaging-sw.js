importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCggl12DJNqEHfe7VRDzQlAG5nEcXb28R4",
    authDomain: "sylani-fa1f7.firebaseapp.com",
    databaseURL: "https://sylani-fa1f7.firebaseio.com",
    projectId: "sylani-fa1f7",
    storageBucket: "sylani-fa1f7.appspot.com",
    messagingSenderId: "244619989865"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();