import { DocPrefixInterface } from "./IDocPrefix";
import { GendersInterface } from "./IGender";
import { BloodInterface } from "./IBlood";
import { MaritalInterface } from "./IMarital";
import { ReligionInterface } from "./IReligion";
import { NationalityInterface } from "./INationality";
import { AddressThailandInterface } from "./IAddressThailand";
import { EducationsInterface } from "./IEducation";

export interface DoctorInterface {
    DocterCode?:   string,
	DocterIDCar?: string,
	DocPrefixID?:	number,
	FirstNameTH?:  string,
	LastNameTH?:   string,
	FirstNameEN?:  string,

	LastNameEN?: string,
	GenderID?:	number,
	BloodID?:		number,
	MaritalID?:	number,
	Birthday?:   Date | null,
	ReligionID?:	number,
	ReOther?:    string,
	NationalityID?:	number,
	CountryID?:		number,
	TelPhone?:   string,
	TelOffice?:  string,

	Email?:       string,
	AllAddress?:  string,
	Subdistrict?: string,
	District?:    string,
	Province?:    string,
	AddressID?:	number,

	FaIDCard?:     string,
	DocFaPrefixID?:	number,
	FaFirstName?:  string,
	FaLastName?:   string,
	FaOccupation?: string,
	MoIDCard?:     string,
	DocMoPrefixID?:	number,

	MoFirstName?:  string,
	MoLastName?:   string,
	MoOccupation?: string,
	WiIDCard?:     string,
	DocWiPrefixID?:	number,
	WiFirstName?:  string,

	WiLastName?:     string,
	WiOccupation?:   string,
	WiPhone?:        string,
	EducationID?:	number,
	EducationName?:  string,
	EducationMajor?: string,

	University?:     string,
	DocPassword?:	   string,

	StartEducation?: Date | null,
	EndEducation?:   Date | null,

    Gender?: GendersInterface,
    Blood?: BloodInterface,
    Marital?: MaritalInterface,
    Religion?: ReligionInterface,
    Nationality?: NationalityInterface,
    Country?: NationalityInterface,
    Address?: AddressThailandInterface,
    DocPrefix?: DocPrefixInterface,
    Education?: EducationsInterface,

}