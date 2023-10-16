import { makeAutoObservable } from "mobx";

export class MapPageStore {
  constructor() {
    makeAutoObservable(this);
  }
}

export const mapPageStore = new MapPageStore();
