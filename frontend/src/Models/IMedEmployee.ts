import { EducationsInterface } from "./IEducation";
import { GendersInterface } from "./IGender";
import { OfficersInterface } from "./IOfficer";
import { PrefixsInterface } from "./IPrefix";

export interface MedEmployeeInterface {
  ID?: number;
  Name?: string;
  Age?: number;
  Phone?: string;
  University?: string;
	EducationName?:  string;
	EducationMajor?: string;
  Email?: string;
  Password?: string;

  Gender?: GendersInterface;
  GenderID?: number;     // foreignkey.ID?
  Prefix?: PrefixsInterface;
  PrefixID?: number;     // foreignkey.ID
  Education?: EducationsInterface;
  EducationID?: number;

  OfficerID ?:    number;
	Officer ?: OfficersInterface;
  }