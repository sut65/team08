package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
)

func Test_DispenseText(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	dispen := Dispense{
		Date:   time.Now(),
		Number: 20,
		Text:   "gkfodgdfhfhjfipx[odhjdigkjhndgpspigkbdpgkfodgdfhfhjfipx[odhjdigkjhndgpspigkbdpgkfodgdfhfhjfipx[odhjdfffffff",
	}
	ok, err := govalidator.ValidateStruct(dispen)
	g.Expect(ok).NotTo(gomega.BeTrue())
	g.Expect(err).ToNot(gomega.BeNil())
	g.Expect(err.Error()).To(gomega.Equal("Please enter details"))
}

func Test_DispenseTime(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	dispen := Dispense{
		Date:   time.Date(2000, 1, 26, 0, 0, 0, 0, time.UTC),
		Number: 10,
		Text:   "Sabaithip",
	}
	ok, err := govalidator.ValidateStruct(dispen)
	g.Expect(ok).NotTo(gomega.BeTrue())
	g.Expect(err).ToNot(gomega.BeNil())
	g.Expect(err.Error()).To(gomega.Equal("Please enter the current time"))
}

func Test_DispenseNumber(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	dispen := Dispense{
		Date:   time.Now(),
		Number: 120,
		Text:   "Sabaithip",
	}
	ok, err := govalidator.ValidateStruct(dispen)
	g.Expect(ok).NotTo(gomega.BeTrue())
	g.Expect(err).ToNot(gomega.BeNil())
	g.Expect(err.Error()).To(gomega.Equal("Number: 120 does not validate as range(0|100)"))
}

func Test_DispenseAll(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	dispen := Dispense{
		Date:   time.Now(),
		Number: 20,
		Text:   "Sabaithip",
	}
	ok, err := govalidator.ValidateStruct(dispen)
	g.Expect(ok).To(gomega.BeTrue())
	g.Expect(err).To(gomega.BeNil())
}
