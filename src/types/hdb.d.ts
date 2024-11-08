declare module 'hdb' {
    export interface HanaClientConfig {
        host: string;
        port: number;
        user: string;
        password: string;
    }

    export interface HanaClient {
        connect(callback: (err: Error | null) => void): void;
        disconnect(): void;
        createClient(config: HanaClientConfig): HanaClient;
    }

    const client: { createClient(config: HanaClientConfig): HanaClient };
    export default client;
} 