package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
)
//////1
func TestRequestPass(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	Request := Request{
		R_ID:     "R100002",
		R_NAME:   "ตรวจเลือด",
		QUANTITY: 500,
		TIME:     time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Request)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(gomega.BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).To(gomega.BeNil())
}
 ///////2
func TestRequestID(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	// เช็คข้อมูล RequestID จะต้องขึ้นต้นด้วย R ตามด้วยเลข 6 ตัว
	Request := Request{
		R_ID:     "R12333",
		R_NAME:   "ตรวจปัจสาวะ",
		QUANTITY: 200,
		TIME:     time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Request)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).ToNot(gomega.BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).ToNot(gomega.BeNil())

	g.Expect(err.Error()).To(gomega.Equal("R cannot be blank"))
}
//////3
func TestRequest_QUANTITY(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	// เช็คข้อมูล APPOINTMENT จะต้องอยู่ในช่วง 1-2000
	Request := Request{
		R_ID:     "R222222",
		R_NAME:   "ตรวจปัจสาวะ",
		QUANTITY: 2001,
		TIME:     time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Request)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).ToNot(gomega.BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).ToNot(gomega.BeNil())

	g.Expect(err.Error()).To(gomega.Equal("QUANTITY: 2001 does not validate as range(1|2000)"))
}