importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js');

// Your web app's Firebase configuration
  const firebaseConfig = {
  		apiKey: "AIzaSyC4njacsC06CRlbeJ4oDtgzlHEAv6Wab_U",
  		authDomain: "ikseer-e68b7.firebaseapp.com",
  		projectId: "ikseer-e68b7",
  		storageBucket: "ikseer-e68b7.appspot.com",
  		messagingSenderId: "339514332634",
  		appId: "1:339514332634:web:1f58f91abe65df59475ce3",
  		measurementId: "G-4C2S8RV5PK"
	};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
