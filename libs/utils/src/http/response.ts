import { HttpStatusCode } from "axios";

export function response(
  statusCode: HttpStatusCode,
  body: any,
) {
  return {
    statusCode,
    body,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    }
  }
}
