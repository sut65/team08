package entity

import (

	"github.com/asaskevich/govalidator"

	"gorm.io/gorm"
	"time"
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
	PrefixID               *uint  `valid:"-"`
	Screening_officer_Name string `valid:"required~Name officer cannot be blank"`

	GenderID   *uint  `valid:"-"`
	BloodID    *uint  `valid:"-"`
	ReligionID *uint  `valid:"-"`
	Birthday   string `valid:"required~Birthday officer cannot be blank"`

	NationalityID   *uint  `valid:"-"`
	CountryID       *uint  `valid:"-"`
	ScreeningIDCard string `gorm:"uniqueIndex" valid:"matches(^[1-9]\\d{12}$),required~IDCard officer cannot be blank"`

	Phone string `valid:"matches(^[0]\\d{9}$),required~Phone officer cannot be blank"`
	Email string `valid:"email"`
	//หน้าต่างข้อมูลการศึกษา
	EducationID    *uint  `valid:"-"`
	EducationName  string `valid:"required~EducationName officer cannot be blank"`
	EducationMajor string `valid:"required~EducationMajor officer cannot be blank"`
	University     string `valid:"required~University officer cannot be blank"`
	ScPassword     string `valid:"-"`

	//foreignKey

	Country     Nationality `gorm:"references:id" valid:"-"`
	Nationality Nationality `gorm:"references:id" valid:"-"`
	Religion    Religion    `gorm:"references:id" valid:"-"`
	Gender      Gender      `gorm:"references:id" valid:"-"`
	Prefix      Prefix      `gorm:"references:id" valid:"-"`
	Education   Education   `gorm:"references:id" valid:"-"`
	Blood       Blood       `gorm:"references:id" valid:"-"`

	Appoint []Appoint `gorm:"foreignkey:Screening_officerID"`
	Patient []Patient `gorm:"foreignkey:Screening_officerID"`

	OfficerID *uint
	Officer   Officer `gorm:"references:id"` //อ้างอิงไอดีที่ใช้เชื่อม FK
}

