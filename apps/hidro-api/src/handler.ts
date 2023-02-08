import { APIGatewayProxyEventV2, Handler } from 'aws-lambda'

export const handler: Handler = async (
  event: APIGatewayProxyEventV2,
) => {
  return {
    statusCode: 200,
    body: "Hello World!",
  };
}
