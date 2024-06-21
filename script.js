// Replace these with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4njacsC06CRlbeJ4oDtgzlHEAv6Wab_U",
  authDomain: "ikseer-e68b7.firebaseapp.com",
  projectId: "ikseer-e68b7",
  storageBucket: "ikseer-e68b7.appspot.com",
  messagingSenderId: "339514332634",
  appId: "1:339514332634:web:e48f8e758db58e5a475ce3",
  measurementId: "G-H83FPQZBC4"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

const requestPermissionButton = document.getElementById('requestPermissionButton');
const tokenDisplay = document.getElementById('tokenDisplay');

requestPermissionButton.addEventListener('click', async () => {
  try {
    const currentToken = await messaging.getToken({ vapidKey: 'YOUR_PUBLIC_VAPID_KEY' });
    if (currentToken) {
      tokenDisplay.textContent = `Your FCM token: ${currentToken}`;
      sendToBackend(currentToken); // Call function to send token to backend
    } else {
      console.log('No existing registration token available. Request permission to generate one.');
      requestPermission();
    }
  } catch (error) {
    console.error('An error occurred while retrieving token:', error);
  }
});

// Function to request permission for notifications (optional)
async function requestPermission() {
  try {
    await messaging.requestPermission();
    console.log('Notification permission granted.');
  } catch (error) {
    console.error('An error occurred while requesting permission:', error);
  }
}

// Function to send the token to your backend (replace with your implementation)
function sendToBackend(token) {
  // Use your preferred method (e.g., fetch, XMLHttpRequest) to send the token to your backend API endpoint
  fetch('/your-backend-endpoint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ fcmToken: token })
  })
  .then(response => {
    if (response.ok) {
      console.log('FCM token sent to backend successfully.');
    } else {
      console.error('Error sending FCM token to backend:', response.statusText);
    }
  })
  .catch(error => {
    console.error('An error occurred while sending FCM token to backend:', error);
  });
}
