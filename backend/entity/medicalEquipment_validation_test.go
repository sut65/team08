package entity

import (
	"fmt"
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestMedEquipmentCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Check format Med_Equipment", func(t *testing.T) {
		e := Med_Equipment{
			Equipment: "หูฟัง",
			Quantity:  50,
			Shop:      "aaa",
		}
		//ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(e)

		//เช็คว่ามันเป็นค่าจริงไหม
		g.Expect(ok).To(BeTrue())

		//เช็คว่ามันว่างไหม
		g.Expect(err).To((BeNil()))

		fmt.Println(err)
	})
}

// // ตรวจสอบค่าว่างของชื่อแล้วต้องเจอ Error
func TestEquipmentNameNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	user := Med_Equipment{
		Equipment: "", //ผิด
		Quantity:  12,
		Shop:      "aa",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกอุปกรณ์"))
}

func TestQuantityNotNegtive(t *testing.T) {
	g := NewGomegaWithT(t)

	quantitys := []int{
		-1,
		-131,
		-20,
	}

	for _, quantity := range quantitys {

		med_equipment := Med_Equipment{
			Equipment: "aaaaa",
			Quantity:  quantity,
			Shop:      "aa",
		}

		ok, err := govalidator.ValidateStruct(med_equipment)

		g.Expect(ok).ToNot(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("กรุณากรอกจำนวนอุปกรณ์ไม่เกิน 1000"))
	}

}

func TestEquipmentShopLessThen50(t *testing.T) {
	g := NewGomegaWithT(t)

	user := Med_Equipment{
		Equipment: "aa",
		Quantity:  12,
		Shop:      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกชื่อร้านค้าไม่เกิน50ตัวอักษร"))
}

func TestEquipmentShopNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	user := Med_Equipment{
		Equipment: "aa",
		Quantity:  12,
		Shop:      "",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกชื่อร้านค้า"))
}

