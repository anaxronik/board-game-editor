import { makeAutoObservable } from "mobx";

export class MapPositionStore {
  x = -50;
  y = 850;
  stepSize = 20;

  constructor() {
    makeAutoObservable(this);
  }

  setX = (value: number) => {
    this.x = value;
  };
  setY = (value: number) => {
    this.y = value;
  };

  stepUp = () => {
    this.setY(this.y + this.stepSize);
  };

  stepDown = () => {
    this.setY(this.y - this.stepSize);
  };

  stepRight = () => {
    this.setX(this.x + this.stepSize);
  };

  stepLeft = () => {
    this.setX(this.x - this.stepSize);
  };

  movePosition = (coords: { x?: number; y?: number }) => {
    if (coords.x !== undefined) {
      this.x = this.x + coords.x;
    }
    if (coords.y !== undefined) {
      this.y = this.y - coords.y;
    }
  };

  setPosition = (coords: { x?: number; y?: number }) => {
    if (coords.x !== undefined) {
      this.x = coords.x;
    }
    if (coords.y !== undefined) {
      this.y = coords.y;
    }
  };
}
export const mapPositionStore = new MapPositionStore();
