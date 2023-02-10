package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
)

//หมายเลขการผ่าตัดขึ้นต้นด้วย OP ตามตัวเลข 6 ตัว
func Test_Operating_Room_NumOper(t *testing.T) {
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
func Test_Operating_Room_NumOperNotNull(t *testing.T) {
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

//เช็คเวลาเป็นปัจจุบัน
func Test_Operating_Room_Datetime(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	testoper := Operating_Room{
		NumOper: "OP000001",
		Datetime: time.Date(2000, 1, 26, 0, 0, 0, 0, time.UTC),
		TextOper: "aaaaaaaaaaaaaaaa",
	}
	ok, err := govalidator.ValidateStruct(testoper)
	g.Expect(ok).NotTo(gomega.BeTrue())
	g.Expect(err).ToNot(gomega.BeNil())
	g.Expect(err.Error()).To(gomega.Equal("โปรดระบุวันที่และเวลาให้ถูกต้อง"))
}

//แผนการรักษากรอกไม่เกิน 200 ตัว
func Test_Operating_Room_TextOper(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	testoper := Operating_Room{
		NumOper: "OP000001",
	    Datetime: time.Now().Add(24 * time.Hour),
	    TextOper: "gkfodgdfhfhjfipx[odhjdigkjhndgpฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟspigkbdpgkfodgdfhfhjfipx[odhjdigkjhndgpspigkbdpgkfodgdfhfhjfipx[odhjdfffffffgkfodgdfhfhjfipx[odhjdigkjhndgpspigkbdpgkfodgdfhfhjfipx[odhjdigkjhndgpspigkbdpgkfodgdfhfhjfipx[odhjdfffffffgkfodgdfhfhjfipx[odhjdigkjhndgpspigkbdpgkfodgdfhfhjfipx[odhjdigkjhndgpspigkbdpgkfodgdfhfhjfipx[odhjdfffffffgkfodgdfhfhjfipx[odhjdigkjhndgpspigkbdpgkfodgdfhfhjfipx[odhjdigkjhndgpspigkbdpgkfodgdfhfhjfipx[odhjdfffffff",
	}
	ok, err := govalidator.ValidateStruct(testoper)
	g.Expect(ok).NotTo(gomega.BeTrue())
	g.Expect(err).ToNot(gomega.BeNil())
	g.Expect(err.Error()).To(gomega.Equal("โปรดระบุรายละเอียดการผ่าตัดไม่เกิน 200 ตัวอักษร"))
}

////แผนการรักษาไม่ได้กรอก
func Test_Operating_Room_TextOperNotNull(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	testoper := Operating_Room{
		NumOper: "OP000001",
	    Datetime: time.Now().Add(24 * time.Hour),
	    TextOper: "",
	}
	ok, err := govalidator.ValidateStruct(testoper)
	g.Expect(ok).NotTo(gomega.BeTrue())
	g.Expect(err).ToNot(gomega.BeNil())
	g.Expect(err.Error()).To(gomega.Equal("โปรดระบุรายละเอียดการผ่าตัด"))
}

// เช็คข้อมูลการกรอกครบทั้งหมด
func Test_Operating_Room_All(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	testoper := Operating_Room{
		NumOper: "OP000001",
	    Datetime: time.Now().Add(24 * time.Hour),
	    TextOper: "aaaaaaaaaaa",
	}
	ok, err := govalidator.ValidateStruct(testoper)
	g.Expect(ok).To(gomega.BeTrue())
	g.Expect(err).To(gomega.BeNil())
}
