package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
)

// /1
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

// ////2
func TestTreatmentID(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	// เช็คข้อมูล TREATMENT_ID จะต้องขึ้นต้นด้วย T ตามด้วยเลข 6 ตัว
	Treatment := Treatment{
		TREATMENT_ID: "T123",
		TREATMENT:    "ปวดหลัง",
		DATE:         time.Now(),
		APPOINTMENT:  10,
		CONCLUSION:   "ตรวจพบหมอนรองกระดูกด้วย",
		GUIDANCE:     "นั่งให้ถูกลักษณะ",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Treatment)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).ToNot(gomega.BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).ToNot(gomega.BeNil())

	g.Expect(err.Error()).To(gomega.Equal("ผิดรูปแบบ ตัวอย่าง:Txxxxxx"))
}

// ///3
func TestTreatment_APPOINTMENT(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	// เช็คข้อมูล APPOINTMENT จะต้องอยู่ในช่วง 0-100
	Treatment := Treatment{
		TREATMENT_ID: "T666666",
		TREATMENT:    "ปวดหลัง",
		DATE:         time.Now(),
		APPOINTMENT:  101,
		CONCLUSION:   "ตรวจพบหมอนรองกระดูกด้วย",
		GUIDANCE:     "นั่งให้ถูกลักษณะ",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Treatment)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).ToNot(gomega.BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).ToNot(gomega.BeNil())

	g.Expect(err.Error()).To(gomega.Equal(" กรุณากรอกค่าที่อยู่ในช่วง 1-100"))
}

// //////4
func TestTreatment_DATE(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	// เช็คข้อมูล DATE จะต้องไม่เป็นอดีต
	Treatment := Treatment{
		TREATMENT_ID: "T666666",
		TREATMENT:    "ปวดหลัง",
		DATE:         time.Date(2021, 1, 1, 12, 00, 00, 00, time.UTC),
		APPOINTMENT:  20,
		CONCLUSION:   "ตรวจพบหมอนรองกระดูกด้วย",
		GUIDANCE:     "นั่งให้ถูกลักษณะ",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Treatment)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).ToNot(gomega.BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).ToNot(gomega.BeNil())

	g.Expect(err.Error()).To(gomega.Equal(" กรุณาเลือกเวลาที่เป็นปัจจุบัน"))
}

// ///5
func TestTreatment_TREATMENT(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	// เช็คข้อมูล TREATMENT = ไม่เกิน20ตัว
	Treatment := Treatment{
		TREATMENT_ID: "T666666",
		TREATMENT:    "ปวดหลังงงงงงงงงงงงงงงงงงงงงงงงง",
		DATE:         time.Now(),
		APPOINTMENT:  20,
		CONCLUSION:   "ตรวจพบหมอนรองกระดูกด้วย",
		GUIDANCE:     "นั่งให้ถูกลักษณะ",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Treatment)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).ToNot(gomega.BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).ToNot(gomega.BeNil())

	g.Expect(err.Error()).To(gomega.Equal("กรอกค่าได้สูงสุด20ตัวอักษร"))
}

func TestCONCLUSION_NotBlank(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	Treatment := Treatment{
		TREATMENT_ID: "T123456",
		TREATMENT:    "ปวดหลัง",
		DATE:         time.Now(),
		APPOINTMENT:  20,
		CONCLUSION:   "",
		GUIDANCE:     "นั่งให้ถูกลักษณะ",
	}

	ok, err := govalidator.ValidateStruct(Treatment)

	g.Expect(ok).ToNot(gomega.BeTrue())

	g.Expect(err).ToNot(gomega.BeNil())

	g.Expect(err.Error()).To(gomega.Equal(" กรุณากรอกสรุปผลการรักษา"))
}

func TestCGUIDANCE_NotBlank(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	Treatment := Treatment{
		TREATMENT_ID: "T123456",
		TREATMENT:    "ปวดหลัง",
		DATE:         time.Now(),
		APPOINTMENT:  20,
		CONCLUSION:   "ออฟฟิตซินโดม",
		GUIDANCE:     "",
	}

	ok, err := govalidator.ValidateStruct(Treatment)

	g.Expect(ok).ToNot(gomega.BeTrue())

	g.Expect(err).ToNot(gomega.BeNil())

	g.Expect(err.Error()).To(gomega.Equal(" กรุณากรอกคำแนะนำ"))
}

