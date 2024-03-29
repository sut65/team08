package controller

import (
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team08/entity"
	"net/http"
)

// POST /dispenses
func CreateDispense(c *gin.Context) {
	var dispense entity.Dispense
	var doctor entity.Doctor
	var treatment entity.Treatment
	var drug entity.Drug
	var practice entity.Practice

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 9 จะถูก bind เข้าตัวแปร Dispense

	if err := c.ShouldBindJSON(&dispense); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 10.ค้นหารายการยา ด้วย id
	if tx := entity.DB().Where("id = ?", dispense.DrugID).First(&drug); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Drug not found"})
		return
	}

	// 11.ค้นหาประเภทการรับประทานยา ด้วย id
	if tx := entity.DB().Where("id = ?", dispense.PracticeID).First(&practice); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Practice not found"})
		return
	}

	//12.ค้นหาไอดีของการรักษา ด้วย id
	if tx := entity.DB().Where("id = ?", dispense.TreatmentID).First(&treatment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Treatment not found"})
		return
	}
	//Aern
	//13.ค้นหาไอดีของแพทย์ ด้วย id
	if tx := entity.DB().Where("id = ?", dispense.DoctorID).First(&doctor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Doctor not found"})
		return
	}
	// 14: สร้าง Dispense
	cr := entity.Dispense{
		DrugID:      dispense.DrugID,      // โยงความสัมพันธ์กับ Entity Drug
		PracticeID:  dispense.PracticeID,  // โยงความสัมพันธ์กับ Entity Practice
		TreatmentID: dispense.TreatmentID, // โยงความสัมพันธ์กับ Entity Treatment
		DoctorID:    dispense.DoctorID,    // โยงความสัมพันธ์กับ Entity Doctor
		Date:        dispense.Date,        // ตั้งค่าฟิลด์ Date
		Number:      dispense.Number,      // ตั้งค่าฟิลด์ Number
		Text:        dispense.Text,        // ตั้งค่าฟิลด์ Text
		Dispense_ID: dispense.Dispense_ID,
	}
	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(cr); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 15: บันทึก
	if err := entity.DB().Create(&cr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": cr})

}

// GET /Dispense
func GetDispense(c *gin.Context) {
	var dispense entity.Dispense
	id := c.Param("id")
	if err := entity.DB().Preload("Doctor").Preload("Drug").Preload("Treatment").Preload("Practice").Raw("SELECT * FROM dispenses WHERE id = ?", id).Find(&dispense).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": dispense})
}

// GET /Dispenses
func ListDispenses(c *gin.Context) {
	var dispenses []entity.Dispense
	if err := entity.DB().Preload("Doctor").Preload("Drug").Preload("Treatment").Preload("Practice").Raw("SELECT * FROM dispenses").Find(&dispenses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": dispenses})
}

// DELETE /dispenses/:id
func DeleteDispense(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM dispenses WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dispense not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /dispenses
func UpdateDispense(c *gin.Context) {
	id := c.Param("id")
	var dispense entity.Dispense
	if err := c.ShouldBindJSON(&dispense); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	crupdate := entity.Dispense{
		DrugID:      dispense.DrugID,      // โยงความสัมพันธ์กับ Entity Drug
		PracticeID:  dispense.PracticeID,  // โยงความสัมพันธ์กับ Entity Practice
		TreatmentID: dispense.TreatmentID, // โยงความสัมพันธ์กับ Entity Treatment
		DoctorID:    dispense.DoctorID,    // โยงความสัมพันธ์กับ Entity Doctor
		Date:        dispense.Date,        // ตั้งค่าฟิลด์ Date
		Number:      dispense.Number,      // ตั้งค่าฟิลด์ Number
		Text:        dispense.Text,        // ตั้งค่าฟิลด์ Text
		Dispense_ID: dispense.Dispense_ID,
	}
	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(crupdate); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Where("id = ?", id).Updates(&crupdate).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": dispense})
}
