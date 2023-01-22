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
		&Policing{},
		&Patiend{},
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

	//Policing data

	Policing_one := Policing{
		Description: "สิทธิ์ข้าราชการ",
	}
	db.Model(&Policing{}).Create(&Policing_one)

	Policing_two := Policing{
		Description: "สิทธิ์บัตรทอง",
	}
	db.Model(&Policing{}).Create(&Policing_two)

	Policing_three := Policing{
		Description: "สิทธิ์ประกันสังคม",
	}
	db.Model(&Policing{}).Create(&Policing_three)

	Policing_four := Policing{
		Description: "สิทธิ์องค์กรคู่สัญญา",
	}
	db.Model(&Policing{}).Create(&Policing_four)

	Policing_five := Policing{
		Description: "ผู้ป่วยถือบัตรประกันสุขภาพ",
	}
	db.Model(&Policing{}).Create(&Policing_five)

	Policing_six := Policing{
		Description: "ไม่มี",
	}
	db.Model(&Policing{}).Create(&Policing_six)
}
