package controller

import (
	"github.com/asaskevich/govalidator"
	"github.com/sut65/team08/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /Patient
func CreatePatient(c *gin.Context) {

	var patient entity.Patient
	var Prefix entity.Prefix
	var gender entity.Gender
	var blood entity.Blood
	var religion entity.Religion
	var nationality entity.Nationality
	var screening_officer entity.Screening_officer
	var address entity.AddressThailand


	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร Patient
	if err := c.ShouldBindJSON(&patient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", patient.PrefixID).First(&Prefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prefix not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", patient.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Gender not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", patient.BloodID).First(&blood); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "blood not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", patient.ReligionID).First(&religion); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "religion not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", patient.NationalityID).First(&nationality); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "nationality not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", patient.Screening_officerID).First(&screening_officer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "nationality not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", patient.AddressID).First(&address); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "nationality not found"})
		return
	}

	// สร้าง Patient
	sc := entity.Patient{
		Screening_officerID: patient.Screening_officerID,
		PrefixID:            patient.PrefixID,
		Patient_Name:        patient.Patient_Name,
		Age:                 patient.Age,
		GenderID:            patient.GenderID,
		BloodID:             patient.BloodID,
		ReligionID:          patient.ReligionID,
		Birthday:            patient.Birthday,
		NationalityID:       patient.NationalityID,
		IDCard:              patient.IDCard,
		Phone:               patient.Phone,
		House_ID:            patient.House_ID,
		AddressID:           patient.AddressID,
	}

	// 13: บันทึก
	if _, err := govalidator.ValidateStruct(sc); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// 13: บันทึก

	if err := entity.DB().Create(&sc).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": sc})
}

// GET /Patient/:id
func GetPatient(c *gin.Context) {
	var patient entity.Patient
	id := c.Param("id")
	if err := entity.DB().Preload("Nationality").Preload("Religion").Preload("Blood").Preload("Gender").Preload("Prefix").Raw("SELECT * FROM patients WHERE id = ?", id).Find(&patient).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": patient})
}

// GET /patient
func ListPatient(c *gin.Context) {
	var patient []entity.Patient
	if err := entity.DB().Preload("Nationality").Preload("Religion").Preload("Blood").Preload("Gender").Preload("Prefix").Raw("SELECT * FROM patients").Find(&patient).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": patient})
}

// DELETE /Patient/:id
func DeletePatient(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM patients WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patient not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Patient
func UpdatePatient(c *gin.Context) {
	var patient entity.Patient
	if err := c.ShouldBindJSON(&patient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", patient.ID).First(&patient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patient not found"})
		return
	}

	if err := entity.DB().Save(&patient).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": patient})
}
