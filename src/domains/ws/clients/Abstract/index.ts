export abstract class AbstractWsClient {
  abstract connect(...args: any): void;
  abstract disconnect(): void;
  abstract send(e: string, payload: any): void;
}
