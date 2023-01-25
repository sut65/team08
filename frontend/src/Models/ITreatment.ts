import { DiseasesInterface } from "./IDisease";
import { DoctorInterface } from "./IDoctor";
import { PatiendsInterface } from "./IPatiend";
import { StatusInterface } from "./IStatus";
import { TrackInterface } from "./ITrack";

export interface TreatmentsInterface {
    ID?: number;
    TREATMENT_ID?: string;
    TREATMENT?: string;
    DATE?: Date | null;
    APPOINTMENT?: string;
    CONCLUSION?: string;
    GUIDANCE?: string;

    Doctor?: DoctorInterface;
    DoctorID?: number;     // foreignkey.ID?

    Status?: StatusInterface; 
    StatusID?: number;     // foreignkey.ID?

    Track?: TrackInterface;
    TrackID?: number; // foreignkey.ID?

    Patiend?: PatiendsInterface;
    PatiendID?: number;  // foreignkey.ID?

    Disease?: DiseasesInterface;
    DiseaseID?: number;  // foreignkey.ID?


}
