// ข้อมูลการรักษา Grim ของระบบข้อมูลการรักษา
package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team08/entity"
)

// POST Treatment 
func CreateTreatment(c *gin.Context) {

	var treatment entity.Treatment
	var disease entity.Disease
	var patient entity.Patient
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

	// 10: ค้นหา Patient ด้วย id
	if tx := entity.DB().Where("id = ?", treatment.PatientID).First(&patient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Patient not found"})
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
	// // 13: ค้นหา doctor ด้วย id
	if tx := entity.DB().Where("id = ?", treatment.DoctorID).First(&doctor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "doctor not found"})
		return
	}
	// 14: สร้าง WatchVideo
	wv := entity.Treatment{
		DiseaseID:    treatment.DiseaseID, // โยงความสัมพันธ์กับ Entity
		PatientID:    treatment.PatientID, // โยงความสัมพันธ์กับ Entity
		StatusID:     treatment.StatusID,  // โยงความสัมพันธ์กับ Entity
		TrackID:      treatment.TrackID,   // โยงความสัมพันธ์กับ Entity
		DoctorID:     treatment.DoctorID,  // โยงความสัมพันธ์กับ Entity
		TREATMENT_ID: treatment.TREATMENT_ID,
		TREATMENT:    treatment.TREATMENT,
		DATE:         treatment.DATE,
		APPOINTMENT:  treatment.APPOINTMENT,
		CONCLUSION:   treatment.CONCLUSION,
		GUIDANCE:     treatment.GUIDANCE,
	}
	// : ขั้นตอนการ validate ข้อมูล
	if _, err := govalidator.ValidateStruct(wv); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 15: บันทึก
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
	if err := entity.DB().Preload("Appoint").Preload("Doctor").Preload("Disease").Preload("Patient").Preload("Status").Preload("Track").Raw("SELECT * FROM treatments WHERE id = ?", id).Find(&treatment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": treatment})
}

// GET /
func ListTreatment(c *gin.Context) {
	var treatment []entity.Treatment
	if err := entity.DB().Preload("Appoint").Preload("Doctor").Preload("Disease").Preload("Patient").Preload("Status").Preload("Track").Raw("SELECT * FROM treatments").Find(&treatment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": treatment})
}
func ListTreatmentStatus(c *gin.Context) {
	var treatment []entity.Treatment
	if err := entity.DB().Preload("Doctor").Preload("Disease").Preload("Patient").Preload("Status").Preload("Track").Raw("SELECT * FROM treatments WHERE status_id = 2 ").Find(&treatment).Error; err != nil {
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
	id := c.Param("id")
	var treatment entity.Treatment
	if err := c.ShouldBindJSON(&treatment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// สร้าง
	uptreat := entity.Treatment{

		DiseaseID:    treatment.DiseaseID, // โยงความสัมพันธ์กับ Entity
		PatientID:    treatment.PatientID, // โยงความสัมพันธ์กับ Entity
		StatusID:     treatment.StatusID,  // โยงความสัมพันธ์กับ Entity
		TrackID:      treatment.TrackID,   // โยงความสัมพันธ์กับ Entity
		DoctorID:     treatment.DoctorID,  // โยงความสัมพันธ์กับ Entity
		TREATMENT_ID: treatment.TREATMENT_ID,
		TREATMENT:    treatment.TREATMENT,
		DATE:         treatment.DATE,
		APPOINTMENT:  treatment.APPOINTMENT,
		CONCLUSION:   treatment.CONCLUSION,
		GUIDANCE:     treatment.GUIDANCE,
	}
	// : ขั้นตอนการ validate ข้อมูล
	if _, err := govalidator.ValidateStruct(uptreat); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Where("id = ?", id).Updates(&uptreat).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": uptreat})
}

func ListReady_Treat(c *gin.Context) {
	var save_itis []entity.Treatment
	if err := entity.DB().Preload("Disease").Preload("Patient").Preload("Status").Preload("Track").
		Raw("select * from treatments where id not in " +
			"(select t.id from treatments t INNER JOIN save_itis s on t.id = s.treatment_id )" +
			"and status_id = 3").Find(&save_itis).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": save_itis})
}

func ListReady_Dispense(c *gin.Context) {
	var ListDispense []entity.Treatment
	if err := entity.DB().Preload("Disease").Preload("Patient").Preload("Status").Preload("Track").Raw("Select sa.* from treatments sa where sa.track_id = 2 OR sa.track_id = 3").Find(&ListDispense).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ListDispense})
}

func ListReady_Appoint(c *gin.Context) {
	var ListDispense []entity.Treatment
	if err := entity.DB().Preload("Disease").Preload("Appoint").Preload("Patient").Preload("Status").Preload("Track").
		Raw("select * from treatments where id not in " +
			"(select t.id from treatments t INNER JOIN appoints a on t.id = a.treatment_id )" +
			"and track_id != 2 and track_id != 4").Find(&ListDispense).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ListDispense})
}
