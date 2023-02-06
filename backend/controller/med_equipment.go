package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team08/entity"
)

// POST /med_equipments
func CreateMedEquipment(c *gin.Context) {

	var med_equipment entity.Med_Equipment
	var brand entity.Brand
	var med_status entity.Med_Status
	var med_employee entity.Med_Employee

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 9 จะถูก bind เข้าตัวแปร med_equipment
	if err := c.ShouldBindJSON(&med_equipment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 10: ค้นหา brand ด้วย id
	if tx := entity.DB().Where("id = ?", med_equipment.BrandID).First(&brand); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "brand not found"})
		return
	}

	// 11: ค้นหา status ด้วย id
	if tx := entity.DB().Where("id = ?", med_equipment.Med_StatusID).First(&med_status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "status not found"})
		return
	}

	//12: ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", med_equipment.Med_EmployeeID).First(&med_employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	// 13: สร้าง Med_equipment
	wv := entity.Med_Equipment{
		Brand:        brand,        // โยงความสัมพันธ์กับ Entity Brand
		Med_Status:   med_status,   // โยงความสัมพันธ์กับ Entity Status
		Med_Employee: med_employee, // โยงความสัมพันธ์กับ Entity Employee
		Quantity:     med_equipment.Quantity,
		Equipment:    med_equipment.Equipment,
	}

	// 14: บันทึก
	if err := entity.DB().Create(&wv).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": wv})
}

// GET /med_equipment/:id
func GetMedEquipment(c *gin.Context) {
	var med_equipment entity.Med_Equipment
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&med_equipment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Medical Equipment not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": med_equipment})
}

// GET /med_equipments
func ListMedEquipments(c *gin.Context) {
	var med_equipments []entity.Med_Equipment
	if err := entity.DB().Preload("Med_Employee").Preload("Brand").Preload("Med_Status").Raw("SELECT * FROM med_equipments").Find(&med_equipments).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": med_equipments})
}

// DELETE med_equipments/:id
func DeleteMedEquipment(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM med_equipments WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Medical Equipment not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /med_equipments
func UpdateMedEquipment(c *gin.Context) {
	var med_equipment entity.Med_Equipment
	if err := c.ShouldBindJSON(&med_equipment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", med_equipment.ID).First(&med_equipment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Medical Equipment not found"})
		return
	}

	if err := entity.DB().Save(&med_equipment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": med_equipment})
}

func CreateloginMedEquipment(c *gin.Context) {

	var MedEquipment entity.Med_Equipment
	if err := c.ShouldBindJSON(&MedEquipment); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if err := entity.DB().Create(&MedEquipment).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": MedEquipment})

}