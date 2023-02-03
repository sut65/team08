package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team08/entity"
	"github.com/sut65/team08/service"
	"golang.org/x/crypto/bcrypt"
)

// หน้าเปรียบเทียบโทเคนที่รับเข้ามา
// LoginPayload login body
type LoginPayload_s struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// SignUpPayload signup body
type SignUpPayload_s struct {
	Name     string `json:"name"`
	Age      uint
	Phone    string `json:"phone"`
	Email    string `json:"email"`
	Password string `json:"password"`

	OfficerID   *uint `json:"OfficerID"`
	GenderID    *uint `json:"GenderID"`
	PrefixID    *uint `json:"PrefixID"`
	EducationID *uint `json:"EducationID"`
}

// LoginResponse token response  การตอบกลับโทเค็นการตอบกลับการเข้าสู่ระบบ
type LoginResponse_s struct {
	Token string `json:"token"`
	ID    uint   `json:"id"`
	Role  string `json:"role"`
}

// POST /login
func LoginMed_Employee(c *gin.Context) {
	var payload LoginPayload_s
	var Med_Employee entity.Med_Employee

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา Student ด้วย s_id ที่ผู้ใช้กรอกเข้ามา
	if err := entity.DB().Raw("SELECT * FROM med_employees WHERE email = ?", payload.Email).Scan(&Med_Employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบรหัสผ่าน CompareHashAndPassword = เปรียบเทียบแฮชและรหัสผ่าน
	err := bcrypt.CompareHashAndPassword([]byte(Med_Employee.Password), []byte(payload.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "password is incerrect"})
		return
	}

	// กำหนดค่า SecretKey, Issuer และระยะเวลาหมดอายุของ Token สามารถกำหนดเองได้

	// SecretKey ใช้สำหรับการ sign ข้อความเพื่อบอกว่าข้อความมาจากตัวเราแน่นอน
	// Issuer เป็น unique id ที่เอาไว้ระบุตัว client
	// ExpirationHours เป็นเวลาหมดอายุของ token

	jwtWrapper := service.JwtWrapper{
		SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}

	signedToken, err := jwtWrapper.GenerateToken(Med_Employee.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
		return
	}

	tokenResponse := LoginResponse_s{
		Token: signedToken,
		ID:    Med_Employee.ID,
		Role:  "Med_Employee", //สถาณะเป็น
	}

	c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
}

// // POST /create A AA
func CreateloginMed_Employee(c *gin.Context) {
	var payload SignUpPayload_s
	//var officer entity.Officer
	var med_employee entity.Med_Employee
	// var prefix entity.Prefix
	// var gender entity.Gender
	// var education entity.Education

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// 10: ค้นหา Prefix ด้วย id
	// if tx := entity.DB().Where("id = ?", med_employee.PrefixID).First(&prefix); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Prefix not found"})
	// 	return
	// }

	// 11: ค้นหา Gender ด้วย id
	// if tx := entity.DB().Where("id = ?", med_employee.GenderID).First(&gender); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Gender not found"})
	// 	return
	// }

	// 12: ค้นหา Education ด้วย id
	// if tx := entity.DB().Where("id = ?", med_employee.EducationID).First(&education); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "education not found"})
	// 	return
	// }
	//  ค้น OfficerID
	// if tx := entity.DB().Where("id = ?", med_employee.OfficerID).First(&officer); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "officer not found"})
	// 	return
	// }

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(payload.Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}

	med_employee.Name = payload.Name
	med_employee.Password = string(hashPassword)
	// med_employee.Phone = payload.Phone
	// med_employee.Age = payload.Age
	med_employee.Email = payload.Email

	// med_employee.PrefixID = payload.PrefixID // โยงความสัมพันธ์กับ Entity Resolution		//**โยงความสัมพันธ์กับ Entity Collegeyear
	// med_employee.GenderID = payload.GenderID         // โยงความสัมพันธ์กับ Entity Video				//**โยงความสัมพันธ์กับ Entity Faculty
	// med_employee.EducationID = payload.EducationID         // โยงความสัมพันธ์กับ Entity Playlist				Teacher
	// med_employee.OfficerID = payload.OfficerID

	if err := entity.DB().Create(&med_employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": med_employee})
}

//รับรหัสจากไครอัน เอามาเทียบกับถานข้อมูล
