declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number;
            API_KEY: string;
            STRINGS_MAPPING_PARAMETER_NAME: string;
            AWS_REGION: string;
        }
    }
}

export {};
