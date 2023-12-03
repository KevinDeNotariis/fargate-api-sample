import { NextFunction, Request, Response } from 'express';
import { SSM } from '@aws-sdk/client-ssm';
import config from '../config';
import logger from '../utils/logger';

const ssm = new SSM({ region: config.awsRegion });

const caseInsensitiveReplace = (text: string, pattern: string, replacement: string): string => {
    const regexPattern = new RegExp(`\\b${pattern}\\b`, 'gi'); // 'gi' flag for global and case-insensitive matching

    const replacedText = text.replace(regexPattern, replacement);

    return replacedText;
};

export const stringReplace = async (req: Request, res: Response, next: NextFunction) => {
    try {
        logger.debug(req.body);

        const stringsMappingstring = (
            await ssm.getParameter({
                Name: config.stringsMappingParameterName,
            })
        ).Parameter?.Value;

        if (!stringsMappingstring) {
            return res.status(404).json({ message: 'parameter not found' });
        }

        const stringsMapping: Map<string, string> = JSON.parse(stringsMappingstring);
        const content = req.body.content;

        let polished = content;
        for (const [key, value] of Object.entries(stringsMapping)) {
            logger.info(`Processing: ${key} -> ${value}`);
            polished = caseInsensitiveReplace(polished, key, value);
        }

        return res.status(200).json({
            message: polished,
        });
    } catch (err) {
        next(err);
    }
};
