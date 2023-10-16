import { makeAutoObservable } from "mobx";
import {
  MapPositionStore,
  mapPositionStore,
} from "../MapPositionStore/MapPositionStore";
import { ScaleStore, scaleStore } from "../ScaleStore/ScaleStore";
import { screenStore } from "../ScreenStore/ScreenStore";

export class FrameStore {
  private _frameSize = 100;

  constructor(
    private scaleStore: ScaleStore,
    private mapPositionStore: MapPositionStore
  ) {
    makeAutoObservable(this);
  }

  get frameSize() {
    return this._frameSize * this.scaleStore.scale;
  }

  get horizontalLines(): number[] {
    const lines: number[] = [];
    const offset: number = this.mapPositionStore.y % this.frameSize;

    const linesCount = Math.floor(screenStore.height / this.frameSize) + 2;
    for (let index = 0; index < linesCount; index++) {
      lines.push(index * this.frameSize + offset);
    }
    return lines;
  }

  get verticalLines(): number[] {
    const lines: number[] = [];
    const offset: number = this.mapPositionStore.x % this.frameSize;

    const linesCount = Math.floor(screenStore.width / this.frameSize) + 2;
    for (let index = 0; index < linesCount; index++) {
      lines.push(index * this.frameSize - offset);
    }
    return lines;
  }
}

export const frameStore = new FrameStore(scaleStore, mapPositionStore);
