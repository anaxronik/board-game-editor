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

  get yFrameOffset() {
    return this.mapPositionStore.y % this.frameSize;
  }

  get horizontalLines(): number[] {
    const lines: number[] = [];
    const offset: number = this.yFrameOffset;

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

  getCellByCellCoords = (cell: { x: number; y: number }) => {
    const x = this.mapPositionStore.x * -1 + cell.x * this.frameSize;
    const y = this.mapPositionStore.y + cell.y * this.frameSize * -1;
    const offset = this.frameSize;
    return {
      top: y - offset,
      left: x,
      right: x + offset,
      bottom: y,
    };
  };

  getCellByMousePosition = (mousePosition: { x: number; y: number }) => {
    const map = this.mapPositionStore;

    const scale = this.scaleStore.scale;
    const absoluteMousePosition = {
      x: (mousePosition.x + map.x) / scale,
      y: (-mousePosition.y + map.y) / scale,
    };

    const cell = {
      x: Math.floor((absoluteMousePosition.x / this.frameSize) * scale),
      y: Math.floor((absoluteMousePosition.y / this.frameSize) * scale),
    };
    const position = this.getCellByCellCoords(cell);

    return {
      position,
      cell,
    };
  };
}

export const frameStore = new FrameStore(scaleStore, mapPositionStore);
