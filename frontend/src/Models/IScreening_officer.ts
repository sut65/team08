import { PrefixsInterface } from "./IPrefix";
import { GendersInterface } from "./IGender";
import { EducationsInterface } from "./IEducation";

export interface Screening_officersInterface {
    ID?: number;
    Name?: string;
    Age?: number;
    Phone?: string;
    Email?: string;
    Password?: string;

    Gender?: GendersInterface;
    GenderID?: number;     // foreignkey.ID?
    Prefix?: PrefixsInterface;
    PrefixID?: number;     // foreignkey.ID
    Education?: EducationsInterface;
    EducationID?: number;
   }