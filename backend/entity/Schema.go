package entity

import (
	"time"

	"gorm.io/gorm"
)

// Officer บนสุด
type Officer struct {
	gorm.Model
	Name     string
	Email    string `gorm:"uniqueIndex"` //มีความเฉพาะ ห้ามซ้ำ
	Password string `json:"-"`
	//ผู้ดูแลระบบ 1 คน สามารถบันทึกข้อมูลDoctorได้หลายคน
	Doctors []Doctor `gorm:"foreignKey:OfficerID"`
	//ผู้ดูแลระบบ 1 คน สามารถบันทึกข้อมูลMed_Employeeได้หลายคน
	Med_Employees []Med_Employee `gorm:"foreignKey:OfficerID"` //ในตาราง Med_Employee มีการเชื่อมตาราง Officer ไปเป็นFK  ใช้ OfficerID
	//ผู้ดูแลระบบ 1 คน สามารถบันทึกข้อมูลScreening_officerได้หลายคน
	Screening_officers []Screening_officer `gorm:"foreignKey:OfficerID"`
	//บันทึกบิลได้หลายบิล
}
type Gender struct {
	gorm.Model
	Description string

	Patient           []Patient           `gorm:"foreignKey:GenderID"`
	Screening_officer []Screening_officer `gorm:"foreignKey:GenderID"`
	Doctor            []Doctor            `gorm:"foreignKey:GenderID"`
	Med_Employee      []Med_Employee      `gorm:"foreignKey:GenderID"`
}

type Prefix struct {
	gorm.Model
	Description string

	Patient           []Patient           `gorm:"foreignKey:PrefixID"`
	Screening_officer []Screening_officer `gorm:"foreignKey:PrefixID"`
	Med_Employee      []Med_Employee      `gorm:"foreignKey:PrefixID"`
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
	PrefixID               *uint
	Screening_officer_Name string

	GenderID   *uint
	BloodID    *uint
	ReligionID *uint
	Birthday   string

	NationalityID   *uint
	CountryID       *uint
	ScreeningIDCard string `gorm:"uniqueIndex"`

	Phone string
	Email string
	//หน้าต่างข้อมูลการศึกษา
	EducationID    *uint
	EducationName  string
	EducationMajor string
	University     string

	//foreignKey

	Country     Nationality `gorm:"references:id"`
	Nationality Nationality `gorm:"references:id"`
	Religion    Religion    `gorm:"references:id"`
	Gender      Gender      `gorm:"references:id"`
	Prefix      Prefix      `gorm:"references:id"`
	Education   Education   `gorm:"references:id"`
	Blood       Blood       `gorm:"references:id"`

	Operating_Room []Operating_Room `gorm:"foreignkey:Screening_officerID"`
	Appoint        []Appoint        `gorm:"foreignkey:Screening_officerID"`
	Patient        []Patient        `gorm:"foreignkey:Screening_officerID"`

	OfficerID *uint
	Officer   Officer `gorm:"references:id"` //อ้างอิงไอดีที่ใช้เชื่อม FK
}

type Patient struct {
	gorm.Model
	//หน้าต่างข้อมูลส่วนตัวของคนไข้
<<<<<<< HEAD
	PrefixID            *uint
	Patient_Name        string
	Age                 uint
	GenderID            *uint
	BloodID             *uint
	ReligionID          *uint
	Birthday            string
	NationalityID       *uint
	Screening_officerID *uint
	IDCard              string `gorm:"uniqueIndex"`
=======
	PrefixID      *uint
	Patient_Name  string
	Age           uint
	GenderID      *uint
	BloodID       *uint
	ReligionID    *uint
	Birthday      string
	NationalityID *uint
	IDCard        string `gorm:"uniqueIndex"`
>>>>>>> issue-49

	//หน้าต่างข้อมูลการติดต่อส่วนตัว
	Phone     string
	House_ID  string
	AddressID *uint

	//foreignKey
	Nationality       Nationality       `gorm:"references:id"`
	Address           AddressThailand   `gorm:"references:id"`
	Screening_officer Screening_officer `gorm:"references:id"`
	Religion          Religion          `gorm:"references:id"`
	Blood             Blood             `gorm:"references:id"`
	Gender            Gender            `gorm:"references:id"`
	Prefix            Prefix            `gorm:"references:id"`

	Treatment []Treatment `gorm:"foreignKey:PatientID"`
}

