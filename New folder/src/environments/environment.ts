// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyBuGQ8clNM6Ye4-gXtgXGteJR3htAB9VXI',
    authDomain: 'airbnb-b4053.firebaseapp.com',
    databaseURL: 'https://airbnb-b4053-default-rtdb.firebaseio.com',
    projectId: 'airbnb-b4053',
    storageBucket: 'airbnb-b4053.appspot.com',
    messagingSenderId: '880654136086',
    appId: '1:880654136086:web:d95268cc7b4a8392729637',
    measurementId: 'G-7RBQXBLGFJ',
  },
  apiURL: {
    baseUrl: 'http://airbnb-dev.us-east-1.elasticbeanstalk.com/api',
    categories: 'Category',
    hotel: 'Hotel',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
