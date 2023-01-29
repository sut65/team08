package entity

import (
	"time"

	"gorm.io/gorm"
)

type Gender struct {
	gorm.Model
	Description string

	Patiend           []Patiend           `gorm:"foreignKey:GenderID"`
	Screening_officer []Screening_officer `gorm:"foreignKey:GenderID"`
	Doctor            []Doctor            `gorm:"foreignKey:GenderID"`
	Med_Employee      []Med_Employee      `gorm:"foreignKey:GenderID"`
}

type GeneralPrefix struct {
	gorm.Model
	Description string

	Patiend           []Patiend           `gorm:"foreignKey:GeneralPrefixID"`
	Screening_officer []Screening_officer `gorm:"foreignKey:GeneralPrefixID"`
	Med_Employee      []Med_Employee      `gorm:"foreignKey:GeneralPrefixID"`
}

type Education struct {
	gorm.Model
	Description string

	Screening_officer []Screening_officer `gorm:"foreignKey:EducationID"`
	Doctor            []Doctor            `gorm:"foreignKey:EducationID"`
	Med_Employee      []Med_Employee      `gorm:"foreignKey:EducationID"`
}

type Screening_officer struct {
	gorm.Model

	//หน้าต่างข้อมูลส่วนตัวเจ้่าหน้าที่ฝ่ายคัดกรอง
	GeneralPrefixID *uint
	FirstNameTH     string
	LastNameTH      string
	FirstNameEN     string
	LastNameEN      string

	GenderID   *uint
	BloodID    *uint
	ReligionID *uint
	Birthday   time.Time

	NationalityID   *uint
	CountryID       *uint
	ScreeningIDCard string `gorm:"uniqueIndex"`

	//หน้าต่างข้อมูลการติดต่อส่วนตัว
	Phone       string
	Email       string
	House_ID    string
	Subdistrict string
	District    string
	Province    string
	AddressID   *uint
	//หน้าต่างข้อมูลการศึกษา
	EducationID    *uint
	EducationName  string
	EducationMajor string
	University     string
	//foreignKey
	Address       AddressThailand `gorm:"references:id"`
	Country       Nationality     `gorm:"references:id"`
	Nationality   Nationality     `gorm:"references:id"`
	Religion      Religion        `gorm:"references:id"`
	Gender        Gender          `gorm:"references:id"`
	GeneralPrefix GeneralPrefix   `gorm:"references:id"`
	Education     Education       `gorm:"references:id"`
	Blood         Blood           `gorm:"references:id"`

	Appoint []Appoint `gorm:"foreignkey:Screening_officerID"`
}

type Policing struct {
	gorm.Model
	Description string

	Patiend []Patiend `gorm:"foreignKey:PolicingID"`
}

type Patiend struct {
	gorm.Model
	//หน้าต่างข้อมูลส่วนตัวของคนไข้
	GeneralPrefixID *uint
	FirstNameTH     string
	LastNameTH      string
	FirstNameEN     string
	LastNameEN      string

	GenderID   *uint
	BloodID    *uint
	ReligionID *uint
	Birthday   time.Time

	NationalityID   *uint
	CountryID       *uint
	ScreeningIDCard string `gorm:"uniqueIndex"`

	//หน้าต่างข้อมูลการติดต่อส่วนตัว
	Phone       string
	House_ID    string
	Subdistrict string
	District    string
	Province    string
	AddressID   *uint

	//หน้าต่างญาติผู้ป่วย
	relative_GeneralPrefixID *uint
	relative_FirstName       string
	relative_LastName        string
	relative_Occupation      string
	relative_Phone           string

	//สถานะต่างๆขอผู้ป่วย
	PolicingID *uint
	DiseaseID  *uint
	StatusID   *uint
	TrackID    *uint

	//foreignKey
	Address       AddressThailand `gorm:"references:id"`
	Country       Nationality     `gorm:"references:id"`
	Nationality   Nationality     `gorm:"references:id"`
	Religion      Religion        `gorm:"references:id"`
	Blood         Blood           `gorm:"references:id"`
	Gender        Gender          `gorm:"references:id"`
	GeneralPrefix GeneralPrefix   `gorm:"references:id"`
	Policing      Policing        `gorm:"references:id"`
	Disease       Disease         `gorm:"references:id"`
	Status        Status          `gorm:"references:id"`
	Track         Track           `gorm:"references:id"`
}

type Blood struct {
	gorm.Model
	Phenotype string
	Genotype  string

	Doctor            []Doctor            `gorm:"foreignKey:BloodID"`
	Screening_officer []Screening_officer `gorm:"foreignKey:BloodID"`
	Patiend           []Patiend           `gorm:"foreignKey:BloodID"`
}

type Nationality struct {
	gorm.Model
	NationalityType string
	Country         string

	Doctor            []Doctor            `gorm:"foreignKey:NationalityID"`
	Screening_officer []Screening_officer `gorm:"foreignKey:NationalityID"`
	Patiend           []Patiend           `gorm:"foreignKey:NationalityID"`
}

