package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team08/entity"
)

// POST /appoints
func CreateAppoint(c *gin.Context) {
	var appoint entity.Appoint
	var screening_officer entity.Screening_officer
	var treatment entity.Treatment
	var levelcure entity.Levelcure
	var department entity.Department

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 9 จะถูก bind เข้าตัวแปร Appoint

	if err := c.ShouldBindJSON(&appoint); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 10.ค้นหารายการสิทธิการรักษา ด้วย id
	if tx := entity.DB().Where("id = ?", appoint.LevelcureID).First(&levelcure); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Levelcure not found"})
		return
	}

	// 11.ค้นหารายการแผนก ด้วย id
	if tx := entity.DB().Where("id = ?", appoint.DepartmentID).First(&department); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Department not found"})
		return
	}

	//12.ค้นหาไอดีของการรักษา ด้วย id
	if tx := entity.DB().Where("id = ?", appoint.TreatmentID).First(&treatment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Treatment not found"})
		return
	}
	//13.ค้นหาไอดีของเจ้าหน้าที่ฝ่ายคัดกรอง ด้วย id
	if tx := entity.DB().Where("id = ?", appoint.Screening_officerID).First(&screening_officer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Screening_officer not found"})
		return
	}

	// 14: สร้าง Appoint
	cr := entity.Appoint{
		Levelcure:         levelcure,            // โยงความสัมพันธ์กับ Entity Levelcure
		Department:        department,           // โยงความสัมพันธ์กับ Entity Department
		Treatment:         treatment,            // โยงความสัมพันธ์กับ Entity Treatment
		Screening_officer: screening_officer,    // โยงความสัมพันธ์กับ Entity Officer
		Date_now:          appoint.Date_now,     // ตั้งค่าฟิลด์ Date
		Date_appoint:      appoint.Date_appoint, // ตั้งค่าฟิลด์ Date
		Text_appoint:      appoint.Text_appoint, // ตั้งค่าฟิลด์ Text
	}

	// 15: บันทึก
	if err := entity.DB().Create(&cr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": cr})
}

// GET /Appoint
func GetAppoint(c *gin.Context) {
	var appoint entity.Appoint
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM appoints WHERE id = ?", id).Scan(&appoint).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": appoint})
}

// GET /Appoints
func ListAppoints(c *gin.Context) {
	var appoints []entity.Appoint
	if err := entity.DB().Preload("Levelcure").Preload("Officer").Preload("Treatment").Preload("Department").Raw("SELECT * FROM appoints").Find(&appoints).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": appoints})
}

// DELETE /appoints/:id
func DeleteAppoint(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM appoints WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "appoint not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /appoints
func UpdateAppoint(c *gin.Context) {
	var appoint entity.Appoint
	if err := c.ShouldBindJSON(&appoint); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", appoint.ID).First(&appoint); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "appoint not found"})
		return
	}
	if err := entity.DB().Save(&appoint).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": appoint})
}