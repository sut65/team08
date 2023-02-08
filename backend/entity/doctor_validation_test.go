package entity

import (
	"testing"
	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
	"time"
)

func TestUserNameNotBlank(t *testing.T) {
	t1, _ := time.Parse("2006-01-02", "2001-07-05")
	g := gomega.NewGomegaWithT(t)

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

	g.Expect(ok).ToNot(gomega.BeTrue())

	g.Expect(err).ToNot(gomega.BeNil())

	g.Expect(err.Error()).To(gomega.Equal("Name cannot be blank"))
}


