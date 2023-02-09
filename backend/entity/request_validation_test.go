package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
)

// ////1
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

// /////2
func TestRequestID(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	// เช็คข้อมูล RequestID จะต้องขึ้นต้นด้วย R ตามด้วยเลข 6 ตัว
	Request := Request{
		R_ID:     "R12345",
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

	g.Expect(err.Error()).To(gomega.Equal("R cannot be blank :Rxxxxxx"))
}

// ////3
func TestRequest_QUANTITY(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	// เช็คข้อมูล APPOINTMENT จะต้องอยู่ในช่วง 1-1000
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

	g.Expect(err.Error()).To(gomega.Equal("QUANTITY: 2001 does not validate as range(1|1000)"))
}

// ////4
func TestRequest_DATE(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	// เช็คข้อมูล DATE จะต้องไม่เป็นอดีต
	Request := Request{
		R_ID:     "R123456",
		R_NAME:   "ตรวจเม็ดเลือดขาว",
		QUANTITY: 1500,
		TIME:     time.Date(2021, 1, 1, 12, 00, 00, 00, time.UTC),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Request)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).ToNot(gomega.BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).ToNot(gomega.BeNil())

	g.Expect(err.Error()).To(gomega.Equal("Please enter the current time"))
}

// //////5
func TestRequest_DATETREATMENT(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	// เช็คข้อมูล DATE จะต้องไม่เป็นอดีต
	Request := Request{
		R_ID:     "R100002",
		R_NAME:   "ตรวจเลือดดดดดดดดดดดดดดดดดดดดดดดด",
		QUANTITY: 800,
		TIME:     time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Request)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).ToNot(gomega.BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).ToNot(gomega.BeNil())

	g.Expect(err.Error()).To(gomega.Equal("Please enter details (20)"))
}
