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
	Password string `json:"Password"`
}

// SignUpPayload signup body
type SignUpPayload_s struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"Password"`

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
	err := bcrypt.CompareHashAndPassword([]byte(Med_Employee.MedPassword), []byte(payload.Password))
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
 