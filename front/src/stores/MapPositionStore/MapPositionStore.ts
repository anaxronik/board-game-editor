import { makeAutoObservable } from "mobx";

export class MapPositionStore {
  x = -100;
  y = 800;
  stepSize = 20;

  isMovable = false;

  constructor() {
    makeAutoObservable(this);
  }

  setIsMovable = (bool: boolean) => {
    this.isMovable = bool;
  };

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

  setPosition = async (newPosition: { x?: number; y?: number }) => {
    if (newPosition.x !== undefined) this.x = newPosition.x;
    if (newPosition.y !== undefined) this.y = newPosition.y;
  };
}

export const mapPositionStore = new MapPositionStore();
