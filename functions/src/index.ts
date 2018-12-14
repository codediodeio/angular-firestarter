import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

admin.initializeApp();
export const createFirebaseToken = functions.https.onCall((data, context) => {
  console.log(JSON.stringify(data), JSON.stringify(context));
  console.log(`Creating token for uid: ${data.uid}...`);
  return admin.auth().createCustomToken(data.uid, data);
});
