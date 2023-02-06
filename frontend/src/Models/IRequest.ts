import { MedicalEquimentInterface } from "./IMedEquipment";
import { MedEmployeeInterface } from "./IMedEmployee";
import { LocationInterface } from "./ILocation";

export interface RequestInterface {
   
    ID?: number;
    R_ID?: string;
    R_NAME?: string;
    QUANTITY?: string;
    TIME?: Date | null;
	
    MedEmployee?: MedEmployeeInterface;
    MedEmployeeID?: number;     // foreignkey.ID?

    Location?: LocationInterface; 
    LocationID?: number;     // foreignkey.ID?

    MedEquipment?: MedicalEquimentInterface;
    MedEquipmentID?: number; // foreignkey.ID?
}
