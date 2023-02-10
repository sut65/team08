package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
)

//แผนการรักษากรอกไม่เกิน 200 ตัว
func Test_Save_ITI_TextSave(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	testsave := Save_ITI{
		Date_checkin:  time.Now(),
	    Date_checkout: time.Now().Add(24 * time.Hour),
	    TextSave: "gkfodgdfhfhjfipx[odhjdigkjhndgpspigkbdpgkfodgdfhfhjfipx[odhjdigkjhndgpspigkbdpgkfodgdfhfhjfipx[odhjdfffffffgkfodgdfhfhjfipx[odhjdigkjhndgpspigkbdpgkfodgdfhfhjfipx[odhjdigkjhndgpspigkbdpgkfodgdfhfhjfipx[odhjdfffffffgkfodgdfhfhjfipx[odhjdigkjhndgpspigkbdpgkfodgdfhfhjfipx[odhjdigkjhndgpspigkbdpgkfodgdfhfhjfipx[odhjdfffffffgkfodgdfhfhjfipx[odhjdigkjhndgpspigkbdpgkfodgdfhfhjfipx[odhjdigkjhndgpspigkbdpgkfodgdfhfhjfipx[odhjdfffffff",
	}
	ok, err := govalidator.ValidateStruct(testsave)
	g.Expect(ok).NotTo(gomega.BeTrue())
	g.Expect(err).ToNot(gomega.BeNil())
	g.Expect(err.Error()).To(gomega.Equal("โปรดระบุรายละเอียดแผนการรักษาไม่เกิน 200 ตัวอักษร"))
}

////แผนการรักษาไม่ได้กรอก
func Test_Save_ITI_TextSaveNotNull(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	testsave := Save_ITI{
		Date_checkin:  time.Now(),
	    Date_checkout: time.Now().Add(24 * time.Hour),
	    TextSave: "",
	}
	ok, err := govalidator.ValidateStruct(testsave)
	g.Expect(ok).NotTo(gomega.BeTrue())
	g.Expect(err).ToNot(gomega.BeNil())
	g.Expect(err.Error()).To(gomega.Equal("โปรดระบุรายละเอียดแผนการรักษา"))
}

// เช็คเวลาเป็นปัจจุบัน
func Test_Save_ITI_Date_checkin(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	testsave := Save_ITI{
		Date_checkin:  time.Date(2000, 1, 26, 0, 0, 0, 0, time.UTC),
	    Date_checkout: time.Now().Add(24 * time.Hour),
	    TextSave: "aaaaaaaaaaaa",
	}
	ok, err := govalidator.ValidateStruct(testsave)
	g.Expect(ok).NotTo(gomega.BeTrue())
	g.Expect(err).ToNot(gomega.BeNil())
	g.Expect(err.Error()).To(gomega.Equal("โปรดระบุวันที่และเวลาให้ถูกต้อง"))
}

// เช็คเวลาเป็นอนาคต
func Test_Save_ITI_Date_checkout(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	testsave := Save_ITI{
		Date_checkin:  time.Now(),
	    Date_checkout: time.Now(),
	    TextSave: "aaaaaaaaaaaa",
	}
	ok, err := govalidator.ValidateStruct(testsave)
	g.Expect(ok).NotTo(gomega.BeTrue())
	g.Expect(err).ToNot(gomega.BeNil())
	g.Expect(err.Error()).To(gomega.Equal("โปรดระบุวันที่และเวลาให้ถูกต้อง"))
}

// เช็คขอมูลการกรอกครบทั้งหมด
func Test_Save_ITI_All(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	testsave := Save_ITI{
		Date_checkin:  time.Now(),
	    Date_checkout: time.Now().Add(24 * time.Hour),
	    TextSave: "aaaaaaaaaaaa",
	}
	ok, err := govalidator.ValidateStruct(testsave)
	g.Expect(ok).To(gomega.BeTrue())
	g.Expect(err).To(gomega.BeNil())
}
