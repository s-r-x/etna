import { TFileObject } from "@/typings/file";
import _ from "lodash";
import { UUID } from "@/utils/uuid";

export class FilesListStore {
  private files: TFileObject[] = [];
  private subscribers: Function[] = [];
  subscribe(handler: Function) {
    this.subscribers.push(handler);
  }
  unsubscribe(handler: Function) {
    const idx = this.subscribers.findIndex((sub) => sub === handler);
    if (idx !== -1) {
      this.subscribers.splice(idx, 1);
    }
  }
  private notify() {
    this.subscribers.forEach((sub) => {
      sub(this.files);
    });
  }
  getFiles() {
    return this.files;
  }
  addFiles = (files: File[]) => {
    this.files = this.files.concat(
      files.map((file) => ({
        id: UUID.gen(),
        file,
      }))
    );
    this.notify();
  };
  removeFile = (id: string) => {
    this.files = this.files.filter((file) => file.id !== id);
    this.notify();
  };
}

export default new FilesListStore();
