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
 