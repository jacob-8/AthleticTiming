let firebaseConfig = {
    apiKey: "AIzaSyCbKyCwNVUgq7g-6EBzDapII1k4oFc8les",
    authDomain: "athletic-timing-dev.firebaseapp.com",
    databaseURL: "https://athletic-timing-dev.firebaseio.com",
    projectId: "athletic-timing-dev",
    storageBucket: "athletic-timing-dev.appspot.com",
    messagingSenderId: "185079673837",
    appId: "1:185079673837:web:592921eff41c57491aede4"
}

if (window.location.href.includes("athletictiming") || window.location.port === "3001") {
    firebaseConfig = {
        apiKey: "AIzaSyBd7TuG4N8N7MEyTVPxWropqrmoD5rY0C4",
        authDomain: "athletic-timing-prod.firebaseapp.com",
        databaseURL: "https://athletic-timing-prod.firebaseio.com",
        projectId: "athletic-timing-prod",
        storageBucket: "athletic-timing-prod.appspot.com",
        messagingSenderId: "418757051059",
        appId: "1:418757051059:web:1fc5d722d439409e16e6c6"
    };
}

let app = firebase.initializeApp(firebaseConfig);
app.firestore().enablePersistence({ synchronizeTabs: true });
