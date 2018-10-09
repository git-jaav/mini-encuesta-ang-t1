/************* GENERALES ************/ 

//URL Backend
export const HOST_BACKEND = `http://localhost:8081`;
export const CODIGO_ENCUESTA_DEF = `LP_FAVORIT`;

/************* AWS ***************/

//Cliente ID configurado en cognito
export const CLIENT_ID = "1p27pmvf5olgukq866sg6qfl51";
//URL Cognito configurado
export const DOMAIN_AUTH = `https://mini-encuesta.auth.us-east-1.amazoncognito.com`;
export const URL_LOGOUT_AWS = `${DOMAIN_AUTH}/logout?response_type=token&client_id=${CLIENT_ID}&redirect_uri=`;

export const TIME_UPDATE_GEOLOCALIZATION = 60000;
export const RADIO = 0.029;
export const ZOOM = 16;
export const TOKEN_NAME = "token";
export const PARAM_USUARIO = "usuario";