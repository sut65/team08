package controller

import (
	"github.com/asaskevich/govalidator"
	"github.com/sut65/team08/entity"
	"golang.org/x/crypto/bcrypt"

	"github.com/gin-gonic/gin"

	"net/http"
)

// // POST /med_employee
func CreateMedEmployee(c *gin.Context) {
	var officer entity.Officer
	var med_employee entity.Med_Employee
	var Prefix entity.Prefix
	var gender entity.Gender
	var education entity.Education

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร med_employee
	if err := c.ShouldBindJSON(&med_employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 10: ค้นหา Prefix ด้วย id
	if tx := entity.DB().Where("id = ?", med_employee.PrefixID).First(&Prefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "กรุณาเลือกคำนำหน้า"})
		return
	}

	// 11: ค้นหา Gender ด้วย id
	if tx := entity.DB().Where("id = ?", med_employee.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "กรุณาเลือกเพศ"})
		return
	}

	// 12: ค้นหา Education ด้วย id
	if tx := entity.DB().Where("id = ?", med_employee.EducationID).First(&education); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "กรุณาเลือกระดับการศึกษา"})
		return
	}
	//  ค้น OfficerID
	if tx := entity.DB().Where("id = ?", med_employee.OfficerID).First(&officer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "officer not found"})
		return
	}
	password, _ := bcrypt.GenerateFromPassword([]byte(med_employee.Password), 14)
	// 12: สร้าง med_employee
	sc := entity.Med_Employee{
		PrefixID:         med_employee.PrefixID,         // โยงความสัมพันธ์กับ Entity Prefix
		GenderID:         med_employee.GenderID,         // โยงความสัมพันธ์กับ Entity Gender
		EducationID:      med_employee.EducationID,      // โยงความสัมพันธ์กับ Entity Education
		Name:           med_employee.Name,           // ตั้งค่าฟิลด์ name
		Age:            med_employee.Age,            // ตั้งค่าฟิลด์ age
		Phone:          med_employee.Phone,          // ตั้งค่าฟิลด์ phone
		Email:          med_employee.Email,          // ตั้งค่าฟิลด์ email
		University:     med_employee.University,     // ตั้งค่าฟิลด์ University
		EducationName:  med_employee.EducationName,  // ตั้งค่าฟิลด์ EducationName
		EducationMajor: med_employee.EducationMajor, // ตั้งค่าฟิลด์ EducationMajor
		Password:       med_employee.Password,  // ตั้งค่าฟิลด์ password
		MedPassword:	string(password),
		Officer: officer,
	}

	// validation
	if _, err := govalidator.ValidateStruct(med_employee); err != nil {
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

func GetMedEmployee(c *gin.Context) {
	var med_employee entity.Med_Employee
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM med_employees WHERE id = ?", id).Scan(&med_employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": med_employee})
}

// // GET /med_employee/:id
// func GetMedEmployee(c *gin.Context) {
// 	var med_employee entity.Med_Employee
// 	id := c.Param("id")
// 	if err := entity.DB().Preload("Officer").Preload("Gender").Preload("Education").Preload("Prefix").Raw("SELECT * FROM med_employees WHERE id = ?", id).Find(&med_employee).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": med_employee})
// }

// GET /med_employee
func ListMedEmployees(c *gin.Context) {
	var med_employee []entity.Med_Employee
	if err := entity.DB().Preload("Officer").Preload("Gender").Preload("Education").Preload("Prefix").Raw("SELECT * FROM med_employees").Find(&med_employee).Error; err != nil {
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

	password, _ := bcrypt.GenerateFromPassword([]byte(med_employee.Password), 14)

	upmedemployee := entity.Med_Employee{
		PrefixID:         med_employee.PrefixID,         // โยงความสัมพันธ์กับ Entity Prefix
		GenderID:         med_employee.GenderID,         // โยงความสัมพันธ์กับ Entity Gender
		EducationID:      med_employee.EducationID,      // โยงความสัมพันธ์กับ Entity Education
		Name:           med_employee.Name,           // ตั้งค่าฟิลด์ name
		Age:            med_employee.Age,            // ตั้งค่าฟิลด์ age
		Phone:          med_employee.Phone,          // ตั้งค่าฟิลด์ phone
		Email:          med_employee.Email,          // ตั้งค่าฟิลด์ email
		University:     med_employee.University,     // ตั้งค่าฟิลด์ University
		EducationName:  med_employee.EducationName,  // ตั้งค่าฟิลด์ EducationName
		EducationMajor: med_employee.EducationMajor, // ตั้งค่าฟิลด์ EducationMajor
		Password:       med_employee.Password,  // ตั้งค่าฟิลด์ password
		MedPassword:	string(password),
	}

	// validation
	if _, err := govalidator.ValidateStruct(med_employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Where("id = ?", med_employee.ID).Updates(&upmedemployee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": upmedemployee})
}