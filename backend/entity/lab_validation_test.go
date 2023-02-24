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
        Value:    "-483454596.48459010002149649099009090032",
    }

    ok, err := govalidator.ValidateStruct(user)
    g.Expect(ok).NotTo(BeTrue())
    g.Expect(err).NotTo(BeNil())
    g.Expect(err.Error()).To(Equal("สามารถกรอกค่าแลปได้สูงสุด 15 ตัวอักษรเท่านั้น"))
}

func TestValueNotSpecialCharacters(t *testing.T) {
    g := NewGomegaWithT(t)

    fixtures := []string{
        "pl",
        "3.6po",
        "1.1#",
        "$#",
        "xxxxxxxxxx",
    }

    for _, fixture := range fixtures {

        user := Lab{
            Lab_test: "negative",
            Value:    fixture,
        }

        ok, err := govalidator.ValidateStruct(user)
        g.Expect(ok).ToNot(BeTrue())
        g.Expect(err).ToNot(BeNil())
        g.Expect(err.Error()).To(Equal("กรุณากรอกเป็นตัวเลขทศนิยม"))
    }
}