import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

admin.initializeApp();

export const createFirebaseToken = functions.https.onCall(async(data, context) => {
  const uid = data.uid;

  try {
    await admin.auth().getUser(uid);
  }
  catch (err) {
    // Create New User Auth
    if (err.code === 'auth/user-not-found') {
      console.log(`Creating user: ${JSON.stringify(data)}`);
      await admin.auth().createUser(data);
    } else {
      console.log(`Unknown Problem: ${JSON.stringify(err)}`);
      return err;
    }
  }

  return admin.auth().createCustomToken(uid, data).then((token) => {
    console.log(`Created token: ${token} for uid: ${data.uid}`);
    return { token };
  });
});