type AddressThailand struct {
	gorm.Model
	Province    string
	District    string
	Subdistrict string
	Zipcode     string

	Doctor            []Doctor            `gorm:"foreignKey:AddressID"`
	Screening_officer []Screening_officer `gorm:"foreignKey:AddressID"`
	Patiend           []Patiend           `gorm:"foreignKey:AddressID"`
}

type Marital struct {
	gorm.Model
	MaritalStatus string

	Doctor []Doctor `gorm:"foreignKey:MaritalID"`
}

type Religion struct {
	gorm.Model
	ReligionType string

	Doctor            []Doctor            `gorm:"foreignKey:ReligionID"`
	Screening_officer []Screening_officer `gorm:"foreignKey:ReligionID"`
	Patiend           []Patiend           `gorm:"foreignKey:ReligionID"`
}

type DocPrefix struct {
	gorm.Model
	PrefixNameTH string
	PrefixNameEN string
	PreInitialTH string
	PreInitialEN string

	Doctor []Doctor `gorm:"foreignKey:DocPrefixID"`
}

type Doctor struct {
	gorm.Model
	DocterCode   string
	DocterIDCard string
	DocPrefixID  *uint
	FirstNameTH  string
	LastNameTH   string
	FirstNameEN  string

	LastNameEN    string
	GenderID      *uint
	BloodID       *uint
	MaritalID     *uint
	Birthday      time.Time
	ReligionID    *uint
	ReOther       string
	NationalityID *uint
	CountryID     *uint
	TelPhone      string
	TelOffice     string

	Email       string
	AllAddress  string
	Subdistrict string
	District    string
	Province    string
	AddressID   *uint

	FaIDCard      string
	DocFaPrefixID *uint
	FaFirstName   string
	FaLastName    string
	FaOccupation  string
	MoIDCard      string
	DocMoPrefixID *uint

	MoFirstName   string
	MoLastName    string
	MoOccupation  string
	WiIDCard      string
	DocWiPrefixID *uint
	WiFirstName   string

	WiLastName     string
	WiOccupation   string
	WiPhone        string
	EducationID    *uint
	EducationName  string
	EducationMajor string

	University  string
	DocPassword string

	StartEducation time.Time
	EndEducation   time.Time

	DocPrefix DocPrefix       `gorm:"references:id"`
	Gender    Gender          `gorm:"references:id"`
	Blood     Blood           `gorm:"references:id"`
	Marital   Marital         `gorm:"references:id"`
	Religion  Religion        `gorm:"references:id"`
	Address   AddressThailand `gorm:"references:id"`
	Education Education       `gorm:"references:id"`

	Nationality Nationality `gorm:"references:id"`
	Country     Nationality `gorm:"references:id"`

	DocFaPrefix DocPrefix `gorm:"references:id"`
	DocMoPrefix DocPrefix `gorm:"references:id"`
	DocWiPrefix DocPrefix `gorm:"references:id"`
	//Gg
	Treatments []Treatment `gorm:"foreignKey:DoctorID"`

	//Aern
	Dispense []Dispense `gorm:"foreignkey:DoctorID"`
}

// ระบบข้อมูลการรักษา ของกริม
// โรค Disease
type Disease struct {
	gorm.Model
	Name string `gorm:"uniqueIndex"`
	//1 โรค มีผู้ป่วยหลายคน
	Patiends []Patiend `gorm:"foreignKey:DiseaseID"`
}

// สถานะการรักษา Status
type Status struct {
	gorm.Model
	Name string `gorm:"uniqueIndex"`
	//1 สถานะ มีผู้ป่วยหลายคน
	Patiends []Patiend `gorm:"foreignKey:StatusID"`
}

// สถานะติดตามผล Status
type Track struct {
	gorm.Model
	Name string `gorm:"uniqueIndex"`
	//1 สถานะติดตามผล มีผู้ป่วยหลายคน
	Patiends []Patiend `gorm:"foreignKey:TrackID"`
}

// การรักษา
type Treatment struct {
	gorm.Model
	TREATMENT_ID string
	TREATMENT    string
	DATE         time.Time
	APPOINTMENT  string
	CONCLUSION   string
	GUIDANCE     string

	DoctorID *uint
	Doctor   Doctor `gorm:"references:id"`

	StatusID *uint
	Status   Status `gorm:"references:id"`

	TrackID *uint
	Track   Track `gorm:"references:id"`

	PatiendID *uint
	Patiend   Patiend `gorm:"references:id"`

	DiseaseID *uint
	Disease   Disease `gorm:"references:id"`

	Save_ITI *Save_ITI `gorm:"foreignkey:TreatmentID"`

	//Aern
	Dispense []Dispense `gorm:"foreignkey:TreatmentID"`
	Appoint  []Appoint  `gorm:"foreignkey:TreatmentID"`
}

