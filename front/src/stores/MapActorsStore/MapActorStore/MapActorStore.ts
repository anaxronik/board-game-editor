import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from "uuid";

export type MapActor = {
  x: number;
  y: number;
  id?: string;
  isClickable?: boolean;
};

export class MapActorStore {
  x: number;
  y: number;
  id: string;
  isClickable: boolean;

  isMoving = false;

  constructor(init: MapActor) {
    this.x = init.x || 0;
    this.y = init.y || 0;
    this.id = init.id || uuidv4();
    this.isClickable = init.isClickable || false;

    makeAutoObservable(this);
  }

  toggleIsMoving = () => {
    this.isMoving = !this.isMoving;
  };
}
