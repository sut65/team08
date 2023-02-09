package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/onsi/gomega"
)

func Test_appointText(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	appoint := Appoint{
		Date_now:     time.Now(),
		Date_appoint: time.Now().Add(24 * time.Hour),
		Text_appoint: "gkfodgdfhfhjfipx[odhjdigkjhndgpspigkbdpgkfodgdfhfhjfipx[odhjdigkjhndgpspigkbdpgkfodgdfhfhjfipx[odhjdfffffff",
	}
	ok, err := govalidator.ValidateStruct(appoint)
	g.Expect(ok).ToNot(gomega.BeTrue())
	g.Expect(err).ToNot(gomega.BeNil())
	g.Expect(err.Error()).To(gomega.Equal("Please record the appointment details."))
}

// เช็คเวลาเป็นปัจจุบัน
func Test_AppointTimeNow(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	appoint := Appoint{
		Date_now:     time.Date(2000, 1, 26, 0, 0, 0, 0, time.UTC),
		Date_appoint: time.Now().Add(24 * time.Hour),
		Text_appoint: "Sabaithip",
	}
	ok, err := govalidator.ValidateStruct(appoint)
	g.Expect(ok).NotTo(gomega.BeTrue())
	g.Expect(err).ToNot(gomega.BeNil())
	g.Expect(err.Error()).To(gomega.Equal("Please enter the current time"))
}

// เช็คเวลาเป็นอนาคต
func Test_AppointTime(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	appoint := Appoint{
		Date_now:     time.Now(),
		Date_appoint: time.Now(),
		Text_appoint: "Sabaithip",
	}
	ok, err := govalidator.ValidateStruct(appoint)
	g.Expect(ok).NotTo(gomega.BeTrue())
	g.Expect(err).ToNot(gomega.BeNil())
	g.Expect(err.Error()).To(gomega.Equal("Please enter the current time"))
}

func Test_AppointAll(t *testing.T) {
	g := gomega.NewGomegaWithT(t)

	appoint := Appoint{
		Date_now:     time.Now(),
		Date_appoint: time.Now().Add(24 * time.Hour),
		Text_appoint: "Sabaithip",
	}
	ok, err := govalidator.ValidateStruct(appoint)
	g.Expect(ok).To(gomega.BeTrue())
	g.Expect(err).To(gomega.BeNil())
}