// J
type Building struct {
	gorm.Model
	Name           string           `gorm:"uniqueIndex"`
	Save_ITI       []Save_ITI       `gorm:"foreignKey:BuildingID"`
	Operating_Room []Operating_Room `gorm:"foreignKey:RoomID"`
}

type Room struct {
	gorm.Model
	Name           string           `gorm:"uniqueIndex"`
	Save_ITI       []Save_ITI       `gorm:"foreignKey:RoomID"`
	Operating_Room []Operating_Room `gorm:"foreignKey:RoomID"`
}

type State struct {
	gorm.Model
	Name          string     `gorm:"uniqueIndex"`
	Save_Save_ITI []Save_ITI `gorm:"foreignKey:StateID"`
}

type Save_ITI struct {
	gorm.Model
	Date_checkin  time.Time
	Date_checkout time.Time

	Treatment   Treatment `gorm:"references:id"`
	TreatmentID *uint
	Building    Building `gorm:"references:id"`
	BuildingID  *uint
	Room        Room `gorm:"references:id"`
	RoomID      *uint
	State       State `gorm:"references:id"`
	StateID     *uint

	Operating_Room *Operating_Room `gorm:"foreignkey:Save_ITIID"`
}

type Operating_Room struct {
	gorm.Model
	Datetime time.Time

	Save_ITI   Save_ITI `gorm:"references:id"`
	Save_ITIID *uint
	Building   Building `gorm:"references:id"`
	BuildingID *uint
	Room       Room `gorm:"references:id"`
	RoomID     *uint
}

// Aern
type Drug struct {
	gorm.Model
	Name string

	Dispense []Dispense `gorm:"foreignkey:DrugID"`
}

type Practice struct {
	gorm.Model

	Name     string
	Dispense []Dispense `gorm:"foreignkey:PracticeID"`
}

type Dispense struct {
	gorm.Model
	Date time.Time

	Number      string
	Text        string
	DoctorID    *uint
	TreatmentID *uint
	DrugID      *uint
	PracticeID  *uint

	Doctor    Doctor    `gorm:"references:id"`
	Treatment Treatment `gorm:"references:id"`
	Drug      Drug      `gorm:"references:id"`
	Practice  Practice  `gorm:"references:id"`
}

type Levelcure struct {
	gorm.Model

	Name    string
	Appoint []Appoint `gorm:"foreignkey:LevelcureID"`
}

type Department struct {
	gorm.Model

	Name    string
	Appoint []Appoint `gorm:"foreignkey:DepartmentID"`
}
type Appoint struct {
	gorm.Model
	Date_now     time.Time
	Date_appoint time.Time
	Text_appoint string

	Screening_officerID *uint
	TreatmentID         *uint
	LevelcureID         *uint
	DepartmentID        *uint

	Screening_officer Screening_officer `gorm:"references:id"`
	Treatment         Treatment         `gorm:"references:id"`
	Levelcure         Levelcure         `gorm:"references:id"`
	Department        Department        `gorm:"references:id"`
}

// Leo
// ADD
type Med_Employee struct {
	gorm.Model
	Name     string
	Age      uint
	Phone    string
	Email    string
	Password string

	GenderID        *uint
	GeneralPrefixID *uint
	EducationID     *uint
	Gender          Gender          `gorm:"references:id"`
	GeneralPrefix   GeneralPrefix   `gorm:"references:id"`
	Education       Education       `gorm:"references:id"`
	Med_Equipment   []Med_Equipment `gorm:"foreignKey:Med_EmployeeID"`
}
type Brand struct {
	gorm.Model
	Brand_name    string
	Med_Equipment []Med_Equipment `gorm:"foreignKey:BrandID"`
}

// ข้อมูลสถานะของอุปกรณ์
type Med_Status struct {
	gorm.Model
	Status_name   string
	Med_Equipment []Med_Equipment `gorm:"foreignKey:Med_StatusID"`
}

// ข้อมูลอุปกรณ์ *****************
type Med_Equipment struct {
	gorm.Model
	Equipment      string
	Quantity       uint
	BrandID        *uint
	Brand          Brand `gorm:"references:id"`
	Med_StatusID   *uint
	Med_Status     Med_Status `gorm:"references:id"`
	Med_EmployeeID *uint
	Med_Employee   Med_Employee `gorm:"references:id"`
}

// Gg
// สถานที่
type Location struct {
	gorm.Model
	Name string `gorm:"uniqueIndex"`
	//1 สถสนที่ มีหลายการเบิก
	Requests []Request `gorm:"foreignKey:LocationID"`
}

// ตารางหลัก การเบิก
type Request struct {
	gorm.Model
	R_ID     string
	R_NAME   string
	QUANTITY string //int
	TIME     time.Time

	Med_EmployeeID *uint
	Med_Employee   Med_Employee `gorm:"references:id"`

	Med_EquipmentID *uint
	Med_Equipment   Med_Equipment `gorm:"references:id"`

	LocationID *uint
	Location   Location `gorm:"references:id"`
}
