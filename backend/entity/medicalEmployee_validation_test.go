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
