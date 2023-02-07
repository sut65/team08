import { PrefixsInterface } from "./IPrefix";
import { GendersInterface } from "./IGender";
import { BloodInterface } from "./IBlood";
import { ReligionInterface } from "./IReligion";
import { NationalityInterface } from "./INationality";
import { AddressThailandInterface } from "./IAddressThailand";
import { Screening_officersInterface } from "./IScreening_officer";

export interface PatientsInterface {
    ID?: number;
    Patient_Name?: string;
    Age?: number;
    Birthday?: string;
    IDCard?: string;
    Phone?: string;
    House_ID?: string;
        
    Address?: AddressThailandInterface;
    AddressID?: number;
    Nationality?: NationalityInterface;
    NationalityID?: number;
    Religion?: ReligionInterface;
    ReligionID?: number;
    Blood?: BloodInterface;
    BloodID?: number;
    Gender?: GendersInterface;
    GenderID?: number;     // foreignkey.ID?
    Prefix?: PrefixsInterface;
    PrefixID?: number;     // foreignkey.ID?
    Screening_officer?: Screening_officersInterface;
    Screening_officerID?: number;

   }