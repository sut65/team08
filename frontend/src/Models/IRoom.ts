import { BuildingInterface } from "./IBuilding";

export interface RoomInterface {
    ID?: number,
    Name?: string;

    BuildingID?: number;
    Building?: BuildingInterface;
   }