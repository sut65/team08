package controller

import (
	"github.com/sut65/team08/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// // POST /Screening_officer
// func CreateScreening_officer(c *gin.Context) {
// 	var officer entity.Officer

// 	var screening_officer entity.Screening_officer
// 	var Prefix entity.Prefix
// 	var gender entity.Gender
// 	var blood entity.Blood
// 	var religion entity.Religion
// 	var nationality entity.Nationality
// 	var education entity.Education

// 	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร Screening_officer
// 	if err := c.ShouldBindJSON(&screening_officer); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// 10: ค้นหา prefix ด้วย id
// 	if tx := entity.DB().Where("id = ?", screening_officer.PrefixID).First(&Prefix); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Prefix not found"})
// 		return
// 	}

// 	// 11: ค้นหา Gender ด้วย id
// 	if tx := entity.DB().Where("id = ?", screening_officer.GenderID).First(&gender); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Gender not found"})
// 		return
// 	}

// 	// 12: ค้นหา Education ด้วย id
// 	if tx := entity.DB().Where("id = ?", screening_officer.EducationID).First(&education); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "education not found"})
// 		return
// 	}
// 	// 13: ค้นหา blood ด้วย id
// 	if tx := entity.DB().Where("id = ?", screening_officer.BloodID).First(&blood); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "blood not found"})
// 		return
// 	}
// 	// 14: ค้นหา religion ด้วย id
// 	if tx := entity.DB().Where("id = ?", screening_officer.ReligionID).First(&religion); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "religion not found"})
// 		return
// 	}
// 	// 15: ค้นหา religion ด้วย id
// 	if tx := entity.DB().Where("id = ?", screening_officer.NationalityID).First(&nationality); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "nationality not found"})
// 		return
// 	}

// 	//  ค้น OfficerID
// 	if tx := entity.DB().Where("id = ?", screening_officer.OfficerID).First(&officer); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "officer not found"})
// 		return
// 	}

// 	// 16: สร้าง Screening_officer
// 	sc := entity.Screening_officer{
// 		Prefix:                 Prefix,
// 		Screening_officer_Name: screening_officer.Screening_officer_Name,
// 		Gender:                 gender,
// 		Blood:                  blood,
// 		Religion:               religion,
// 		Birthday:               screening_officer.Birthday,
// 		Nationality:            nationality,
// 		Country:                nationality,
// 		ScreeningIDCard:        screening_officer.ScreeningIDCard,
// 		Phone:                  screening_officer.Phone,
// 		Email:                  screening_officer.Email,

// 		Education:      education,
// 		EducationName:  screening_officer.EducationName,
// 		EducationMajor: screening_officer.EducationMajor,
// 		University:     screening_officer.University,

// 		Officer: officer,
// 	}

// 	// 13: บันทึก
// 	if err := entity.DB().Create(&sc).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusCreated, gin.H{"data": sc})
// }
func GetScreening_officer(c *gin.Context) {
	var screening_officer entity.Screening_officer
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM screening_officers WHERE id = ?", id).Scan(&screening_officer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": screening_officer})
}
// // GET /Screening_officer/:id
// func GetScreening_officer(c *gin.Context) {
// 	var screening_officer entity.Screening_officer
// 	id := c.Param("id")
// 	if err := entity.DB().Preload("Nationality").Preload("Religion").Preload("Blood").Preload("Gender").Preload("Education").Preload("Prefix").Raw("SELECT * FROM screening_officers WHERE id = ?", id).Find(&screening_officer).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": screening_officer})
// }

// GET /screening_officer
func ListScreening_officer(c *gin.Context) {
	var screening_officer []entity.Screening_officer
	if err := entity.DB().Preload("Nationality").Preload("Religion").Preload("Blood").Preload("Gender").Preload("Education").Preload("Prefix").Raw("SELECT * FROM screening_officers").Find(&screening_officer).Error; err != nil {
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
