import { DepartmentInterface } from "./IDepartment";
import { LevelcureInterface } from "./ILevelcure";
import { Screening_officersInterface } from "./IScreening_officer";
import { TreatmentsInterface } from "./ITreatment";

export interface AppointInterface {
  ID?: number;
  Date_now?: Date | null;
  Date_appoint?: Date | null;
  Text_appoint?: string;

  Screening_officerID?: number;
  Screening_officer?: Screening_officersInterface;

  TreatmentID?: number;
  Treatment?: TreatmentsInterface;

  LevelcureID?: number;
  Levelcure?: LevelcureInterface;

  DepartmentID?: number;
  Department?: DepartmentInterface;
}
