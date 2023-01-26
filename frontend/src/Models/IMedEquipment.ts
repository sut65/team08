import { BrandsInterface } from "./IBrand";
import { MedStatusInterface } from "./IMedStatus";
import { MedEmployeeInterface } from "./IMedEmployee";

export interface MedicalEquimentInterface {
    ID?: number;

    Equipment?: string;

    Quantity?: number;

    Med_StatusID?: number;
    Med_Status?: MedStatusInterface;

    BrandID?: number;
    Brand?: BrandsInterface;

    // Med_EmployeeID?: number;
    // Med_Employee?: MedEmployeeInterface;

  }