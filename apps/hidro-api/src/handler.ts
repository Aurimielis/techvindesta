import { APIGatewayProxyEventV2, Handler } from 'aws-lambda'
import { ConfigurationService } from "./services/configuration-service";

const config = ConfigurationService.getService();

export const handler: Handler = async (
  event: APIGatewayProxyEventV2,
) => {
  return {
    statusCode: 200,
    body: "Hello World!",
  };
}
