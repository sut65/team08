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
}

type Prefix struct {
	gorm.Model
	Description string

	Patiend           []Patiend           `gorm:"foreignKey:PrefixID"`
	Screening_officer []Screening_officer `gorm:"foreignKey:PrefixID"`
}

type Education struct {
	gorm.Model
	Description string

	Screening_officer []Screening_officer `gorm:"foreignKey:EducationID"`
	Doctor            []Doctor            `gorm:"foreignKey:EducationID"`
}

type Screening_officer struct {
	gorm.Model

	Name     string
	Age      uint
	Phone    string
	Email    string
	Password string

	GenderID    *uint
	PrefixID    *uint
	EducationID *uint
	Gender      Gender    `gorm:"references:id"`
	Prefix      Prefix    `gorm:"references:id"`
	Education   Education `gorm:"references:id"`
}

type Policing struct {
	gorm.Model
	Description string

	Patiend []Patiend `gorm:"foreignKey:PolicingID"`
}

type Patiend struct {
	gorm.Model
	Name          string
	Age           uint
	Date_of_birth string
	Address       string
	ID_card       string
	Phone         string

	GenderID   *uint
	PrefixID   *uint
	PolicingID *uint
	Gender     Gender   `gorm:"references:id"`
	Prefix     Prefix   `gorm:"references:id"`
	Policing   Policing `gorm:"references:id"`
}

type Blood struct {
	gorm.Model
	Phenotype string
	Genotype  string

	Doctor []Doctor `gorm:"foreignKey:BloodID"`
}

type Nationality struct {
	gorm.Model
	NationalityType string
	Country         string

	Doctor []Doctor `gorm:"foreignKey:NationalityID"`
}

type AddressThailand struct {
	gorm.Model
	Province    string
	District    string
	Subdistrict string
	Zipcode     string

	Doctor []Doctor `gorm:"foreignKey:AddressID"`
}

type Marital struct {
	gorm.Model
	MaritalStatus string

	Doctor []Doctor `gorm:"foreignKey:MaritalID"`
}

type Religion struct {
	gorm.Model
	ReligionType string
	
	Doctor       []Doctor `gorm:"foreignKey:ReligionID"`
}

type DocPrefix struct {
	gorm.Model
	PrefixNameTH string
	PrefixNameEN string
	PreInitialTH string
	PreInitialEN string

	Doctor       []Doctor `gorm:"foreignKey:DocPrefixID"`
}

type Doctor struct {
	gorm.Model
	DocterCode   string
	DocterIDCard string
	DocPrefixID	*uint
	FirstNameTH  string
	LastNameTH   string
	FirstNameEN  string

	LastNameEN string
	GenderID	*uint
	BloodID		*uint
	MaritalID	*uint
	Birthday   time.Time
	ReligionID	*uint
	ReOther    string
	NationalityID	*uint
	CountryID		*uint
	TelPhone   string
	TelOffice  string

	Email       string
	AllAddress  string
	Subdistrict string
	District    string
	Province    string
	AddressID	*uint

	FaIDCard     string
	DocFaPrefixID	*uint
	FaFirstName  string
	FaLastName   string
	FaOccupation string
	MoIDCard     string
	DocMoPrefixID	*uint

	MoFirstName  string
	MoLastName   string
	MoOccupation string
	WiIDCard     string
	DocWiPrefixID	*uint
	WiFirstName  string

	WiLastName     string
	WiOccupation   string
	WiPhone        string
	EducationID	*uint
	EducationName  string
	EducationMajor string

	University     string
	StartEducation time.Time
	EndEducation   time.Time

	DocPrefix	DocPrefix	`gorm:"references:id"`
	Gender		Gender		`gorm:"references:id"`
	Blood		Blood		`gorm:"references:id"`
	Marital		Marital		`gorm:"references:id"`
	Religion	Religion	`gorm:"references:id"`
	Address		AddressThailand		`gorm:"references:id"`
	Education	Education	`gorm:"references:id"`

	Nationality	Nationality `gorm:"references:id"`
	Country		Nationality `gorm:"references:id"`

	DocFaPrefix	DocPrefix	`gorm:"references:id"`
	DocMoPrefix DocPrefix	`gorm:"references:id"`
	DocWiPrefix DocPrefix	`gorm:"references:id"`

}
