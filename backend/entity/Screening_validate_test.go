package entity

import (
	"testing"

	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
)

func TestScreening_officerNameValidate(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	Screening_officer := Screening_officer{
		Screening_officer_Name: "",
		Birthday:               "13/08/2344",
		ScreeningIDCard:        "1234567891234",
		Phone:                  "0977897924",
		Email:                  "pp@gmail.com",
		EducationName:          "nursing",
		EducationMajor:         "Children and adolescent branch",
		University:             "Suranaree university",
	}

	ok, err := govalidator.ValidateStruct(Screening_officer)

	g.Expect(ok).ToNot(gomega.BeTrue())

	g.Expect(err).ToNot(gomega.BeNil())

	g.Expect(err.Error()).To(gomega.Equal("กรุณาใส่ชื่อ..นามสกุล"))
}

func TestBirthday_ScNotBlank(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	Screening_officer := Screening_officer{
		Screening_officer_Name: "Ratcahnon K",
		Birthday:               "",
		ScreeningIDCard:        "1234567891234",
		Phone:                  "0977897924",
		Email:                  "pp@gmail.com",
		EducationName:          "nursing",
		EducationMajor:         "Children and adolescent branch",
		University:             "Suranaree university",
	}

	ok, err := govalidator.ValidateStruct(Screening_officer)

	g.Expect(ok).ToNot(gomega.BeTrue())

	g.Expect(err).ToNot(gomega.BeNil())

	g.Expect(err.Error()).To(gomega.Equal("กรุณาใส่วันเดือนปีเกิด"))
}

func TestPhone_ScMustBeInValidPattern(t *testing.T) {
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

		Screening_officer := Screening_officer{
			Screening_officer_Name: "Ratcahnon K",
			Birthday:               "13/04/2444",
			ScreeningIDCard:        "1234567891234",
			Phone:                  fixture,
			Email:                  "pp@gmail.com",
			EducationName:          "nursing",
			EducationMajor:         "Children and adolescent branch",
			University:             "Suranaree university",
		}

		ok, err := govalidator.ValidateStruct(Screening_officer)

		// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(gomega.BeTrue())

		// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(gomega.BeNil())

		// err.Error() ต้องมี message แสดงออกมา
		g.Expect(err.Error()).To(gomega.Equal("กรุณาใส่เบอร์โทรให้ถูกต้องและครบ 10 หลัก"))
	}
}

func TestPhone_ScNotBlank(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	Screening_officer := Screening_officer{
		Screening_officer_Name: "Ratcahnon K",
		Birthday:               "13/04/2444",
		ScreeningIDCard:        "1234567891234",
		Phone:                  "",
		Email:                  "pp@gmail.com",
		EducationName:          "nursing",
		EducationMajor:         "Children and adolescent branch",
		University:             "Suranaree university",
	}

	ok, err := govalidator.ValidateStruct(Screening_officer)

	g.Expect(ok).ToNot(gomega.BeTrue())

	g.Expect(err).ToNot(gomega.BeNil())

	g.Expect(err.Error()).To(gomega.Equal("กรุณาใส่เบอร์โทรศัพท์"))
}

func TestIDCard_ScMustBeInValidPattern(t *testing.T) {
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

		Screening_officer := Screening_officer{
			Screening_officer_Name: "Ratcahnon K",
			Birthday:               "13/04/2444",
			ScreeningIDCard:        fixture,
			Phone:                  "0956768766",
			Email:                  "pp@gmail.com",
			EducationName:          "nursing",
			EducationMajor:         "Children and adolescent branch",
			University:             "Suranaree university",
		}

		ok, err := govalidator.ValidateStruct(Screening_officer)

		// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(gomega.BeTrue())

		// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(gomega.BeNil())

		// err.Error() ต้องมี message แสดงออกมา
		g.Expect(err.Error()).To(gomega.Equal("กรุณาใส่ข้อมูลรหัสบัตรประชาชนให้ถูกต้องและครบ 13 หลัก"))
	}
}

