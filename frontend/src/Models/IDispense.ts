import { DoctorInterface } from "./IDoctor";
import { DrugInterface } from "./IDrug";
import { PracticeInterface } from "./IPractice";
import { TreatmentsInterface } from "./ITreatment";

export interface DispenseInterface {
  ID?: number;
  Date?: Date | null;
  Text?: string;
  Number?: string;

  DoctorID?: number;
  Doctor?: DoctorInterface;

  TreatmentID?: number;
  Treatment?: TreatmentsInterface;

  DrugID?: number;
  Drug?: DrugInterface;

  PracticeID?: number;
  Practice?: PracticeInterface;
  
}
