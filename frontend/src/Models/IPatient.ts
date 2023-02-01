import { PrefixsInterface } from "./IPrefix";
import { GendersInterface } from "./IGender";
import { PolicingsInterface } from "./IPolicing";
import { BloodInterface } from "./IBlood";
import { ReligionInterface } from "./IReligion";
import { NationalityInterface } from "./INationality";
import { AddressThailandInterface } from "./IAddressThailand";

export interface PatientsInterface {
    ID?: number;

    FirstNameTH?: string;
    LastNameTH?: string;
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
    Policing?: PolicingsInterface;
    PolicingID?: number;   // foreignkey.ID?
   }