func TestIDCard_ScNotBlank(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	Screening_officer := Screening_officer{
		Screening_officer_Name: "Ratcahnon K",
		Birthday:               "13/04/2444",
		ScreeningIDCard:        "",
		Phone:                  "0956768766",
		Email:                  "pp@gmail.com",
		EducationName:          "nursing",
		EducationMajor:         "Children and adolescent branch",
		University:             "Suranaree university",
	}

	ok, err := govalidator.ValidateStruct(Screening_officer)

	g.Expect(ok).ToNot(gomega.BeTrue())

	g.Expect(err).ToNot(gomega.BeNil())

	g.Expect(err.Error()).To(gomega.Equal("กรุณาใส่รหัสบัตรประชาชน"))
}

func TestEducationNameNotBlank(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	Screening_officer := Screening_officer{
		Screening_officer_Name: "Ratcahnon K",
		Birthday:               "13/04/2444",
		ScreeningIDCard:        "1234567891234",
		Phone:                  "0956768766",
		Email:                  "pp@gmail.com",
		EducationName:          "",
		EducationMajor:         "Children and adolescent branch",
		University:             "Suranaree university",
	}

	ok, err := govalidator.ValidateStruct(Screening_officer)

	g.Expect(ok).ToNot(gomega.BeTrue())

	g.Expect(err).ToNot(gomega.BeNil())

	g.Expect(err.Error()).To(gomega.Equal("กรุณาใส่ชื่อปริญญา"))
}

func TestEducationMajorNotBlank(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	Screening_officer := Screening_officer{
		Screening_officer_Name: "Ratcahnon K",
		Birthday:               "13/04/2444",
		ScreeningIDCard:        "1234567891234",
		Phone:                  "0956768766",
		Email:                  "pp@gmail.com",
		EducationName:          "nursing",
		EducationMajor:         "",
		University:             "Suranaree university",
	}

	ok, err := govalidator.ValidateStruct(Screening_officer)

	g.Expect(ok).ToNot(gomega.BeTrue())

	g.Expect(err).ToNot(gomega.BeNil())

	g.Expect(err.Error()).To(gomega.Equal("กรุณาใส่ชื่อสาขา"))
}

func TestUniversityMajorNotBlank(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	Screening_officer := Screening_officer{
		Screening_officer_Name: "Ratcahnon K",
		Birthday:               "13/04/2444",
		ScreeningIDCard:        "1234567891234",
		Phone:                  "0956768766",
		Email:                  "pp@gmail.com",
		EducationName:          "nursing",
		EducationMajor:         "Children and adolescent branch",
		University:             "",
	}

	ok, err := govalidator.ValidateStruct(Screening_officer)

	g.Expect(ok).ToNot(gomega.BeTrue())

	g.Expect(err).ToNot(gomega.BeNil())

	g.Expect(err.Error()).To(gomega.Equal("กรุณาใส่ชื่อมหาลัย"))
}

func TestEmailMustBeInValidPattern(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	Screening_officer := Screening_officer{
		Screening_officer_Name: "Ratcahnon K",
		Birthday:               "13/04/2444",
		ScreeningIDCard:        "1234567891234",
		Phone:                  "0956768766",
		Email:                  "dfgdfg",
		EducationName:          "nursing",
		EducationMajor:         "Children and adolescent branch",
		University:             "Suranaree university",
	}

	ok, err := govalidator.ValidateStruct(Screening_officer)

	g.Expect(ok).ToNot(gomega.BeTrue())

	g.Expect(err).ToNot(gomega.BeNil())

	g.Expect(err.Error()).To(gomega.Equal("กรุณาใส่อีเมลให้ถูกต้อง"))
}

func TestfinishSc_officer(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	Screening_officer := Screening_officer{
		Screening_officer_Name: "Ratcahnon K",
		Birthday:               "13/04/2444",
		ScreeningIDCard:        "1234567891234",
		Phone:                  "0956768766",
		Email:                  "pp@gmail.com",
		EducationName:          "nursing",
		EducationMajor:         "Children and adolescent branch",
		University:             "Suranaree university",
	}

	ok, err := govalidator.ValidateStruct(Screening_officer)

	g.Expect(ok).To(gomega.BeTrue())

	g.Expect(err).To(gomega.BeNil())


}
