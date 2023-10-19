import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from "uuid";

export type MapActor = {
  cellX: number;
  cellY: number;
  id?: string;
  isClickable?: boolean;
};

export class MapActorStore {
  cellX: number;
  cellY: number;
  id: string;
  isClickable: boolean;

  isMoving = false;

  constructor(init: MapActor) {
    this.cellX = init.cellX || 0;
    this.cellY = init.cellY || 0;
    this.id = init.id || uuidv4();
    this.isClickable = init.isClickable || false;

    makeAutoObservable(this);
  }

  toggleIsMoving = () => {
    this.isMoving = !this.isMoving;
  };
}