type Patient struct {
	gorm.Model
	//หน้าต่างข้อมูลส่วนตัวของคนไข้
	PrefixID            *uint  `valid:"-"`
	Patient_Name        string `valid:"required~Patient Name cannot be blank"`
	Age                 uint   `valid:"range(0|120)"`
	GenderID            *uint  `valid:"-"`
	BloodID             *uint  `valid:"-"`
	ReligionID          *uint  `valid:"-"`
	Birthday            string `valid:"required~Birthday cannot be blank"`
	NationalityID       *uint  `valid:"-"`
	Screening_officerID *uint  `valid:"-"`
	IDCard              string `gorm:"uniqueIndex" valid:"matches(^[1-9]\\d{12}$), required~IDCard cannot be blank"`

	//หน้าต่างข้อมูลการติดต่อส่วนตัว
	Phone     string `valid:"matches(^[0]\\d{9}$),required~Phone cannot be blank"`
	House_ID  string `valid:"required~House_ID cannot be blank"`
	AddressID *uint  `valid:"-"`

	//foreignKey
	Nationality       Nationality       `gorm:"references:id" valid:"-"`
	Address           AddressThailand   `gorm:"references:id" valid:"-"`
	Screening_officer Screening_officer `gorm:"references:id" valid:"-"`
	Religion          Religion          `gorm:"references:id" valid:"-"`
	Blood             Blood             `gorm:"references:id" valid:"-"`
	Gender            Gender            `gorm:"references:id" valid:"-"`
	Prefix            Prefix            `gorm:"references:id" valid:"-"`

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
	DocterCode   string `valid:"-"`
	DocterIDCard string `valid:"-"`
	DocPrefixID  *uint  `valid:"-"`
	FirstNameTH  string `valid:"required~Name cannot be blank"`
	LastNameTH   string `valid:"-"`
	FirstNameEN  string `valid:"-"`

	LastNameEN    string    `valid:"-"`
	GenderID      *uint     `valid:"-"`
	BloodID       *uint     `valid:"-"`
	MaritalID     *uint     `valid:"-"`
	Birthday      time.Time `valid:"-"`
	ReligionID    *uint     `valid:"-"`
	ReOther       string    `valid:"-"`
	NationalityID *uint     `valid:"-"`
	CountryID     *uint     `valid:"-"`
	TelPhone      string    `valid:"-"`
	TelOffice     string    `valid:"-"`

	Email       string `valid:"-"`
	AllAddress  string `valid:"-"`
	Subdistrict string `valid:"-"`
	District    string `valid:"-"`
	Province    string `valid:"-"`
	AddressID   *uint  `valid:"-"`

	FaIDCard      string `valid:"-"`
	DocFaPrefixID *uint  `valid:"-"`
	FaFirstName   string `valid:"-"`
	FaLastName    string `valid:"-"`
	FaOccupation  string `valid:"-"`
	MoIDCard      string `valid:"-"`
	DocMoPrefixID *uint  `valid:"-"`

	MoFirstName   string `valid:"-"`
	MoLastName    string `valid:"-"`
	MoOccupation  string `valid:"-"`
	WiIDCard      string `valid:"-"`
	DocWiPrefixID *uint  `valid:"-"`
	WiFirstName   string `valid:"-"`

	WiLastName     string `valid:"-"`
	WiOccupation   string `valid:"-"`
	WiPhone        string `valid:"-"`
	EducationID    *uint  `valid:"-"`
	EducationName  string `valid:"-"`
	EducationMajor string `valid:"-"`

	University  string `valid:"-"`
	DocPassword string `valid:"-"`

	StartEducation time.Time
	EndEducation   time.Time

	DocPrefix DocPrefix       `gorm:"references:id" valid:"-"`
	Gender    Gender          `gorm:"references:id" valid:"-"`
	Blood     Blood           `gorm:"references:id" valid:"-"`
	Marital   Marital         `gorm:"references:id" valid:"-"`
	Religion  Religion        `gorm:"references:id" valid:"-"`
	Address   AddressThailand `gorm:"references:id" valid:"-"`
	Education Education       `gorm:"references:id" valid:"-"`

	Nationality Nationality `gorm:"references:id" valid:"-"`
	Country     Nationality `gorm:"references:id" valid:"-"`

	DocFaPrefix DocPrefix `gorm:"references:id" valid:"-"`
	DocMoPrefix DocPrefix `gorm:"references:id" valid:"-"`
	DocWiPrefix DocPrefix `gorm:"references:id" valid:"-"`
	//Gg
	Treatments []Treatment `gorm:"foreignKey:DoctorID" valid:"-"`

	//Aern
	Dispense []Dispense `gorm:"foreignkey:DoctorID" valid:"-"`

	//J
	Save_ITI []Save_ITI `gorm:"foreignkey:DoctorID"`
	Operating_Room []Operating_Room `gorm:"foreignkey:DoctorID"`

	//
	OfficerID *uint   `valid:"-"`
	Officer   Officer `gorm:"references:id" valid:"-"` //อ้างอิงไอดีที่ใช้เชื่อม FK

	Lab []Lab `gorm:"foreignKey:DoctorID" valid:"-"`
}

type Lab_Name struct {
	gorm.Model
	Discription string

	Lab []Lab `gorm:"foreignKey:LabNameID"`
}

