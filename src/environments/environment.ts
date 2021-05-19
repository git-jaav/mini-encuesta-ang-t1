// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};


export const api = {

  domain_api: "http://localhost:8088/api/business/miniencuesta/v1/"
  //domain_api: "http://loadbalancer-me-v1-125389634.us-east-1.elb.amazonaws.com/api/business/miniencuesta/v1/"
  //domain_api: "https://wfjy05poxe.execute-api.us-east-1.amazonaws.com/dev/api/business/miniencuesta/v1/"
  
}



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
