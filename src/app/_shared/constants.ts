/************* GENERALES ************/ 

//URL Backend

export const HOST_BACKEND = `https://ydmsllr0q1.execute-api.us-east-1.amazonaws.com/prod`;
//export const HOST_BACKEND = `http://loadBalancer-MiniEncuesta-T1-421414887.us-east-1.elb.amazonaws.com`;
//export const HOST_BACKEND = `http://34.227.117.128:8081`;
//export const HOST_BACKEND = `http://localhost:8081`;
export const CODIGO_ENCUESTA_DEF = `LP_FAVORIT`;

/************* AWS ***************/

//Cliente ID configurado en cognito
export const CLIENT_ID = "1p27pmvf5olgukq866sg6qfl51";
//URL Cognito configurado
export const DOMAIN_AUTH = `https://mini-encuesta.auth.us-east-1.amazoncognito.com`;
export const URL_LOGOUT_AWS = `${DOMAIN_AUTH}/logout?response_type=token&client_id=${CLIENT_ID}&redirect_uri=`;

export const ESTADO_ACTIVO_db = "A";
export const ESTADO_INACTIVO_db = "I";
export const COD_OK = "ok";
export const COD_ERROR = "error";

export const MODO_NUEVO = "Nuevo";
export const MODO_EDITAR = "Editar";
export const MODO_VER = "Ver";

export const CODE_ROLE_ADMIN = "ROLE_ADMIN";
export const TOKEN_NAME = "token";
export const PARAM_USUARIO = "usuario";
export const PARAM_FLAG_ES_ADMIN = "isAdmin";