package controller

import (
	"github.com/sut65/team08/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /Screening_officer
func CreateScreening_officer(c *gin.Context) {

	var screening_officer entity.Screening_officer
	var prefix entity.Prefix
	var gender entity.Gender
	var education entity.Education

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร Screening_officer
	if err := c.ShouldBindJSON(&screening_officer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 10: ค้นหา prefix ด้วย id
	if tx := entity.DB().Where("id = ?", screening_officer.PrefixID).First(&prefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prefix not found"})
		return
	}

	// 11: ค้นหา Gender ด้วย id
	if tx := entity.DB().Where("id = ?", screening_officer.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Gender not found"})
		return
	}

	// 12: ค้นหา Education ด้วย id
	if tx := entity.DB().Where("id = ?", screening_officer.EducationID).First(&education); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "education not found"})
		return
	}

	// 12: สร้าง Screening_officer
	sc := entity.Screening_officer{
		Prefix:    prefix,                     // โยงความสัมพันธ์กับ Entity Prefix
		Gender:    gender,                     // โยงความสัมพันธ์กับ Entity Gender
		Education: education,                  // โยงความสัมพันธ์กับ Entity Education
		Name:      screening_officer.Name,     // ตั้งค่าฟิลด์ name
		Age:       screening_officer.Age,      // ตั้งค่าฟิลด์ age
		Phone:     screening_officer.Phone,    // ตั้งค่าฟิลด์ phone
		Email:     screening_officer.Email,    // ตั้งค่าฟิลด์ email
		Password:  screening_officer.Password, // ตั้งค่าฟิลด์ password

	}

	// 13: บันทึก
	if err := entity.DB().Create(&sc).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": sc})
}

// GET /Screening_officer/:id
func GetScreening_officer(c *gin.Context) {
	var screening_officer entity.Screening_officer
	id := c.Param("id")
	if err := entity.DB().Preload("Gender").Preload("Education").Preload("Prefix").Raw("SELECT * FROM screening_officers WHERE id = ?", id).Find(&screening_officer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": screening_officer})
}

// GET /screening_officer
func ListScreening_officer(c *gin.Context) {
	var screening_officer []entity.Screening_officer
	if err := entity.DB().Preload("Gender").Preload("Education").Preload("Prefix").Raw("SELECT * FROM screening_officers").Find(&screening_officer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": screening_officer})
}

// DELETE /Screening_officer/:id
func DeleteScreening_officer(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM screening_officers WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "screening_officer not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Screening_officer
func UpdateScreening_officer(c *gin.Context) {
	var screening_officer entity.Screening_officer
	if err := c.ShouldBindJSON(&screening_officer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", screening_officer.ID).First(&screening_officer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "screening_officer not found"})
		return
	}

	if err := entity.DB().Save(&screening_officer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": screening_officer})
}