import { RoomInterface } from "./IRoom";
import { Save_ITIsInterface } from "./ISave_ITI";
import { DoctorInterface } from "./IDoctor";

export interface Operating_RoomsInterface {
    ID?: number;
    DoctorID?: number;
    Doctor?: DoctorInterface;

    Save_ITIID?: number
    Save_ITI?: Save_ITIsInterface;

    RoomID?: number;
    Room?: RoomInterface;

    Datetime?: Date | null;
}