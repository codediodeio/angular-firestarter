[![Slack](https://firebasestorage.googleapis.com/v0/b/firestarter-96e46.appspot.com/o/assets%2Fslack-badge.svg?alt=media&token=3e68acef-3e00-4925-9710-e11cee5923e4)](https://join.slack.com/angularfirebase/shared_invite/MjA2NTgxMTI0MTk2LTE0OTg4NTQ4MDAtMjhhZDIzMjc0Mg)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

# FireStarter - Angular + Firebase Progressive Web App

FireStarter is designed to handle the basic features required by most Angular Firebase apps. It can serve as a foundation to learn this stack and roll out more complex features.

- [Live Demo](https://firestarter-96e46.firebaseapp.com/)
- [Lessons and Screencasts](https://angularfirebase.com)
- [Join the Slack Team](https://join.slack.com/angularfirebase/shared_invite/MjA2NTgxMTI0MTk2LTE0OTg4NTQ4MDAtMjhhZDIzMjc0Mg)

## Features

- Angular 4.4 + AngularFire5
- 100 PWA Lighthouse Score
- Firebase Authentication w/ Router Guard
- Firestore Database CRUD Demo
- Realtime Database CRUD Demo
- File Uploads to Firebase Storage Demo
- SASS + Bulma + FontAwesome


## Usage

Create an account at https://firebase.google.com/

- `git clone https://github.com/codediodeio/angular-firestarter.git firestarter`
- `cd firestarter`
- `npm install`

Create the environment files below in `src/environments/`.

#### environment.ts
```typescript
export const environment = {
    production: false,
    firebaseConfig: {
        apiKey: 'APIKEY',
        authDomain: 'DEV-APP.firebaseapp.com',
        databaseURL: 'https://DEV-APP.firebaseio.com',
        storageBucket: 'DEV-APP.appspot.com'
    }
};
```
#### environment.prod.ts
```typescript
export const environment = {
    production: true,
    firebaseConfig: {
        // same as above, or use a different firebase project to isolate environments
    }
};
```

And finally `ng serve`

## Apps Using FireStarter in Production

- [ArtiFilter](https://app.artifilter.com) - Neural Art Generator
- [FlashLawyer](https://flashlawyer.com) - Legal Document Builder and Chatbot
