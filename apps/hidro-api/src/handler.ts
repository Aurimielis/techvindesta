import { APIGatewayProxyEventV2, Handler } from 'aws-lambda'
import { ConfigurationService } from "./services/configuration-service";

const config = ConfigurationService.init();

export const handler: Handler = async (
  event: APIGatewayProxyEventV2,
) => {
  if (!config) {
    return {
      statusCode: 500,
      body: "Failed to initialize configuration service",
    };
  }

  return {
    statusCode: 200,
    body: "Hello World!",
  };
}
