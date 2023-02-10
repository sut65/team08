package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
)

//หมายเลขการผ่าตัดขึ้นต้นด้วย OP ตามตัวเลข 6 ตัว
func Test_Save_ITI_NumOper(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	testoper := Operating_Room{
		NumOper: "OP1",
		Datetime: time.Now().Add(24 * time.Hour),
		TextOper: "aaaaaaaaaaaaaaaa",
	}
	ok, err := govalidator.ValidateStruct(testoper)
	g.Expect(ok).NotTo(gomega.BeTrue())
	g.Expect(err).ToNot(gomega.BeNil())
	g.Expect(err.Error()).To(gomega.Equal("ผิดรูปแบบ ตัวอย่าง:OPxxxxxx"))
}

////หมายเลขการผ่าตัดห้ามว่าง
func Test_Save_ITI_NumOperNotNull(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	testoper := Operating_Room{
		NumOper: "",
		Datetime: time.Now().Add(24 * time.Hour),
		TextOper: "aaaaaaaaaaaaaaaa",
	}
	ok, err := govalidator.ValidateStruct(testoper)
	g.Expect(ok).NotTo(gomega.BeTrue())
	g.Expect(err).ToNot(gomega.BeNil())
	g.Expect(err.Error()).To(gomega.Equal("หมายเลขการผ่าตัดห้ามเป็นค่าว่าง ตัวอย่าง:OPxxxxxx"))
}

// เช็คเวลาเป็นปัจจุบัน
// func Test_Save_ITI_Datetime(t *testing.T) {
// 	g := gomega.NewGomegaWithT(t)

// 	testoper := Operating_Room{
// 		NumOper: "OP0000001",
// 		Datetime: time.Now().Add(24 * time.Hour),
// 		TextOper: "aaaaaaaaaaaaaaaa",
// 	}
// 	ok, err := govalidator.ValidateStruct(testoper)
// 	g.Expect(ok).NotTo(gomega.BeTrue())
// 	g.Expect(err).ToNot(gomega.BeNil())
// 	g.Expect(err.Error()).To(gomega.Equal("หมายเลขการผ่าตัดห้ามเป็นค่าว่าง ตัวอย่าง:OPxxxxxx"))
// }

// // เช็คเวลาเป็นอนาคต
// func Test_Save_ITI_Date_checkout(t *testing.T) {
// 	g := gomega.NewGomegaWithT(t)

// 	testsave := Save_ITI{
// 		Date_checkin:  time.Now(),
// 	    Date_checkout: time.Now(),
// 	    TextSave: "aaaaaaaaaaaa",
// 	}
// 	ok, err := govalidator.ValidateStruct(testsave)
// 	g.Expect(ok).NotTo(gomega.BeTrue())
// 	g.Expect(err).ToNot(gomega.BeNil())
// 	g.Expect(err.Error()).To(gomega.Equal("โปรดระบุวันที่และเวลาให้ถูกต้อง"))
// }

// // เช็คขอมูลการกรอกครบทั้งหมด
// func Test_Save_ITI_All(t *testing.T) {
// 	g := gomega.NewGomegaWithT(t)

// 	testsave := Save_ITI{
// 		Date_checkin:  time.Now(),
// 	    Date_checkout: time.Now().Add(24 * time.Hour),
// 	    TextSave: "aaaaaaaaaaaa",
// 	}
// 	ok, err := govalidator.ValidateStruct(testsave)
// 	g.Expect(ok).To(gomega.BeTrue())
// 	g.Expect(err).To(gomega.BeNil())
// }
