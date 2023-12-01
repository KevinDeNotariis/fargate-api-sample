import { createLogger, transports, format } from "winston";
// -----------------------------------------------------
// Create Logger
// -----------------------------------------------------
const logger = createLogger({
  transports: [new transports.Console()],
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
});

export default logger;
