import { PrefixsInterface } from "./IPrefix";
import { GendersInterface } from "./IGender";
import { EducationsInterface } from "./IEducation";
import { BloodInterface } from "./IBlood";
import { ReligionInterface } from "./IReligion";
import { NationalityInterface } from "./INationality";
import { OfficersInterface } from "./IOfficer";


export interface Screening_officersInterface {
    ID?: number;//
    FirstNameTH?: string;
    LastNameTH?: string;
    Birthday?: string;
    ScreeningIDCard?: string;
    Phone?: string;
    Email?: string;
    EducationName?: string;
    EducationMajor?: string;
    University?: string;

    Nationality?: NationalityInterface;
    NationalityID?: number;
    Country?: NationalityInterface;
    CountryID?: number;
    Religion?: ReligionInterface;
    ReligionID?: number;
    Blood?: BloodInterface;
    BloodID?: number;     // foreignkey.ID?
    Gender?: GendersInterface;
    GenderID?: number;     // foreignkey.ID?
    Prefix?: PrefixsInterface;
    PrefixID?: number;     // foreignkey.ID
    Education?: EducationsInterface;
    EducationID?: number;

    OfficerID ?:    number;
	Officer ?: OfficersInterface;
   }