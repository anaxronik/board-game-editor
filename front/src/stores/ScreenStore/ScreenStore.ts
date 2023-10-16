import { makeAutoObservable } from "mobx";

export class ScreenStore {
  constructor() {
    makeAutoObservable(this);
  }

  get width() {
    return window.innerWidth;
  }

  get height() {
    return window.innerWidth;
  }

  get screenStartX() {
    return 0;
  }

  get screenStart0() {
    return 0;
  }
}

export const screenStore = new ScreenStore();
