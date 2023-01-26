package controller

import (
	"github.com/sut65/team08/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /med_employee
func CreateMedEmployee(c *gin.Context) {

	var med_employee entity.Med_Employee
	var prefix entity.Prefix
	var gender entity.Gender
	var education entity.Education

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร med_employee
	if err := c.ShouldBindJSON(&med_employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 10: ค้นหา prefix ด้วย id
	if tx := entity.DB().Where("id = ?", med_employee.PrefixID).First(&prefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prefix not found"})
		return
	}

	// 11: ค้นหา Gender ด้วย id
	if tx := entity.DB().Where("id = ?", med_employee.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Gender not found"})
		return
	}

	// 12: ค้นหา Education ด้วย id
	if tx := entity.DB().Where("id = ?", med_employee.EducationID).First(&education); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "education not found"})
		return
	}

	// 12: สร้าง med_employee
	sc := entity.Med_Employee{
		Prefix:    prefix,                // โยงความสัมพันธ์กับ Entity Prefix
		Gender:    gender,                // โยงความสัมพันธ์กับ Entity Gender
		Education: education,             // โยงความสัมพันธ์กับ Entity Education
		Name:      med_employee.Name,     // ตั้งค่าฟิลด์ name
		Age:       med_employee.Age,      // ตั้งค่าฟิลด์ age
		Phone:     med_employee.Phone,    // ตั้งค่าฟิลด์ phone
		Email:     med_employee.Email,    // ตั้งค่าฟิลด์ email
		Password:  med_employee.Password, // ตั้งค่าฟิลด์ password

	}

	// 13: บันทึก
	if err := entity.DB().Create(&sc).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": sc})
}

// GET /med_employee/:id
func GetMedEmployee(c *gin.Context) {
	var med_employee entity.Med_Employee
	id := c.Param("id")
	if err := entity.DB().Preload("Gender").Preload("Education").Preload("Prefix").Raw("SELECT * FROM med_employees WHERE id = ?", id).Find(&med_employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": med_employee})
}

// GET /med_employee
func ListMedEmployees(c *gin.Context) {
	var med_employee []entity.Med_Employee
	if err := entity.DB().Preload("Gender").Preload("Education").Preload("Prefix").Raw("SELECT * FROM med_employees").Find(&med_employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": med_employee})
}

// DELETE /med_employee/:id
func DeleteMedEmployee(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM med_employees WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "med_employee not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /med_employee
func UpdateMedEmployee(c *gin.Context) {
	var med_employee entity.Med_Employee
	if err := c.ShouldBindJSON(&med_employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", med_employee.ID).First(&med_employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "med_employee not found"})
		return
	}

	if err := entity.DB().Save(&med_employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": med_employee})
}
