import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';

import logger from './utils/logger';
import routes from './routes';
import { handleError, errorLogging } from './utils/errorHandlers/middlewares';
import { routeLogger } from './utils/routeLogger';
import config from './config';

const app: Express = express();

// ------------------------------------------------------------------------------–
// Useful HTTP headers
// ------------------------------------------------------------------------------–
app.use(helmet());

// ------------------------------------------------------------------------------–
// Parse requests in the correct format
// ------------------------------------------------------------------------------–
app.use(express.json({ type: '*/*' }));
app.use(express.urlencoded({ extended: true }));

// ------------------------------------------------------------------------------–
// Logging Route Requests
// ------------------------------------------------------------------------------–
app.use(routeLogger);

// ------------------------------------------------------------------------------–
// Routes
// ------------------------------------------------------------------------------–
app.get('/status/health', (req: Request, res: Response) => {
    return res.status(200).json({ message: 'UP' });
});
app.use('/', routes);

// ------------------------------------------------------------------------------–
// Error handling Routes
// ------------------------------------------------------------------------------–
app.use(errorLogging);
app.use(handleError);

app.listen(config.port, () => {
    logger.info(`Server is running at https://localhost:${config.port}`);
});

export default app;
