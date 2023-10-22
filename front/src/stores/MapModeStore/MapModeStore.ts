import { makeAutoObservable } from "mobx";

export type MapMode = {
  mode: string;
};

export const MAP_MODES: MapMode[] = [
  { mode: "play" },
  { mode: "editor" },
  { mode: "master" },
];

export class MapModeStore {
  modes: MapMode[] = MAP_MODES;
  activeMode: null | MapMode = null;

  constructor() {
    this.activeMode = MAP_MODES[0];

    makeAutoObservable(this);
  }

  setActive = (mode: MapMode) => {
    this.activeMode = mode;
  };
}

export const mapModeStore = new MapModeStore();
