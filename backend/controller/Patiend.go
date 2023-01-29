package controller

import (
	"github.com/sut65/team08/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /Patiend
func CreatePatiend(c *gin.Context) {

	var patiend entity.Patiend
	var generalPrefix entity.GeneralPrefix
	var gender entity.Gender
	var blood entity.Blood
	var religion entity.Religion
	var nationality entity.Nationality
	var addressThailand entity.AddressThailand
	var disease entity.Disease
	var policing entity.Policing
	var status entity.Status
	var track entity.Track

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร Patiend
	if err := c.ShouldBindJSON(&patiend); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", patiend.GeneralPrefixID).First(&generalPrefix); tx.RowsAffected == 0 {
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

	if tx := entity.DB().Where("id = ?", patiend.DiseaseID).First(&disease); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "disease not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", patiend.StatusID).First(&status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "status not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", patiend.TrackID).First(&track); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "trak not found"})
		return
	}

	// สร้าง Patiend
	sc := entity.Patiend{
		GeneralPrefix:   generalPrefix,
		FirstNameTH:     patiend.FirstNameTH,
		LastNameTH:      patiend.LastNameTH,
		FirstNameEN:     patiend.FirstNameEN,
		LastNameEN:      patiend.LastNameEN,
		Gender:          gender,
		Blood:           blood,
		Religion:        religion,
		Birthday:        patiend.Birthday,
		Nationality:     nationality,
		Country:         nationality,
		ScreeningIDCard: patiend.ScreeningIDCard,

		Phone:       patiend.Phone,
		House_ID:    patiend.House_ID,
		District:    patiend.District,
		Subdistrict: patiend.Subdistrict,
		Province:    patiend.Province,
		Address:     addressThailand,

		Relative_FirstName:  patiend.Relative_FirstName,
		Relative_LastName:   patiend.Relative_LastName,
		Relative_Occupation: patiend.Relative_Occupation,
		Relative_Phone:      patiend.Relative_Phone,

		Policing: policing,
		Disease:  disease,
		Status:   status,
		Track:    track,
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
