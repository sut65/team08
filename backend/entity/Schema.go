package entity

import (
	"gorm.io/gorm"
)

type Gender struct {
	gorm.Model
	Description string

	Patiend           []Patiend           `gorm:"foreignKey:GenderID"`
	Screening_officer []Screening_officer `gorm:"foreignKey:GenderID"`
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
	Gender   Gender   `gorm:"references:id"`
	Prefix   Prefix   `gorm:"references:id"`
	Policing Policing `gorm:"references:id"`
}

type Blood struct {
	gorm.Model
	BloodType		string
}
