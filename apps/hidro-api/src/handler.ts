import { APIGatewayProxyEventV2, Handler } from 'aws-lambda'
import { ConfigurationService } from "./services/configuration-service";

const config = new ConfigurationService();

export const handler: Handler = async (
  event: APIGatewayProxyEventV2,
) => {
  return {
    statusCode: 200,
    body: "Hello World!",
  };
}
