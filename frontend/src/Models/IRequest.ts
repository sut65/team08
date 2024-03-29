import { MedicalEquimentInterface } from "./IMedEquipment";
import { MedEmployeeInterface } from "./IMedEmployee";
import { LocationInterface } from "./ILocation";

export interface RequestInterface {
   
    ID?: number;
    R_ID?: string;
    R_NAME?: string;
    QUANTITY?: number;
    TIME?: Date | null;
	
    Med_Employee?: MedEmployeeInterface;
    Med_EmployeeID?: number;     // foreignkey.ID?

    Location?: LocationInterface; 
    LocationID?: number;     // foreignkey.ID?

    Med_Equipment?: MedicalEquimentInterface;
    Med_EquipmentID?: number; // foreignkey.ID?
}