// ข้อมูลการรักษา Grim ของระบบข้อมูลการรักษา
package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team08/entity"
)

// POST Treatment มีทุกอันยกเว้น officer ไม่รู้ทำไม
func CreateTreatment(c *gin.Context) {

	var treatment entity.Treatment
	var disease entity.Disease
	var patiend entity.Patiend
	var status entity.Status
	var track entity.Track
	var doctor entity.Doctor

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร watchVideo
	if err := c.ShouldBindJSON(&treatment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา ค้นหา Disease ด้วย id
	if tx := entity.DB().Where("id = ?", treatment.DiseaseID).First(&disease); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Disease not found"})
		return
	}

	// 10: ค้นหา Patiend ด้วย id
	if tx := entity.DB().Where("id = ?", treatment.PatiendID).First(&patiend); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Patiend not found"})
		return
	}

	// 11: ค้นหา Status ด้วย id
	if tx := entity.DB().Where("id = ?", treatment.StatusID).First(&status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Status not found"})
		return
	}
	// 12: ค้นหา Track ด้วย id
	if tx := entity.DB().Where("id = ?", treatment.TrackID).First(&track); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Track not found"})
		return
	}
	// 13: ค้นหา doctor ด้วย id
	if tx := entity.DB().Where("id = ?", treatment.DoctorID).First(&doctor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "doctor not found"})
		return
	}
	// 12: สร้าง WatchVideo
	wv := entity.Treatment{
		Disease:      disease, // โยงความสัมพันธ์กับ Entity
		Patiend:      patiend, // โยงความสัมพันธ์กับ Entity
		Status:       status,  // โยงความสัมพันธ์กับ Entity
		Track:        track,   // โยงความสัมพันธ์กับ Entity
		Doctor:       doctor,  // โยงความสัมพันธ์กับ Entity
		TREATMENT_ID: treatment.TREATMENT_ID,
		TREATMENT:    treatment.TREATMENT,
		DATE:         treatment.DATE,
		APPOINTMENT:  treatment.APPOINTMENT,
		CONCLUSION:   treatment.CONCLUSION,
		GUIDANCE:     treatment.GUIDANCE,
	}

	// 13: บันทึก
	if err := entity.DB().Create(&wv).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": wv})
}

// GET
func GetTreatment(c *gin.Context) {
	var treatment entity.Treatment
	id := c.Param("id")
	if err := entity.DB().Preload("Disease").Preload("Patiend").Preload("Status").Preload("Track").Preload("Doctor").Raw("SELECT * FROM treatments WHERE id = ?", id).Scan(&treatment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": treatment})
}

// GET /
func ListTreatment(c *gin.Context) {
	var treatment []entity.Treatment
	if err := entity.DB().Preload("Disease").Preload("Patiend").Preload("Status").Preload("Track").Preload("Doctor").Raw("SELECT * FROM treatments").Find(&treatment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": treatment})
}

// DELETE /
func DeleteTreatment(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM treatments WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "treatment not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /
func UpdateTreatment(c *gin.Context) {
	var treatment entity.Treatment
	if err := c.ShouldBindJSON(&treatment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", treatment.ID).First(&treatment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "treatment not found"})
		return
	}

	if err := entity.DB().Save(&treatment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": treatment})
}
