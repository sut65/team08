import { LabNameInterface } from "./ILabName";
import { TreatmentsInterface } from "./ITreatment";
import { MedEmployeeInterface } from "./IMedEmployee";
import { DoctorInterface } from "./IDoctor";

export interface LabInterface {
  ID?: number;
  Lab_test?: string;
  Value?: string;

  LabNameID?: string;
  TreatmentID?: string;
  Med_EmployeeID?: string;
  DoctorID?: string;

  Lab_Name?: LabNameInterface;
  Treatment?: TreatmentsInterface;
  Med_Employee?: MedEmployeeInterface;
  Doctor?: DoctorInterface;
}
