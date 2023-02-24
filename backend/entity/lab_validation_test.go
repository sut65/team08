package entity

import (
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestLabNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	user := Lab{
		Lab_test: "negative",
		Value:    "",
	}
	ok, err := govalidator.ValidateStruct(user)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("กรุณากรอกค่ารายงานผล"))
}

func TestValueMaxcharector15(t *testing.T) {
    g := NewGomegaWithT(t)

    user := Lab{
        Lab_test: "negative",
        Value:    "234349483454596.4845949649099009090032",
    }

    ok, err := govalidator.ValidateStruct(user)
    g.Expect(ok).NotTo(BeTrue())
    g.Expect(err).NotTo(BeNil())
    g.Expect(err.Error()).To(Equal("สามารถกรอกค่าแลปได้สูงสุด 15 ตัวอักษรเท่านั้น"))
}
