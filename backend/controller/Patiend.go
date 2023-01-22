package controller

import (
	"github.com/sut65/team08/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /Patiend
func CreatePatiend(c *gin.Context) {

	var patiend entity.Patiend
	var prefix entity.Prefix
	var gender entity.Gender
	var policing entity.Policing

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร Patiend
	if err := c.ShouldBindJSON(&patiend); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 10: ค้นหา prefix ด้วย id
	if tx := entity.DB().Where("id = ?", patiend.PrefixID).First(&prefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prefix not found"})
		return
	}

	// 11: ค้นหา Gender ด้วย id
	if tx := entity.DB().Where("id = ?", patiend.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Gender not found"})
		return
	}

	// 12: ค้นหา Policing ด้วย id
	if tx := entity.DB().Where("id = ?", patiend.PolicingID).First(&policing); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "policing not found"})
		return
	}

	// 12: สร้าง Patiend
	sc := entity.Patiend{
		Prefix:   prefix,   // โยงความสัมพันธ์กับ Entity Prefix
		Gender:   gender,   // โยงความสัมพันธ์กับ Entity Gender
		Policing: policing, // โยงความสัมพันธ์กับ Entity Policing

		Name:          patiend.Name,          // ตั้งค่าฟิลด์ name
		Age:           patiend.Age,           // ตั้งค่าฟิลด์ age
		Date_of_birth: patiend.Date_of_birth, // ตั้งค่าฟิลด์ Date_of_birth
		Address:       patiend.Address,       // ตั้งค่าฟิลด์ Address
		ID_card:       patiend.ID_card,       // ตั้งค่าฟิลด์ ID_card
		Phone:         patiend.Phone,         // ตั้งค่าฟิลด์ Phone

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
	if err := entity.DB().Preload("Gender").Preload("Policing").Preload("Prefix").Raw("SELECT * FROM patiends WHERE id = ?", id).Find(&patiend).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": patiend})
}

// GET /patiend
func ListPatiend(c *gin.Context) {
	var patiend []entity.Patiend
	if err := entity.DB().Preload("Gender").Preload("Policing").Preload("Prefix").Raw("SELECT * FROM patiends").Find(&patiend).Error; err != nil {
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
