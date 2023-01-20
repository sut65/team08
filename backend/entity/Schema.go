package entity

import (
	"gorm.io/gorm"
)

type Gender struct {
	gorm.Model
	Description string

	Screening_officer []Screening_officer `gorm:"foreignKey:GenderID"`
}

type Prefix struct {
	gorm.Model
	Description string

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
	Phone    uint
	Email    string
	Password string

	GenderID    *uint
	PrefixID    *uint
	EducationID *uint
	Gender      Gender    `gorm:"references:id"`
	Prefix      Prefix    `gorm:"references:id"`
	Education   Education `gorm:"references:id"`
}