type Blood struct {
	gorm.Model
	Phenotype string
	Genotype  string

	Doctor            []Doctor            `gorm:"foreignKey:BloodID"`
	Screening_officer []Screening_officer `gorm:"foreignKey:BloodID"`
	Patient           []Patient           `gorm:"foreignKey:BloodID"`
}

type Nationality struct {
	gorm.Model
	NationalityType string
	Country         string

	Doctor            []Doctor            `gorm:"foreignKey:NationalityID"`
	Screening_officer []Screening_officer `gorm:"foreignKey:NationalityID"`
	Patient           []Patient           `gorm:"foreignKey:NationalityID"`
}

type AddressThailand struct {
	gorm.Model
	Province    string
	District    string
	Subdistrict string
	Zipcode     string

	Doctor  []Doctor  `gorm:"foreignKey:AddressID"`
	Patient []Patient `gorm:"foreignKey:AddressID"`
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
	Patient           []Patient           `gorm:"foreignKey:ReligionID"`
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
	FirstNameTH  string `valid:"required~Name cannot be blank"`
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

	//
	OfficerID *uint
	Officer   Officer `gorm:"references:id"` //อ้างอิงไอดีที่ใช้เชื่อม FK

	Lab []Lab `gorm:"foreignKey:DoctorID"`
}

type Lab_Name struct {
	gorm.Model
	Discription string

	Lab []Lab `gorm:"foreignKey:LabNameID"`
}

type Lab struct {
	gorm.Model
	Lab_test string
	Value    string

	LabNameID      *uint
	TreatmentID    *uint
	Med_EmployeeID *uint
	DoctorID       *uint

	Lab_Name      Lab_Name      `gorm:"references:id"`
	Treatment    Treatment    `gorm:"references:id"`
	Med_Employee Med_Employee `gorm:"references:id"`
	Doctor       Doctor       `gorm:"references:id"`
}

// ระบบข้อมูลการรักษา ของกริม
// โรค Disease
type Disease struct {
	gorm.Model
	Name string `gorm:"uniqueIndex"`
	//1 โรค มีผู้ป่วยหลายคน
	Treatment []Treatment `gorm:"foreignKey:DiseaseID"`
}

// สถานะการรักษา Status
type Status struct {
	gorm.Model
	Name string `gorm:"uniqueIndex"`
	//1 สถานะ มีผู้ป่วยหลายคน
	Treatment []Treatment `gorm:"foreignKey:StatusID"`
}

// สถานะติดตามผล Status
type Track struct {
	gorm.Model
	Name string `gorm:"uniqueIndex"`
	//1 สถานะติดตามผล มีผู้ป่วยหลายคน
	Treatment []Treatment `gorm:"foreignKey:TrackID"`
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

	PatientID *uint
	Patient   Patient `gorm:"references:id"`

	DiseaseID *uint
	Disease   Disease `gorm:"references:id"`

	Save_ITI *Save_ITI `gorm:"foreignkey:TreatmentID"`

	//Aern
	Dispense []Dispense `gorm:"foreignkey:TreatmentID"`
	Appoint  []Appoint  `gorm:"foreignkey:TreatmentID"`

	Lab []Lab `gorm:"foreignKey:TreatmentID"`
}

// J
type Building struct {
	gorm.Model
	Name           string           `gorm:"uniqueIndex"`
	Save_ITI       []Save_ITI       `gorm:"foreignKey:BuildingID"`
	Operating_Room []Operating_Room `gorm:"foreignKey:BuildingID"`
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

	Save_ITI            Save_ITI `gorm:"references:id"`
	Save_ITIID          *uint
	Building            Building `gorm:"references:id"`
	BuildingID          *uint
	Room                Room `gorm:"references:id"`
	RoomID              *uint
	Screening_officerID *uint
	Screening_officer   Screening_officer `gorm:"references:id"`
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
	Name           string
	Age            uint
	Phone          string
	Email          string
	Password       string
	University     string
	EducationName  string
	EducationMajor string

	GenderID      *uint
	PrefixID      *uint
	EducationID   *uint
	Gender        Gender          `gorm:"references:id"`
	Prefix        Prefix          `gorm:"references:id"`
	Education     Education       `gorm:"references:id"`
	Med_Equipment []Med_Equipment `gorm:"foreignKey:Med_EmployeeID"`
	Request       []Request       `gorm:"foreignKey:Med_EmployeeID"`

	OfficerID *uint
	Officer   Officer `gorm:"references:id"` //อ้างอิงไอดีที่ใช้เชื่อม FK

	Lab []Lab `gorm:"foreignKey:Med_EmployeeID"`
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
