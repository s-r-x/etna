import { INotifySagaDto } from "../../typings/dto";
import { eventChannel } from "redux-saga";
import { UUID } from "@/utils/uuid";

export abstract class AbstractWsClient {
  abstract connect(...args: any): void;
  abstract disconnect(): void;
  abstract send(e: string, payload: any): void;

  private sagaEmitter: (input: INotifySagaDto) => void;
  public injectSagaEmitter = (
    emitter: (input: INotifySagaDto) => void
  ): void => {
    this.sagaEmitter = emitter;
  };
  protected log = (payload: Omit<INotifySagaDto, "date" | "id">) => {
    if (this.sagaEmitter) {
      this.sagaEmitter({
        id: UUID.gen(),
        ...payload,
        date: new Date().toISOString(),
      });
    }
  };
  public creataSagaChannel = () => {
    return eventChannel<INotifySagaDto>((emit) => {
      this.injectSagaEmitter(emit);
      return () => {
        this.disconnect();
        console.log("unsubscribe from channel");
      };
    });
  };
}