type Lab struct {
	gorm.Model
	Lab_test string
	Value    float32

	LabNameID      *uint
	TreatmentID    *uint
	Med_EmployeeID *uint
	DoctorID       *uint

	Lab_Name     Lab_Name     `gorm:"references:id"`
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
	TREATMENT_ID string    `valid:"matches(^T\\d{6}$)~T cannot be blank"`
	TREATMENT    string    `valid:"maxstringlength(20)~Please enter details"`
	DATE         time.Time `valid:"required,CheckDateTime~Please enter the current time"`
	APPOINTMENT  uint      `valid:"range(0|100)"`
	CONCLUSION   string    `valid:"maxstringlength(100)~Please enter details"`
	GUIDANCE     string    `valid:"maxstringlength(100)~Please enter details"`

	DoctorID *uint  `valid:"-"`
	Doctor   Doctor `gorm:"references:id" valid:"-"`

	StatusID *uint  `valid:"-"`
	Status   Status `gorm:"references:id" valid:"-"`

	TrackID *uint `valid:"-"`
	Track   Track `gorm:"references:id" valid:"-"`

	PatientID *uint   `valid:"-"`
	Patient   Patient `gorm:"references:id" valid:"-"`

	DiseaseID *uint   `valid:"-"`
	Disease   Disease `gorm:"references:id" valid:"-"`

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
	Doctor      Doctor `gorm:"references:id"`
	DoctorID    *uint

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
	Doctor     Doctor `gorm:"references:id"`
	DoctorID   *uint
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
	Date time.Time `valid:"required,IsnotPast~Please enter the current time"`

	Number     uint
	Text        string
	DoctorID    *uint
	TreatmentID *uint
	DrugID      *uint
	PracticeID  *uint

	Doctor    Doctor    `gorm:"references:id" valid:"-"`
	Treatment Treatment `gorm:"references:id" valid:"-"`
	Drug      Drug      `gorm:"references:id" valid:"-"`
	Practice  Practice  `gorm:"references:id" valid:"-"`
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
	Date_now     time.Time `valid:"required,IsnotPast~Please enter the current time"`
	Date_appoint time.Time `valid:"required,IsFuture~Please enter the current time"`
	Text_appoint string    `valid:"maxstringlength(100)~Please record the appointment details."`

	Screening_officerID *uint `valid:"-"`
	TreatmentID         *uint `valid:"-"`
	LevelcureID         *uint `valid:"-"`
	DepartmentID        *uint `valid:"-"`

	Screening_officer Screening_officer `gorm:"references:id" valid:"-"`
	Treatment         Treatment         `gorm:"references:id" valid:"-"`
	Levelcure         Levelcure         `gorm:"references:id" valid:"-"`
	Department        Department        `gorm:"references:id" valid:"-"`
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
	Equipment      string `valid:"required~Equipment cannot be blank"`
	Quantity       int    `valid:"range(0|1000)~Quantity is not in range 0 to 1000"`
	Shop           string `valid:"required~Shop cannot be blank"`
	BrandID        *uint
	Brand          Brand `gorm:"references:id" valid:"-"`
	Med_StatusID   *uint
	Med_Status     Med_Status `gorm:"references:id" valid:"-"`
	Med_EmployeeID *uint
	Med_Employee   Med_Employee `gorm:"references:id" valid:"-"`
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
	R_ID     string    `valid:"matches(^R\\d{6}$)~R cannot be blank"`
	R_NAME   string    `valid:"maxstringlength(20)~Please enter details"`
	QUANTITY uint      `valid:"range(1|2000)"`
	TIME     time.Time `valid:"required,CheckDateTime~Please enter the current time"`

	Med_EmployeeID *uint        `valid:"-"`
	Med_Employee   Med_Employee `gorm:"references:id" valid:"-"`

	Med_EquipmentID *uint         `valid:"-"`
	Med_Equipment   Med_Equipment `gorm:"references:id" valid:"-"`

	LocationID *uint    `valid:"-"`
	Location   Location `gorm:"references:id" valid:"-"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("CheckDateTime", func(i interface{}, _ interface{}) bool {
		t := i.(time.Time)
		if t.Before(time.Now().Add(-2*time.Minute)) || t.After(time.Now().Add(2*time.Minute)) {
			return false

		} else {
			return true
		}
	})
}

func init() {
	govalidator.CustomTypeTagMap.Set("IsFuture", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("IsPresent", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Equal(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("IsPast", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now())
	})
	govalidator.CustomTypeTagMap.Set("IsnotPast", func(i interface{}, o interface{}) bool {
		t := i.(time.Time)
		// ย้อนหลังไม่เกิน 1 วัน
		return t.After(time.Now().AddDate(0, 0, -1))
	})
}
