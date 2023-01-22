import { PrefixsInterface } from "./IPrefix";
import { GendersInterface } from "./IGender";
import { PolicingsInterface } from "./IPolicing";

export interface PatiendsInterface {
    ID?: number;
    Name?: string;
    Age?: number;
    Phone?: string;
    Adress?: string;
    Date_of_birth?: string;
    ID_card?: string;

    Gender?: GendersInterface;
    GenderID?: number;     // foreignkey.ID?
    Prefix?: PrefixsInterface;
    PrefixID?: number;     // foreignkey.ID?
    Policing?: PolicingsInterface;
    PolicingID?: number;   // foreignkey.ID?
   }