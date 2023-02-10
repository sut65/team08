package entity

import (
	
	"testing"

	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
)

func TestPatientNameValidate(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	Patient := Patient{
		Patient_Name: "",
		Age:          40,
		Birthday:     "13/08/2344",
		IDCard:       "1234567891234",
		Phone:        "0977897924",
		House_ID:     "123/67",
	}

	ok, err := govalidator.ValidateStruct(Patient)

	g.Expect(ok).ToNot(gomega.BeTrue())

	g.Expect(err).ToNot(gomega.BeNil())

	g.Expect(err.Error()).To(gomega.Equal("กรุณาใส่ชื่อ-นามสกุล"))
}

func TestAgeMustBeInRange(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	Patient := Patient{
		Patient_Name: "Ratchanon K",
		Age:          150,
		Birthday:     "13/08/2344",
		IDCard:       "1234567891234",
		Phone:        "0977897924",
		House_ID:     "123/67",
	}

	ok, err := govalidator.ValidateStruct(Patient)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(gomega.BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(gomega.BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(gomega.Equal("กรุณาใส่อายุให้ถูกต้อง"))

}

func TestBirthdayNotBlank(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	Patient := Patient{
		Patient_Name: "Ratchanon K",
		Age:          40,
		Birthday:     "",
		IDCard:       "1234567891234",
		Phone:        "0977897924",
		House_ID:     "123/67",
	}

	ok, err := govalidator.ValidateStruct(Patient)

	g.Expect(ok).ToNot(gomega.BeTrue())

	g.Expect(err).ToNot(gomega.BeNil())

	g.Expect(err.Error()).To(gomega.Equal("กรุณาใส่วันเดือนปีเกืด"))
}

func TestIDCardMustBeInValidPattern(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	fixtures := []string{
		"0000000000000",
		"0123456654321",
		"000000000000",
		"100000000000",
		"10000000000000",
		"10000000000x",
		"0",
		"xxxxxxxxxxxxx",
	}

	for _, fixture := range fixtures {
		Patient := Patient{
			Patient_Name: "Ratchanon K",
			Age:          40,
			Birthday:     "13/08/2344",
			IDCard:       fixture,
			Phone:        "0977897924",
			House_ID:     "123/67",
		}

		ok, err := govalidator.ValidateStruct(Patient)

		// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(gomega.BeTrue())

		// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(gomega.BeNil())

		// err.Error() ต้องมี message แสดงออกมา
		g.Expect(err.Error()).To(gomega.Equal("กรุณาใส่ข้อมูลรหัสบัตรประชาชนให้ถูกต้องและครบ 13 หลัก"))
	}
}

func TestPhone_PatientMustBeInValidPattern(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	fixtures := []string{
		"1987786788",
		"01234566544",
		"000000000000",
		"1000cccc000000",
		"1000zz00000000",
		"10000000000x",
		"0",
		"xxxxxxxxxx",
	}

	for _, fixture := range fixtures {
		Patient := Patient{
			Patient_Name: "Ratchanon K",
			Age:          40,
			Birthday:     "13/08/2344",
			IDCard:       "1234567891234",
			Phone:        fixture,
			House_ID:     "123/67",
		}

		ok, err := govalidator.ValidateStruct(Patient)

		// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(gomega.BeTrue())

		// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(gomega.BeNil())

		// err.Error() ต้องมี message แสดงออกมา
		g.Expect(err.Error()).To(gomega.Equal("กรุณาใส่เบอร์โทรให้ถูกต้องและครบ 10 หลัก"))
	}
}

func TestHouse_IDNotBlank(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	Patient := Patient{
		Patient_Name: "Ratchanon K",
		Age:          40,
		Birthday:     "13/08/2344",
		IDCard:       "1234567891234",
		Phone:        "0977897924",
		House_ID:     "",
	}

	ok, err := govalidator.ValidateStruct(Patient)

	g.Expect(ok).ToNot(gomega.BeTrue())

	g.Expect(err).ToNot(gomega.BeNil())

	g.Expect(err.Error()).To(gomega.Equal("กรุณาใส่บ้านเลขที่"))
}

func TestIDCardNotBlank(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	Patient := Patient{
		Patient_Name: "Ratchanon K",
		Age:          40,
		Birthday:     "13/08/2344",
		IDCard:       "",
		Phone:        "0977897924",
		House_ID:     "123/67",
	}

	ok, err := govalidator.ValidateStruct(Patient)

	g.Expect(ok).ToNot(gomega.BeTrue())

	g.Expect(err).ToNot(gomega.BeNil())

	g.Expect(err.Error()).To(gomega.Equal("กรุณาใส่รหัสบัตรประชาชน"))
}

func TestPhoneNotBlank(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	Patient := Patient{
		Patient_Name: "Ratchanon K",
		Age:          40,
		Birthday:     "13/08/2344",
		IDCard:       "1234567891234",
		Phone:        "",
		House_ID:     "123/67",
	}

	ok, err := govalidator.ValidateStruct(Patient)

	g.Expect(ok).ToNot(gomega.BeTrue())

	g.Expect(err).ToNot(gomega.BeNil())

	g.Expect(err.Error()).To(gomega.Equal("กรุณาใส่เบอร์โทรศัพท์"))
}

func TestfinishPatient(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	Patient := Patient{
		Patient_Name: "Ratchanon K",
		Age:          40,
		Birthday:     "13/08/2344",
		IDCard:       "1234567891234",
		Phone:        "0977897924",
		House_ID:     "123/67",
	}

	ok, err := govalidator.ValidateStruct(Patient)

	g.Expect(ok).To(gomega.BeTrue())

	g.Expect(err).To(gomega.BeNil())


}