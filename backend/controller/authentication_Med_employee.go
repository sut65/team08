package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team08/entity"
	"github.com/sut65/team08/service"
	"golang.org/x/crypto/bcrypt"
)

// LoginPayload login body
type LoginPayload_s struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// SignUpPayload signup body
type SignUpPayload_s struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`

	Age            uint   `json:"Age"`
	Phone          string `json:"Phone"`
	University     string `json:"University"`
	EducationName  string `json:"EducationName"`
	EducationMajor string `json:"EducationMajor"`

	OfficerID   *uint `json:"OfficerID"`
	GenderID    *uint `json:"GenderID"`
	PrefixID    *uint `json:"PrefixID"`
	EducationID *uint `json:"EducationID"`
}

// LoginResponse token response
type LoginResponse_s struct {
	Token string `json:"token"`
	ID    uint   `json:"id"`
	Role  string `json:"role"`
}

// POST /login
func Login_Med_employee(c *gin.Context) {
	var payload LoginPayload_s
	var Med_Employee entity.Med_Employee

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา Med_Employee ด้วย Email ที่ผู้ใช้กรอกเข้ามา
	if err := entity.DB().Raw("SELECT * FROM Med_Employees WHERE email = ?", payload.Email).Scan(&Med_Employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบรหัสผ่าน
	err := bcrypt.CompareHashAndPassword([]byte(Med_Employee.Password), []byte(payload.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Password is incerrect"})
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

	tokenResponse := LoginResponse{
		Token: signedToken,
		ID:    Med_Employee.ID,
		Role:  "med_employee",
	}

	c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
}

// // POST /create
func CreateMed_Employee(c *gin.Context) {
	var payload SignUpPayload_s
	var Med_Employee entity.Med_Employee

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(payload.Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}

	Med_Employee.Name = payload.Name
	Med_Employee.Email = payload.Email
	Med_Employee.Password = string(hashPassword)
	Med_Employee.Age = payload.Age
	Med_Employee.Phone = payload.Phone
	Med_Employee.University = payload.University
	Med_Employee.EducationName = payload.EducationName
	Med_Employee.EducationMajor = payload.EducationMajor

	Med_Employee.OfficerID = payload.OfficerID
	Med_Employee.GenderID = payload.GenderID
	Med_Employee.PrefixID = payload.PrefixID
	Med_Employee.EducationID = payload.EducationID

	if err := entity.DB().Create(&Med_Employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": Med_Employee})
}

//รับรหัสจากไครอัน ว่าเอามาเทียบกับถานข้อมูล
 