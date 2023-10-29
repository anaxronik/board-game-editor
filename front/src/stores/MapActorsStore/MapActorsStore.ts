import { makeAutoObservable } from "mobx";
import { FrameStore, frameStore } from "../FrameStore/FrameStore";
import { MapActor, MapActorStore } from "./MapActorStore/MapActorStore";

export class MapActorsStore {
  private _actors: MapActorStore[] = [];
  visibleActor: MapActorStore[] = [];

  constructor(private frameStore: FrameStore) {
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

  addActor = (actor: MapActor) => {
    this._actors.push(new MapActorStore(actor));
  };

  recalculateVisibleActor = () => {
    this.visibleActor = this.actors.filter((i) => {
      const isVisible = this.frameStore.getIsVisibleCell({
        x: i.cellX,
        y: i.cellY,
      });
      console.log({ isVisible });

      return true;
    });
  };
}

export const mapActorsStore = new MapActorsStore(frameStore);
