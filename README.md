# FireStarter - Angular4 + Firebase Starter App

FireStarter is designed to handle the basic features most Angular+Firebase apps need. It can serve as a foundation to quickly roll out more complex features.

Demo

## Features

- Authentication w/ Router Guard
- Realtime Database CRUD Demo
- File Uploads to Firebase Storage Demo
- SASS + Bootstrap 4 + FontAwesome

## Usage

Create an account at https://firebase.google.com/

- `git clone https://github.com/codediodeio/angular-firestarter.git firestarter`
- `cd firestarter`
- `npm install`

Create two new files in the `/environments` dir.

#### environment.ts
```typescript
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "APIKEY",
    authDomain: "DEV-APP.firebaseapp.com",
    databaseURL: "https://DEV-APP.firebaseio.com",
    storageBucket: "DEV-APP.appspot.com"
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
