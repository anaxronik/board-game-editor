import { makeAutoObservable } from "mobx";
import { MapActor, MapActorStore } from "./MapActorStore/MapActorStore";

export class MapActorsStore {
  private _actors: MapActorStore[] = [];

  constructor() {
    const actors: MapActor[] = [
      { cellX: 0, cellY: 0, isClickable: true },
      { cellX: 3, cellY: 0 },
      { cellX: 0, cellY: 3 },
    ];

    this._actors = actors.map((i) => new MapActorStore(i));

    makeAutoObservable(this);
  }

  get actors() {
    return this._actors;
  }
}

export const mapActorsStore = new MapActorsStore();
