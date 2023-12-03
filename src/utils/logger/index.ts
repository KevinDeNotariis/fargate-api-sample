import { createLogger, transports, format } from 'winston';
// -----------------------------------------------------
// Create Logger
// -----------------------------------------------------
const logger = createLogger({
    transports: [new transports.Console()],
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),
});

if (process.env.NODE_ENV !== 'production') {
    logger.format = format.combine(format.colorize(), logger.format);
}

export default logger;
