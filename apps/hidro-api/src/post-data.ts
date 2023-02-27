import { APIGatewayProxyEventV2, Handler } from 'aws-lambda'
import { ServiceContainer } from "./services/service-container";

/**
 * This one has all the services we'll need
 */
const container = ServiceContainer.init();

export const handler: Handler = async (
  event: APIGatewayProxyEventV2,
) => {
  const logger = (await container).loggingService.getLogger();
  logger.info("Container initialisation successful");

  return {
    statusCode: 200,
    body: "Hello World!",
  };
}
