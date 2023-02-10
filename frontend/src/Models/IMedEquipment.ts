import { BrandsInterface } from "./IBrand";
import { MedStatusInterface } from "./IMedStatus";

export interface MedicalEquimentInterface {
    ID?: number;

    Equipment?: string;

    Quantity?: number;

    Med_StatusID?: number;
    Med_Status?: MedStatusInterface;

    Shop?: string;

    BrandID?: number;
    Brand?: BrandsInterface;
  }