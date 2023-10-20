import { makeAutoObservable } from "mobx";
import { ScreenStore, screenStore } from "../ScreenStore/ScreenStore";

export class MapPageStore {
  constructor(private screenStore: ScreenStore) {
    makeAutoObservable(this);
  }

  init = () => {
    addEventListener("resize", this.sizeListener);
  };

  destroy = () => {
    removeEventListener("resize", this.sizeListener);
  };

  sizeListener = () => {
    this.screenStore.readSize();
  };
}

export const mapPageStore = new MapPageStore(screenStore);
