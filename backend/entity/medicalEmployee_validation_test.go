package entity

import (
	"fmt"
	"testing"

	"github.com/asaskevich/govalidator"
	.	"github.com/onsi/gomega"
)


func TestMedEmployeeCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Check format Med_Employee", func(t *testing.T) {
		m := Med_Employee{
			Name:           "nantawat J",
			Age:           	21,
			Phone:          "0645068380",
			Email:          "med@gmail.com",
			Password:       "0645068380",
			University:     "University",
			EducationName:  "EducationName",
			EducationMajor: "EducationMajor",
		}
		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(m)

		//เช็คว่ามันเป็นค่าจริงไหม
		g.Expect(ok).To(BeTrue())

		//เช็คว่ามันว่างไหม
		g.Expect(err).To((BeNil()))

		fmt.Println(err)
	})
}

func TestPhoneMedicalEmployeeMustBeInValidPattern(t *testing.T) {
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

		m := Med_Employee{
			Name:           "Name",
			Age:           	21,
			Phone:          fixture,
			Email:          "med@gmail.com",
			Password:       "0645068380",
			University:     "University",
			EducationName:  "EducationName",
			EducationMajor: "EducationMajor",
		}

		ok, err := govalidator.ValidateStruct(m)

		// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error() ต้องมี message แสดงออกมา
		g.Expect(err.Error()).To(Equal(fmt.Sprintf(`Phone: %s does not validate as matches(^[0]\d{9}$)`, fixture)))
	}
}
