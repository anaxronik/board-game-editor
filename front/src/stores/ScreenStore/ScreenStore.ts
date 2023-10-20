import { makeAutoObservable } from "mobx";

export class ScreenStore {
  private _width = 0;
  private _height = 0;

  constructor() {
    this.readSize();
    makeAutoObservable(this);
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get screenStartX() {
    return 0;
  }

  get screenStart0() {
    return 0;
  }

  readSize = () => {
    this._width = window.innerWidth;
    this._height = window.innerHeight;
  };
}

export const screenStore = new ScreenStore();
