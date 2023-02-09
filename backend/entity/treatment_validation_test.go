package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
)

///1
func TestTreatmentPass(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	Treatment := Treatment{
		TREATMENT_ID: "T222222",
		TREATMENT:    "ปวดหลัง",
		DATE:         time.Now(),
		APPOINTMENT:  10,
		CONCLUSION:   "ตรวจพบหมอนรองกระดูกด้วย",
		GUIDANCE:     "นั่งให้ถูกลักษณะ",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Treatment)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(gomega.BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).To(gomega.BeNil())
}

