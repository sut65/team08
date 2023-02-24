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

