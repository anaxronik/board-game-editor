import { makeAutoObservable } from "mobx";

export type MapMode = {
  mode: string;
};

export class MapModeStore {
  modes: MapMode[] = [];
  activeMode: null | MapMode = null;

  constructor() {
    this.modes = [{ mode: "editor" }, { mode: "play" }, { mode: "master" }];
    this.setActive(this.modes[0]);
    makeAutoObservable(this);
  }

  setActive = (mode: MapMode) => {
    this.activeMode = mode;
  };
}

export const mapModeStore = new MapModeStore();
