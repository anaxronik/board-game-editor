import { makeAutoObservable } from "mobx";

export class ScaleStore {
  private _scale: number = 1;
  step = 0.1;
  maxScale = 3;
  minScale = 0.3;

  constructor() {
    makeAutoObservable(this);
  }

  reset() {
    this._scale = 1;
  }

  changeScale = (value: number) => {
    if (value > this.maxScale) {
      return (this._scale = this.maxScale);
    }
    if (value < this.minScale) {
      return (this._scale = this.minScale);
    }
    return (this._scale = value);
  };

  stepUp = () => {
    this.changeScale(this.scale + this.step);
  };

  stepDown = () => {
    console.log("stepDown");
    this.changeScale(this.scale - this.step);
  };

  get scale() {
    return parseFloat(Number(this._scale).toFixed(3));
  }
}

export const scaleStore = new ScaleStore();
