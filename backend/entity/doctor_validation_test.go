package entity

import (
	
	"testing"

	"github.com/asaskevich/govalidator"
	.	"github.com/onsi/gomega"

	"time"
)

func TestDoctorUserNameNotBlank(t *testing.T) {
	t1, _ := time.Parse("2006-01-02", "2001-07-05")
	g := NewGomegaWithT(t)
	user := Doctor{
		DocterCode:   "D6300237",
		DocterIDCard: "1234567890111",
		FirstNameTH:  "",
		LastNameTH:   "สุทน",
		FirstNameEN:  "Mongkhon",

		LastNameEN: "Suthon",
		Birthday:   t1,
		TelPhone:   "0928626111",
		TelOffice:  "044641002",

		Email:       "m.suthon@gmail.com",
		AllAddress:  "1/21 หมู่ 7",
		Subdistrict: "ดอนอะราง",
		District:    "หนองกี่",
		Province:    "บุรีรัมย์",

		FaIDCard:     "1000067890222",
		FaFirstName:  "ประวิทย์",
		FaLastName:   "สุทน",
		FaOccupation: "ค้าขาย",
		MoIDCard:     "2000067890222",

		MoFirstName:  "นาง",
		MoLastName:   "สุทน",
		MoOccupation: "ข้าราชการ",
		WiIDCard:     "3000067890222",
		WiFirstName:  "ณัฐธิดา",

		WiLastName:     "สุทธิธรรม",
		WiOccupation:   "ธุรกิจส่วนตัว",
		WiPhone:        "0837520194",
		EducationName:  "แพทยศาสตร์บัณฑิต",
		EducationMajor: "แพทยศาสตร์",

		University:     "มหาวิทยาลัยสงขลานครินทร์",
		StartEducation: t1,
		EndEducation:   t1,
		DocPassword: "0123456789",
	}
	ok, err := govalidator.ValidateStruct(user)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("กรุณากรอกชื่อด้วยค่ะ"))
}

func TestEmailDoctorMustBeInValidPattern(t *testing.T) {
	t1, _ := time.Parse("2006-01-02", "2001-07-05")
	g := NewGomegaWithT(t)

	user := Doctor{
		DocterCode:   "D6300237",
		DocterIDCard: "1234567890111",
		FirstNameTH:  "มงคล",
		LastNameTH:   "สุทน",
		FirstNameEN:  "Mongkhon",

		LastNameEN: "Suthon",
		Birthday:   t1,
		TelPhone:   "0928626111",
		TelOffice:  "044641002",

		Email:       "lsfvokx",
		AllAddress:  "1/21 หมู่ 7",
		Subdistrict: "ดอนอะราง",
		District:    "หนองกี่",
		Province:    "บุรีรัมย์",

		FaIDCard:     "1000067890222",
		FaFirstName:  "ประวิทย์",
		FaLastName:   "สุทน",
		FaOccupation: "ค้าขาย",
		MoIDCard:     "2000067890222",

		MoFirstName:  "นาง",
		MoLastName:   "สุทน",
		MoOccupation: "ข้าราชการ",
		WiIDCard:     "3000067890222",
		WiFirstName:  "ณัฐธิดา",

		WiLastName:     "สุทธิธรรม",
		WiOccupation:   "ธุรกิจส่วนตัว",
		WiPhone:        "0837520194",
		EducationName:  "แพทยศาสตร์บัณฑิต",
		EducationMajor: "แพทยศาสตร์",

		University:     "มหาวิทยาลัยสงขลานครินทร์",
		StartEducation: t1,
		EndEducation:   t1,
		DocPassword: "0123456789",
	}

	ok, err := govalidator.ValidateStruct(user)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("กรุณาใส่อีเมลให้ถูกต้อง"))
}

func TestPhoneDoctorMustBeInValidPattern(t *testing.T) {
	t1, _ := time.Parse("2006-01-02", "2001-07-05")
	g := NewGomegaWithT(t)

	fixtures := []string{
		"1987786788",
		"01234566544",
		"000000000000",
		"1000cccc000000",
		"1000zz00000000",
		"10000000000x",
		"0",
		"xxxxxxxxxx",
	}

	for _, fixture := range fixtures {

		user := Doctor{
			DocterCode:   "D6300237",
			DocterIDCard: "1234567890111",
			FirstNameTH:  "มงคล",
			LastNameTH:   "สุทน",
			FirstNameEN:  "Mongkhon",
	
			LastNameEN: "Suthon",
			Birthday:   t1,
			TelPhone:   fixture,
			TelOffice:  "044641002",
	
			Email:       "lsfvokx",
			AllAddress:  "1/21 หมู่ 7",
			Subdistrict: "ดอนอะราง",
			District:    "หนองกี่",
			Province:    "บุรีรัมย์",
	
			FaIDCard:     "1000067890222",
			FaFirstName:  "ประวิทย์",
			FaLastName:   "สุทน",
			FaOccupation: "ค้าขาย",
			MoIDCard:     "2000067890222",
	
			MoFirstName:  "นาง",
			MoLastName:   "สุทน",
			MoOccupation: "ข้าราชการ",
			WiIDCard:     "3000067890222",
			WiFirstName:  "ณัฐธิดา",
	
			WiLastName:     "สุทธิธรรม",
			WiOccupation:   "ธุรกิจส่วนตัว",
			WiPhone:        "0837520194",
			EducationName:  "แพทยศาสตร์บัณฑิต",
			EducationMajor: "แพทยศาสตร์",
	
			University:     "มหาวิทยาลัยสงขลานครินทร์",
			StartEducation: t1,
			EndEducation:   t1,
			DocPassword: "0123456789",
		}
	

		ok, err := govalidator.ValidateStruct(user)
		g.Expect(ok).ToNot(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("กรุณาใส่อีเมลให้ถูกต้อง"))
	}
}