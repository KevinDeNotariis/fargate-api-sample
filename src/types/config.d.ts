interface Config {
    test: EnvConfig;
    acceptance?: EnvConfig;
    production?: EnvConfig;
}

interface EnvConfig {
    port: number;
    apiKey: string;
    stringsMappingParameterName: string;
    awsRegion: string;
}
