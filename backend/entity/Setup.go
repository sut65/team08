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

		//idea
		&Blood{},
		&Nationality{},
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

	//idea Blood data
	Blood_A := Blood{
		BloodType: "A",
	}
	db.Model(&Blood{}).Create(&Blood_A)
	Blood_B := Blood{
		BloodType: "B",
	}
	db.Model(&Blood{}).Create(&Blood_B)
	Blood_AB := Blood{
		BloodType: "AB",
	}
	db.Model(&Blood{}).Create(&Blood_AB)
	Blood_O := Blood{
		BloodType: "O",
	}
	db.Model(&Blood{}).Create(&Blood_O)

	//Nationality
	Nationality_1 := Nationality{
		NationalityType: "Afghan",
		Country: "Afghanistan",
	}
	db.Model(&Nationality{}).Create(&Nationality_1)
	Nationality_2 := Nationality{
		NationalityType: "Argentine",
		Country: "Argentina",
	}
	db.Model(&Nationality{}).Create(&Nationality_2)
	Nationality_3 := Nationality{
		NationalityType: "Austrian",
		Country: "Austria",
	}
	db.Model(&Nationality{}).Create(&Nationality_3)
	Nationality_4 := Nationality{
		NationalityType: "Australian",
		Country: "Australia",
	}
	db.Model(&Nationality{}).Create(&Nationality_4)
	Nationality_5 := Nationality{
		NationalityType: "Bangladeshi",
		Country: "Bangladesh",
	}
	db.Model(&Nationality{}).Create(&Nationality_5)
	Nationality_6 := Nationality{
		NationalityType: "Belarusian",
		Country: "Belarus",
	}
	db.Model(&Nationality{}).Create(&Nationality_6)
	Nationality_7 := Nationality{
		NationalityType: "Belgian",
		Country: "Belgium",
	}
	db.Model(&Nationality{}).Create(&Nationality_7)
	Nationality_8 := Nationality{
		NationalityType: "Bolivian",
		Country: "Bolivia",
	}
	db.Model(&Nationality{}).Create(&Nationality_8)
	Nationality_9 := Nationality{
		NationalityType: "Brazilian",
		Country: "Brazil",
	}
	db.Model(&Nationality{}).Create(&Nationality_9)
	Nationality_10 := Nationality{
		NationalityType: "British",
		Country: "Britain",
	}
	db.Model(&Nationality{}).Create(&Nationality_10)
	Nationality_11 := Nationality{
		NationalityType: "Bruneian",
		Country: "Brunei",
	}
	db.Model(&Nationality{}).Create(&Nationality_11)
	Nationality_12 := Nationality{
		NationalityType: "Bulgarian",
		Country: "Bulgaria",
	}
	db.Model(&Nationality{}).Create(&Nationality_12)
	Nationality_13 := Nationality{
		NationalityType: "Cambodian",
		Country: "Cambodia",
	}
	db.Model(&Nationality{}).Create(&Nationality_13)
	Nationality_14 := Nationality{
		NationalityType: "Cameroonian",
		Country: "Cameroon",
	}
	db.Model(&Nationality{}).Create(&Nationality_14)
	Nationality_15 := Nationality{
		NationalityType: "Canadian",
		Country: "Canada",
	}
	db.Model(&Nationality{}).Create(&Nationality_15)
	Nationality_16 := Nationality{
		NationalityType: "Chadian",
		Country: "Chad",
	}
	db.Model(&Nationality{}).Create(&Nationality_16)
	Nationality_17 := Nationality{
		NationalityType: "Chinese",
		Country: "China",
	}
	db.Model(&Nationality{}).Create(&Nationality_17)
	Nationality_18 := Nationality{
		NationalityType: "Colombian",
		Country: "Colombia",
	}
	db.Model(&Nationality{}).Create(&Nationality_18)
	Nationality_19 := Nationality{
		NationalityType: "Costa Rican",
		Country: "Costa Rica",
	}
	db.Model(&Nationality{}).Create(&Nationality_19)
	Nationality_20 := Nationality{
		NationalityType: "Croatian",
		Country: "Croatia",
	}
	db.Model(&Nationality{}).Create(&Nationality_20)
	Nationality_21 := Nationality{
		NationalityType: "Czech",
		Country: "the Czech Republic",
	}
	db.Model(&Nationality{}).Create(&Nationality_21)
	Nationality_22 := Nationality{
		NationalityType: "Danish",
		Country: "Denmark",
	}
	db.Model(&Nationality{}).Create(&Nationality_22)
	Nationality_23 := Nationality{
		NationalityType: "Ecuadorian",
		Country: "Ecuador",
	}
	db.Model(&Nationality{}).Create(&Nationality_23)
	Nationality_24 := Nationality{
		NationalityType: "Egyptian",
		Country: "Egypt",
	}
	db.Model(&Nationality{}).Create(&Nationality_24)
	Nationality_25 := Nationality{
		NationalityType: "English",
		Country: "England",
	}
	db.Model(&Nationality{}).Create(&Nationality_25)
	Nationality_26 := Nationality{
		NationalityType: "Estonian",
		Country: "Estonia",
	}
	db.Model(&Nationality{}).Create(&Nationality_26)
	Nationality_27 := Nationality{
		NationalityType: "Ethiopian",
		Country: "Ethiopia",
	}
	db.Model(&Nationality{}).Create(&Nationality_27)
	Nationality_28 := Nationality{
		NationalityType: "Finnish",
		Country: "Finland",
	}
	db.Model(&Nationality{}).Create(&Nationality_28)
	Nationality_29 := Nationality{
		NationalityType: "French",
		Country: "France",
	}
	db.Model(&Nationality{}).Create(&Nationality_29)
	Nationality_30 := Nationality{
		NationalityType: "German",
		Country: "Germany",
	}
	db.Model(&Nationality{}).Create(&Nationality_30)
	Nationality_31 := Nationality{
		NationalityType: "Ghanaian",
		Country: "Ghana",
	}
	db.Model(&Nationality{}).Create(&Nationality_31)
	Nationality_32 := Nationality{
		NationalityType: "Greek",
		Country: "Greece",
	}
	db.Model(&Nationality{}).Create(&Nationality_32)
	Nationality_33 := Nationality{
		NationalityType: "Guatemalan",
		Country: "Guatemala",
	}
	db.Model(&Nationality{}).Create(&Nationality_33)
	Nationality_34 := Nationality{
		NationalityType: "Dutch",
		Country: "Holland",
	}
	db.Model(&Nationality{}).Create(&Nationality_34)
	Nationality_35 := Nationality{
		NationalityType: "Honduran",
		Country: "Honduras",
	}
	db.Model(&Nationality{}).Create(&Nationality_35)
	Nationality_36 := Nationality{
		NationalityType: "Hungarian",
		Country: "Hungary",
	}
	db.Model(&Nationality{}).Create(&Nationality_36)
	Nationality_37 := Nationality{
		NationalityType: "Icelandic",
		Country: "Iceland",
	}
	db.Model(&Nationality{}).Create(&Nationality_37)
	Nationality_38 := Nationality{
		NationalityType: "Indian",
		Country: "India",
	}
	db.Model(&Nationality{}).Create(&Nationality_38)
	Nationality_39 := Nationality{
		NationalityType: "Indonesian",
		Country: "Indonesia",
	}
	db.Model(&Nationality{}).Create(&Nationality_39)
	Nationality_40 := Nationality{
		NationalityType: "Iranian",
		Country: "Iran",
	}
	db.Model(&Nationality{}).Create(&Nationality_40)
	Nationality_41 := Nationality{
		NationalityType: "Iraqi",
		Country: "Iraq",
	}
	db.Model(&Nationality{}).Create(&Nationality_41)
	Nationality_42 := Nationality{
		NationalityType: "Irish",
		Country: "Ireland",
	}
	db.Model(&Nationality{}).Create(&Nationality_42)
	Nationality_43 := Nationality{
		NationalityType: "Israeli",
		Country: "Israel",
	}
	db.Model(&Nationality{}).Create(&Nationality_43)
	Nationality_44 := Nationality{
		NationalityType: "Italian",
		Country: "Italy",
	}
	db.Model(&Nationality{}).Create(&Nationality_44)
	Nationality_45 := Nationality{
		NationalityType: "Ivorian",
		Country: "Ivory Coast",
	}
	db.Model(&Nationality{}).Create(&Nationality_45)
	Nationality_46 := Nationality{
		NationalityType: "Jamaican",
		Country: "Jamaica",
	}
	db.Model(&Nationality{}).Create(&Nationality_46)
	Nationality_47 := Nationality{
		NationalityType: "Japanese",
		Country: "Japan",
	}
	db.Model(&Nationality{}).Create(&Nationality_47)
	Nationality_48 := Nationality{
		NationalityType: "Jordanian",
		Country: "Jordan",
	}
	db.Model(&Nationality{}).Create(&Nationality_48)
	Nationality_49 := Nationality{
		NationalityType: "Kazakh",
		Country: "Kazakhstan",
	}
	db.Model(&Nationality{}).Create(&Nationality_49)
	Nationality_50 := Nationality{
		NationalityType: "Kenyan",
		Country: "Kenya",
	}
	db.Model(&Nationality{}).Create(&Nationality_50)
	Nationality_51 := Nationality{
		NationalityType: "Lao",
		Country: "Laos",
	}
	db.Model(&Nationality{}).Create(&Nationality_51)
	Nationality_52 := Nationality{
		NationalityType: "Latvian",
		Country: "Latvia",
	}
	db.Model(&Nationality{}).Create(&Nationality_52)
	Nationality_53 := Nationality{
		NationalityType: "Libyan",
		Country: "Libya",
	}
	db.Model(&Nationality{}).Create(&Nationality_53)
	Nationality_54 := Nationality{
		NationalityType: "Lithuanian",
		Country: "Lithuania",
	}
	db.Model(&Nationality{}).Create(&Nationality_54)
	Nationality_55 := Nationality{
		NationalityType: "Malagasy",
		Country: "Madagascar",
	}
	db.Model(&Nationality{}).Create(&Nationality_55)
	Nationality_56 := Nationality{
		NationalityType: "Malaysian",
		Country: "Malaysia",
	}
	db.Model(&Nationality{}).Create(&Nationality_56)
	Nationality_57 := Nationality{
		NationalityType: "Mexican",
		Country: "Mexico",
	}
	db.Model(&Nationality{}).Create(&Nationality_57)
	Nationality_58 := Nationality{
		NationalityType: "Moroccan",
		Country: "Morocco",
	}
	db.Model(&Nationality{}).Create(&Nationality_58)
	Nationality_59 := Nationality{
		NationalityType: "Namibian",
		Country: "Namibia",
	}
	db.Model(&Nationality{}).Create(&Nationality_59)
	Nationality_60 := Nationality{
		NationalityType: "New Zealand",
		Country: "New Zealand",
	}
	db.Model(&Nationality{}).Create(&Nationality_60)
	Nationality_61 := Nationality{
		NationalityType: "Nicaraguan",
		Country: "Nicaragua",
	}
	db.Model(&Nationality{}).Create(&Nationality_61)
	Nationality_62 := Nationality{
		NationalityType: "Nigerien",
		Country: "Niger",
	}
	db.Model(&Nationality{}).Create(&Nationality_62)
	Nationality_63 := Nationality{
		NationalityType: "Nigerian",
		Country: "Nigeria",
	}
	db.Model(&Nationality{}).Create(&Nationality_63)
	Nationality_64 := Nationality{
		NationalityType: "Norwegian",
		Country: "Norway",
	}
	db.Model(&Nationality{}).Create(&Nationality_64)
	Nationality_65 := Nationality{
		NationalityType: "Omani",
		Country: "Oman",
	}
	db.Model(&Nationality{}).Create(&Nationality_65)
	Nationality_66 := Nationality{
		NationalityType: "Pakistani",
		Country: "Pakistan",
	}
	db.Model(&Nationality{}).Create(&Nationality_66)
	Nationality_67 := Nationality{
		NationalityType: "Panamanian",
		Country: "Panama",
	}
	db.Model(&Nationality{}).Create(&Nationality_67)
	Nationality_68 := Nationality{
		NationalityType: "Paraguayan",
		Country: "Paraguay",
	}
	db.Model(&Nationality{}).Create(&Nationality_68)
	Nationality_69 := Nationality{
		NationalityType: "Peruvian",
		Country: "Peru",
	}
	db.Model(&Nationality{}).Create(&Nationality_69)
	Nationality_70 := Nationality{
		NationalityType: "Philippine",
		Country: "The Philippines",
	}
	db.Model(&Nationality{}).Create(&Nationality_70)
	Nationality_71 := Nationality{
		NationalityType: "Polish",
		Country: "Poland",
	}
	db.Model(&Nationality{}).Create(&Nationality_71)
	Nationality_72 := Nationality{
		NationalityType: "Portuguese",
		Country: "Portugal",
	}
	db.Model(&Nationality{}).Create(&Nationality_72)
	Nationality_73 := Nationality{
		NationalityType: "Congolese",
		Country: "Republic of the Congo",
	}
	db.Model(&Nationality{}).Create(&Nationality_73)
	Nationality_74 := Nationality{
		NationalityType: "Romanian",
		Country: "Romania",
	}
	db.Model(&Nationality{}).Create(&Nationality_74)
	Nationality_75 := Nationality{
		NationalityType: "Russian",
		Country: "Russia",
	}
	db.Model(&Nationality{}).Create(&Nationality_75)
	Nationality_76 := Nationality{
		NationalityType: "Saudi, Saudi Arabian",
		Country: "Saudi Arabia",
	}
	db.Model(&Nationality{}).Create(&Nationality_76)
	Nationality_77 := Nationality{
		NationalityType: "Scottish",
		Country: "Scotland",
	}
	db.Model(&Nationality{}).Create(&Nationality_77)
	Nationality_78 := Nationality{
		NationalityType: "Senegalese",
		Country: "Senegal",
	}
	db.Model(&Nationality{}).Create(&Nationality_78)
	Nationality_79 := Nationality{
		NationalityType: "Serbian",
		Country: "Serbia",
	}
	db.Model(&Nationality{}).Create(&Nationality_79)
	Nationality_80 := Nationality{
		NationalityType: "Singaporean",
		Country: "Singapore",
	}
	db.Model(&Nationality{}).Create(&Nationality_80)
	Nationality_81 := Nationality{
		NationalityType: "Slovak",
		Country: "Slovakia",
	}
	db.Model(&Nationality{}).Create(&Nationality_81)
	Nationality_82 := Nationality{
		NationalityType: "Somalian",
		Country: "Somalia",
	}
	db.Model(&Nationality{}).Create(&Nationality_82)
	Nationality_83 := Nationality{
		NationalityType: "South African",
		Country: "South Africa",
	}
	db.Model(&Nationality{}).Create(&Nationality_83)
	Nationality_84 := Nationality{
		NationalityType: "Spanish",
		Country: "Spain",
	}
	db.Model(&Nationality{}).Create(&Nationality_84)
	Nationality_85 := Nationality{
		NationalityType: "Sudanese",
		Country: "Sudan",
	}
	db.Model(&Nationality{}).Create(&Nationality_85)
	Nationality_86 := Nationality{
		NationalityType: "Swedish",
		Country: "Sweden",
	}
	db.Model(&Nationality{}).Create(&Nationality_86)
	Nationality_87 := Nationality{
		NationalityType: "Swiss",
		Country: "Switzerland",
	}
	db.Model(&Nationality{}).Create(&Nationality_87)
	Nationality_88 := Nationality{
		NationalityType: "Syrian",
		Country: "Syria",
	}
	db.Model(&Nationality{}).Create(&Nationality_88)
	Nationality_89 := Nationality{
		NationalityType: "Thai",
		Country: "Thailand",
	}
	db.Model(&Nationality{}).Create(&Nationality_89)
	Nationality_90 := Nationality{
		NationalityType: "Tunisian",
		Country: "Tunisia",
	}
	db.Model(&Nationality{}).Create(&Nationality_90)
	Nationality_91 := Nationality{
		NationalityType: "Turkish",
		Country: "Turkey",
	}
	db.Model(&Nationality{}).Create(&Nationality_91)
	Nationality_92 := Nationality{
		NationalityType: "Ukranian",
		Country: "Ukraine",
	}
	db.Model(&Nationality{}).Create(&Nationality_92)
	Nationality_93 := Nationality{
		NationalityType: "Emirati",
		Country: "The United Arab Emirates",
	}
	db.Model(&Nationality{}).Create(&Nationality_93)
	Nationality_94 := Nationality{
		NationalityType: "American",
		Country: "The United States",
	}
	db.Model(&Nationality{}).Create(&Nationality_94)
	Nationality_95 := Nationality{
		NationalityType: "Uruguayan",
		Country: "Uruguay",
	}
	db.Model(&Nationality{}).Create(&Nationality_95)
	Nationality_96 := Nationality{
		NationalityType: "Vietnamese",
		Country: "Vietnam",
	}
	db.Model(&Nationality{}).Create(&Nationality_96)
	Nationality_97 := Nationality{
		NationalityType: "Welsh",
		Country: "Wales",
	}
	db.Model(&Nationality{}).Create(&Nationality_97)
	Nationality_98 := Nationality{
		NationalityType: "Zambian",
		Country: "Zambia",
	}
	db.Model(&Nationality{}).Create(&Nationality_98)
	Nationality_99 := Nationality{
		NationalityType: "Zimbabwean",
		Country: "Zimbabwe",
	}
	db.Model(&Nationality{}).Create(&Nationality_99)

}
