import { makeAutoObservable } from "mobx";
import { MapActor, MapActorStore } from "./MapActorStore/MapActorStore";

export class MapActorsStore {
  private _actors: MapActorStore[] = [];

  constructor() {
    const actors: MapActor[] = [
      { x: 1, y: 1, isClickable: true },
      { x: 3, y: 1 },
      { x: 5, y: 1 },
      { x: 1, y: 3 },
      { x: 3, y: 3 },
      { x: 5, y: 3 },
      { x: 1, y: 5 },
      { x: 3, y: 5 },
      { x: 5, y: 5 },
    ];

    this._actors = actors.map((i) => new MapActorStore(i));

    makeAutoObservable(this);
  }

  get actors() {
    return this._actors;
  }
}

export const mapActorsStore = new MapActorsStore();
