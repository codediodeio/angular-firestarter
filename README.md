[![Slack](https://firebasestorage.googleapis.com/v0/b/firestarter-96e46.appspot.com/o/assets%2Fslack-badge.svg?alt=media&token=3e68acef-3e00-4925-9710-e11cee5923e4)](https://join.slack.com/angularfirebase/shared_invite/MjA2NTgxMTI0MTk2LTE0OTg4NTQ4MDAtMjhhZDIzMjc0Mg)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

# FireStarter - Angular + Firebase Progressive Web App

FireStarter is a basic Angular PWA powered by Firebase. It can serve as a foundation to learn this stack and roll out more complex features.

- [Live Demo](https://firestarter-96e46.firebaseapp.com/)
- [Lessons and Screencasts](https://angularfirebase.com)
- [Join the Slack Team](https://join.slack.com/t/angularfirebase/shared_invite/enQtMjU2OTU5OTMyODM3LWU4YTZiMGFhZjJhYmEwYzI1MWFmYTgyMWRmOTI5NWZjYWE3NTMwZjFmNWMwZGI1MmMzODQ3OTFlZjFkMjc5N2Y)

## Features

- Angular 5.0
- 100 PWA Lighthouse Score
- Firebase Auth with Custom Data in Firestore
- CRUD Demos (Firestore & Realtime DB)
- File Uploads to Firebase Storage Demo


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
        projectId: 'DEV-APP',
        storageBucket: 'DEV-APP.appspot.com',
        messagingSenderId: '123456789'
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

- [ArtiFilter](https://artifilter.com) - Neural Art Generator
- [FlashLawyer](https://flashlawyer.com) - Legal Document Builder and Chatbot
