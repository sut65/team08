package controller

import (
	"github.com/asaskevich/govalidator"
	"github.com/sut65/team08/entity"
	"golang.org/x/crypto/bcrypt"

	"github.com/gin-gonic/gin"

	"net/http"
)

// // POST /Screening_officer
func CreateScreening_officer(c *gin.Context) {
	var officer entity.Officer
	var screening_officer entity.Screening_officer
	var Prefix entity.Prefix
	var gender entity.Gender
	var blood entity.Blood
	var religion entity.Religion
	var nationality entity.Nationality
	var education entity.Education

	if err := c.ShouldBindJSON(&screening_officer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 10: ค้นหา prefix ด้วย id
	if tx := entity.DB().Where("id = ?", screening_officer.PrefixID).First(&Prefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Prefix not found"})
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
	// 13: ค้นหา blood ด้วย id
	if tx := entity.DB().Where("id = ?", screening_officer.BloodID).First(&blood); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "blood not found"})
		return
	}
	// 14: ค้นหา religion ด้วย id
	if tx := entity.DB().Where("id = ?", screening_officer.ReligionID).First(&religion); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "religion not found"})
		return
	}
	// 15: ค้นหา religion ด้วย id
	if tx := entity.DB().Where("id = ?", screening_officer.NationalityID).First(&nationality); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "nationality not found"})
		return
	}

	//  ค้น OfficerID
	if tx := entity.DB().Where("id = ?", screening_officer.OfficerID).First(&officer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "officer not found"})
		return
	}
	password, _ := bcrypt.GenerateFromPassword([]byte(screening_officer.ScreeningIDCard), 14)
	// 	// 16: สร้าง Screening_officer
	sc := entity.Screening_officer{
		PrefixID:               screening_officer.PrefixID,
		Screening_officer_Name: screening_officer.Screening_officer_Name,
   
		GenderID:        screening_officer.GenderID,
		BloodID:         screening_officer.BloodID,
		ReligionID:      screening_officer.ReligionID,
		Birthday:        screening_officer.Birthday,
		NationalityID:   screening_officer.NationalityID,
		ScreeningIDCard: screening_officer.ScreeningIDCard,
		Phone:           screening_officer.Phone,
		Email:           screening_officer.Email,
		EducationID:     screening_officer.EducationID,
		EducationName:   screening_officer.EducationName,
		EducationMajor:  screening_officer.EducationMajor,
		University:      screening_officer.University,
		ScPassword:      string(password),
		OfficerID:       screening_officer.OfficerID,
	}

	//ขั้นตอนการ validate ที่นำมาจาก  unit test
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
func GetScreening_officer(c *gin.Context) {
	var screening_officer entity.Screening_officer
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM screening_officers WHERE id = ?", id).Scan(&screening_officer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": screening_officer})
}

// GET /screening_officer
func ListScreening_officer(c *gin.Context) {
	var screening_officer []entity.Screening_officer
	if err := entity.DB().Preload("Officer").Preload("Nationality").Preload("Religion").Preload("Blood").Preload("Gender").Preload("Education").Preload("Prefix").Raw("SELECT * FROM screening_officers").Find(&screening_officer).Error; err != nil {
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
	id := c.Param("id")
	var screening_officer entity.Screening_officer
	if err := c.ShouldBindJSON(&screening_officer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	password, _ := bcrypt.GenerateFromPassword([]byte(screening_officer.ScreeningIDCard), 14)
	sc_up := entity.Screening_officer{
		PrefixID:               screening_officer.PrefixID,
		Screening_officer_Name: screening_officer.Screening_officer_Name,

		GenderID:        screening_officer.GenderID,
		BloodID:         screening_officer.BloodID,
		ReligionID:      screening_officer.ReligionID,
		Birthday:        screening_officer.Birthday,
		NationalityID:   screening_officer.NationalityID,
		ScreeningIDCard: screening_officer.ScreeningIDCard,
		Phone:           screening_officer.Phone,
		Email:           screening_officer.Email,
		EducationID:     screening_officer.EducationID,
		EducationName:   screening_officer.EducationName,
		EducationMajor:  screening_officer.EducationMajor,
		University:      screening_officer.University,
		ScPassword:      string(password),
		OfficerID:       screening_officer.OfficerID,
	}

	if _, err := govalidator.ValidateStruct(sc_up); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}


	if err := entity.DB().Where("id = ?", id).Updates(&sc_up).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": sc_up})
}