func TestTREATMENT_NotBlank(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	Treatment := Treatment{
		TREATMENT_ID: "T123456",
		TREATMENT:    "",
		DATE:         time.Now(),
		APPOINTMENT:  20,
		CONCLUSION:   "ออฟฟิตซินโดม",
		GUIDANCE:     "นั่งให้ถูกลักษณะ",
	}

	ok, err := govalidator.ValidateStruct(Treatment)

	g.Expect(ok).ToNot(gomega.BeTrue())

	g.Expect(err).ToNot(gomega.BeNil())

	g.Expect(err.Error()).To(gomega.Equal(" กรุณากรอกอาการเบื้องต้น"))
}
func TestTREATMENTID_NotBlank(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	Treatment := Treatment{
		TREATMENT_ID: "",
		TREATMENT:    "ไข้สูง",
		DATE:         time.Now(),
		APPOINTMENT:  20,
		CONCLUSION:   "ออฟฟิตซินโดม",
		GUIDANCE:     "นั่งให้ถูกลักษณะ",
	}

	ok, err := govalidator.ValidateStruct(Treatment)

	g.Expect(ok).ToNot(gomega.BeTrue())

	g.Expect(err).ToNot(gomega.BeNil())

	g.Expect(err.Error()).To(gomega.Equal("เลขกำกับห้ามเป็นค่าว่าง ตัวอย่าง:Txxxxxx"))
}

func TestTreatment_CONCLUSION(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	// เช็คข้อมูล CONCLUSION = ไม่เกิน100ตัว
	Treatment := Treatment{
		TREATMENT_ID: "T666666",
		TREATMENT:    "ปวดหลังง",
		DATE:         time.Now(),
		APPOINTMENT:  20,
		CONCLUSION:   "ตรวจพบหมอนรองกระดูกด้วยอันตรายมากๆต้องได้รับการผ่าตัดดต้องได้รับการผ่าตัดดต้องได้รับการผ่าตัดดต้องได้รับการผ่าตัดดต้องได้รับการผ่าตัดดต้องได้รับการผ่าตัดดต้องได้รับการผ่าตัดดต้องได้รับการผ่าตัดดต้องได้รับการผ่าตัดดต้องได้รับการผ่าตัดดต้องได้รับการผ่าตัดด",
		GUIDANCE:     "นั่งให้ถูกลักษณะ",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Treatment)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).ToNot(gomega.BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).ToNot(gomega.BeNil())

	g.Expect(err.Error()).To(gomega.Equal("กรอกค่าได้สูงสุด100ตัวอักษร"))
}

func TestTreatment_GUIDANCE(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	//  เช็คข้อมูล GUIDANCE = ไม่เกิน100ตัว
	Treatment := Treatment{
		TREATMENT_ID: "T666666",
		TREATMENT:    "ปวดหลัง",
		DATE:         time.Now(),
		APPOINTMENT:  20,
		CONCLUSION:   "ตรวจพบหมอนรองกระดูกด้วย",
		GUIDANCE:     "นั่งให้ถูกลักษณะไม่อย่างนั้นจะไม่หายและยิ่งจะเป็นอันตรายไม่อย่างนั้นจะไม่หายและยิ่งจะเป็นอันตรายไม่อย่างนั้นจะไม่หายและยิ่งจะเป็นอันตรายไม่อย่างนั้นจะไม่หายและยิ่งจะเป็นอันตรายไม่อย่างนั้นจะไม่หายและยิ่งจะเป็นอันตรายไม่อย่างนั้นจะไม่หายและยิ่งจะเป็นอันตรายไม่อย่างนั้นจะไม่หายและยิ่งจะเป็นอันตรายไม่อย่างนั้นจะไม่หายและยิ่งจะเป็นอันตรายไม่อย่างนั้นจะไม่หายและยิ่งจะเป็นอันตรายไม่อย่างนั้นจะไม่หายและยิ่งจะเป็นอันตรายไม่อย่างนั้นจะไม่หายและยิ่งจะเป็นอันตราย",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Treatment)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).ToNot(gomega.BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).ToNot(gomega.BeNil())

	g.Expect(err.Error()).To(gomega.Equal("กรอกค่าได้สูงสุด100ตัวอักษร"))
}
