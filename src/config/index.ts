import dotenv from 'dotenv';

dotenv.config();

const config: Config = {
    test: {
        port: process.env.PORT,
        apiKey: process.env.API_KEY,
        stringsMappingParameterName: process.env.STRINGS_MAPPING_PARAMETER_NAME,
        awsRegion: process.env.AWS_REGION,
    },
};

export default config[process.env.ENVIRONMENT as keyof typeof config] || config.test;
