// Debug, only turn this on if you want ALL the debug messages
// process.env.DEBUG = 'actions-on-google:*';

const DialogflowApp = require('actions-on-google').DialogflowApp; // Google Assistant helper library
const functions = require('firebase-functions');
const admin = require('firebase-admin'); // Firebase Admin

admin.initializeApp(functions.config().firebase); // init firebase app

var db = admin.firestore(); // Database access using firestore

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    console.log('Request headers: ' + JSON.stringify(request.headers));
    console.log('Request body: ' + JSON.stringify(request.body));

    const assistant = new DialogflowApp({ request: request, response: response });

    // Map intents to functions to handle them
    let actionMap = new Map();

    actionMap.set('determineIfRoadIsPlowed', determineIfRoadsArePlowed);

    function determineIfRoadsArePlowed(assistant) {
        console.log('We are trying to see if the roads are plowed.');
        console.log(`The user said ${assistant.getRawInput()}`);

        assistant.setContext('address');

        const location = assistant.getArgument('address');

        console.log(`I captured your location as ${location}`);

    }
});
