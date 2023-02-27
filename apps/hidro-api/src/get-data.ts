import { APIGatewayProxyEventV2, Context, Handler, Callback, APIGatewayProxyResultV2 } from "aws-lambda";
import { ServiceContainer } from "./services/service-container";

/**
 * This one has all the services we'll need
 */
const container = ServiceContainer.init();

export const handler: Handler = async (
  event: APIGatewayProxyEventV2,
  context: Context,
): Promise<APIGatewayProxyResultV2> => {
  context.callbackWaitsForEmptyEventLoop = false;

  const logger = (await container).loggingService.getLogger();
  logger.info("Container initialisation successful");

  const { name } = event.pathParameters;

  return await (await container).databaseService.getData(name);
}
