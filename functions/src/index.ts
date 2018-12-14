import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

admin.initializeApp();
export const createFirebaseToken = functions.https.onRequest(async(request, response) => {
  const user = request.body;
  console.log(JSON.stringify(request));
  console.log(`Creating token for uid: ${user.uid}...`);
  const token = await admin.auth().createCustomToken(user.uid, user);
  console.log(`Created token: ${token} for uid: ${user.uid}`);
  response.status(200).send(token);
});
