import { APIGatewayProxyEventV2, Handler } from 'aws-lambda'
import { ServiceContainer } from "./services/service-container";

const container = ServiceContainer.init();

export const handler: Handler = async (
  event: APIGatewayProxyEventV2,
) => {
  const logger = (await container).loggingService.getLogger();
  logger.info("Container initialise successfully");

  return {
    statusCode: 200,
    body: "Hello World!",
  };
}
