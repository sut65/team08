package controller

import (
	"github.com/sut65/team08/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /Patiend
func CreatePatiend(c *gin.Context) {

	var patiend entity.Patiend
	var Prefix entity.Prefix
	var gender entity.Gender
	var blood entity.Blood
	var religion entity.Religion
	var nationality entity.Nationality
	var addressThailand entity.AddressThailand
	var policing entity.Policing

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร Patiend
	if err := c.ShouldBindJSON(&patiend); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", patiend.PrefixID).First(&Prefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prefix not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", patiend.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Gender not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", patiend.PolicingID).First(&policing); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "policing not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", patiend.BloodID).First(&blood); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "blood not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", patiend.ReligionID).First(&religion); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "religion not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", patiend.NationalityID).First(&nationality); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "nationality not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", patiend.AddressID).First(&addressThailand); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "addressThailand not found"})
		return
	}

	// สร้าง Patiend
	sc := entity.Patiend{
		Prefix:          Prefix,
		FirstNameTH:     patiend.FirstNameTH,
		LastNameTH:      patiend.LastNameTH,
		Age:             patiend.Age,
		Gender:          gender,
		Blood:           blood,
		Religion:        religion,
		Birthday:        patiend.Birthday,
		Nationality:     nationality,
		IDCard: patiend.IDCard,
		Policing: policing,
		Phone:       patiend.Phone,
		House_ID:    patiend.House_ID,
		Address:     addressThailand,

	}

	// 13: บันทึก
	if err := entity.DB().Create(&sc).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": sc})
}

// GET /Patiend/:id
func GetPatiend(c *gin.Context) {
	var patiend entity.Patiend
	id := c.Param("id")
	if err := entity.DB().Preload("AddressThailand").Preload("Nationality").Preload("Religion").Preload("Blood").Preload("Gender").Preload("Policing").Preload("Prefix").Raw("SELECT * FROM patiends WHERE id = ?", id).Find(&patiend).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": patiend})
}

// GET /patiend
func ListPatiend(c *gin.Context) {
	var patiend []entity.Patiend
	if err := entity.DB().Preload("AddressThailand").Preload("Nationality").Preload("Religion").Preload("Blood").Preload("Gender").Preload("Policing").Preload("Prefix").Raw("SELECT * FROM patiends").Find(&patiend).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": patiend})
}

// DELETE /Patiend/:id
func DeletePatiend(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM patiends WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patiend not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Patiend
func UpdatePatiend(c *gin.Context) {
	var patiend entity.Patiend
	if err := c.ShouldBindJSON(&patiend); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", patiend.ID).First(&patiend); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patiend not found"})
		return
	}

	if err := entity.DB().Save(&patiend).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": patiend})
}
