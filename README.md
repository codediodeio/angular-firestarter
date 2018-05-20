[![Slack](https://firebasestorage.googleapis.com/v0/b/firestarter-96e46.appspot.com/o/assets%2Fslack-badge.svg?alt=media&token=3e68acef-3e00-4925-9710-e11cee5923e4)](https://join.slack.com/angularfirebase/shared_invite/MjA2NTgxMTI0MTk2LTE0OTg4NTQ4MDAtMjhhZDIzMjc0Mg)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

# FireStarter

FireStarter is an Angular PWA powered by Firebase. It can serve as a foundation to learn this stack and roll out more complex features.
- [Live Demo](https://firestarter-96e46.firebaseapp.com/)
- [Lessons and Screencasts](https://angularfirebase.com)
- [Join the Slack Team](https://goo.gl/qF8Q5r)

## Features

- Angular 6.x
- 100 PWA Lighthouse Score with NGSW
- Firebase Auth, Storage, and Cloud Firestore Demos
- Angular Universal Prerendered SSR (hosted on Firebase)

## Usage

1. Run

- `git clone https://github.com/codediodeio/angular-firestarter.git firestarter`
- `cd firestarter`
- `npm install`

2. Create a project at https://firebase.google.com/ and grab your web config:

![](https://angularfirebase.com/wp-content/uploads/2017/04/firebase-dev-prod-credentials.png)

3. Add the config to your Angular environment

#### src/environments/environment.ts
```typescript
export const environment = {
    production: false,
    firebase: {
        apiKey: 'APIKEY',
        authDomain: 'DEV-APP.firebaseapp.com',
        databaseURL: 'https://DEV-APP.firebaseio.com',
        projectId: 'DEV-APP',
        storageBucket: 'DEV-APP.appspot.com',
        messagingSenderId: '123456789'
    }
};
```

4. Open `src/app/app.module.ts` and replace the `firebasePlaceholderConfig` with your environment, i.e `environment.firebase`

5. And finally `ng serve`
