// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
  // API_PATH: 'https://localhost:44308/api/',
  // TOKEN_PATH: 'https://localhost:44308/Token',
  API_PATH: 'https://learningsystemimport.azurewebsites.net/',
  TOKEN_PATH: 'https://learningsystemimport.azurewebsites.net/Token',
  AUTH_TOKEN_KEY: 'authToken',
  AUTH_USER_KEY: 'authUser',
  ARVORE_TOKEN: 'y2fi+2OljJdiVojeFTHktxJFFEezx/Qd7xu2A1csBTCKh2oLEtwq10CJuRdiiMLt',
  ARVORE_END_POINT: 'https://livros.arvore.com.br/direct-login-generic'
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
