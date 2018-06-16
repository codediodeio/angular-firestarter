<div style="display: flex; flex-wrap: nowrap; justify-content: space-around; padding: 0 20vw">

[![Slack Status](https://slackin-pbfjhfxnsa.now.sh/badge.svg)](https://goo.gl/qF8Q5r)

<img src="https://slack.angularfirebase.com/badge.svg">

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

[![Lighthouse score: 100/100](https://lighthouse-badge.appspot.com/?score=100&compact)](https://github.com/ebidel/lighthouse-badge)

[![CircleCI](https://circleci.com/gh/codediodeio/angular-firestarter.svg?style=svg)](https://circleci.com/gh/codediodeio/angular-firestarter)

</div>

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

1.  Run

- `git clone https://github.com/codediodeio/angular-firestarter.git firestarter`
- `cd firestarter`
- `npm install`

2.  Create a project at https://firebase.google.com/ and grab your web config:

![](https://angularfirebase.com/wp-content/uploads/2017/04/firebase-dev-prod-credentials.png)

3.  Add the config to your Angular environment

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

4.  Open `src/app/app.module.ts` and replace the `firebasePlaceholderConfig` with your environment, i.e `environment.firebase`

5.  And finally `ng serve`
