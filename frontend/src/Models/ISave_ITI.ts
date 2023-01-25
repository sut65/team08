import { TreatmentInterface } from "./ITreatment";
import { BuildingInterface } from "./IBuilding";
import { RoomInterface } from "./IRoom";
import { StateInterface } from "./IState";

export interface Save_ITIsInterface {
    ID?: number;

    TreatmentID?: number;
    Treatment?: TreatmentInterface;

    BuildingID?: number;
    Building?: BuildingInterface;

    RoomID?: number;
    Room?: RoomInterface;

    StateID?: number;
    State?: StateInterface;

    Date_checkin?: Date | null;
	Date_checkout?: Date | null;
}