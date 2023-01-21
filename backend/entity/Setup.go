package entity

import (
	//"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {

	return db

}

func SetupDatabase() {

	database, err := gorm.Open(sqlite.Open("SE-G08.db"), &gorm.Config{})

	if err != nil {

		panic("failed to connect database")

	}

	// Migrate the schema

	database.AutoMigrate(
		&Prefix{},
		&Gender{},
		&Education{},
		&Screening_officer{},
	)

	db = database

	// Prefix data
	Prefix_one := Prefix{
		Description: "นาย",
	}
	db.Model(&Prefix{}).Create(&Prefix_one)

	Prefix_two := Prefix{
		Description: "นาง",
	}
	db.Model(&Prefix{}).Create(&Prefix_two)

	Prefix_three := Prefix{
		Description: "นางสาว",
	}
	db.Model(&Prefix{}).Create(&Prefix_three)

	// Gender data
	Gender_one := Prefix{
		Description: "ชาย",
	}
	db.Model(&Gender{}).Create(&Gender_one)

	Gender_two := Prefix{
		Description: "หญิง",
	}
	db.Model(&Gender{}).Create(&Gender_two)

	// Education data
	Education_one := Education{
		Description: "ปริญญาตรี",
	}
	db.Model(&Education{}).Create(&Education_one)

	Education_two := Education{
		Description: "ปริญญาโท",
	}
	db.Model(&Education{}).Create(&Education_two)

	Education_three := Education{
		Description: "ปริญญาเอก",
	}
	db.Model(&Education{}).Create(&Education_three)

}
