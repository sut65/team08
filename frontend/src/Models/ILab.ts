import { LabNameInterface } from "./ILabName";
import { TreatmentsInterface } from "./ITreatment";
import { MedEmployeeInterface } from "./IMedEmployee";
import { DoctorInterface } from "./IDoctor";

export interface LabInterface {
  ID?: number;
  Lab_test?: string;
  Value?: string;

  LabNameID?: number;
  TreatmentID?: number;
  Med_EmployeeID?: number;
  DoctorID?: number;

  Lab_Name?: LabNameInterface;
  Treatment?: TreatmentsInterface;
  Med_Employee?: MedEmployeeInterface;
  Doctor?: DoctorInterface;
}
