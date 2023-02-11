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
		Date:        time.Now(),
		Number:      20,
		Text:        "gkfodgdfhfhjfipx[odhjdigkjhndgpspigkbdpgkfodgdfhfhjfipx[odhjdigkjhndgpspigkbdpgkfodgdfhfhjfipx[odhjdfffffff",
		Dispense_ID: "DP123456",
	}
	ok, err := govalidator.ValidateStruct(dispen)
	g.Expect(ok).NotTo(gomega.BeTrue())
	g.Expect(err).ToNot(gomega.BeNil())
	g.Expect(err.Error()).To(gomega.Equal("โปรดระบุรายละเอียดของยาไม่เกิน 50 ตัวอักษร"))
}
func Test_DispenseTextNotNull(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	dispen := Dispense{
		Date:        time.Now(),
		Number:      20,
		Text:        "",
		Dispense_ID: "DP123456",
	}
	ok, err := govalidator.ValidateStruct(dispen)
	g.Expect(ok).NotTo(gomega.BeTrue())
	g.Expect(err).ToNot(gomega.BeNil())
	g.Expect(err.Error()).To(gomega.Equal("โปรดระบุรายละเอียดของยา"))
}

func Test_DispenseTime(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	dispen := Dispense{
		Date:        time.Date(2000, 1, 26, 0, 0, 0, 0, time.UTC),
		Number:      10,
		Text:        "Sabaithip",
		Dispense_ID: "DP123456",
	}
	ok, err := govalidator.ValidateStruct(dispen)
	g.Expect(ok).NotTo(gomega.BeTrue())
	g.Expect(err).ToNot(gomega.BeNil())
	g.Expect(err.Error()).To(gomega.Equal("โปรดระบุวันที่และเวลาเป็นปัจจุบัน"))
}

func Test_DispenseNumber(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	dispen := Dispense{
		Date:        time.Now(),
		Number:      120,
		Text:        "Sabaithip",
		Dispense_ID: "DP123456",
	}
	ok, err := govalidator.ValidateStruct(dispen)
	g.Expect(ok).NotTo(gomega.BeTrue())
	g.Expect(err).ToNot(gomega.BeNil())
	g.Expect(err.Error()).To(gomega.Equal("กรุณาใส่จำนวนยาให้ถูกต้อง"))
}

func Test_Dispense_ID(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	dispen := Dispense{
		Date:        time.Now(),
		Number:      20,
		Text:        "Sabaithip",
		Dispense_ID: "DP123",
	}
	ok, err := govalidator.ValidateStruct(dispen)
	g.Expect(ok).NotTo(gomega.BeTrue())
	g.Expect(err).ToNot(gomega.BeNil())
	g.Expect(err.Error()).To(gomega.Equal("ผิดรูปแบบ ตัวอย่าง:DPxxxxxx"))
}

func Test_Dispense_NotNullID(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	dispen := Dispense{
		Date:        time.Now(),
		Number:      20,
		Text:        "Sabaithip",
		Dispense_ID: "",
	}
	ok, err := govalidator.ValidateStruct(dispen)
	g.Expect(ok).NotTo(gomega.BeTrue())
	g.Expect(err).ToNot(gomega.BeNil())
	g.Expect(err.Error()).To(gomega.Equal("หมายเลขการจ่ายยาเป็นค่าว่าง ตัวอย่าง:DPxxxxxx"))
}

func Test_DispenseAll(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	dispen := Dispense{
		Date:        time.Now(),
		Number:      20,
		Text:        "Sabaithip",
		Dispense_ID: "DP123456",
	}
	ok, err := govalidator.ValidateStruct(dispen)
	g.Expect(ok).To(gomega.BeTrue())
	g.Expect(err).To(gomega.BeNil())
}
