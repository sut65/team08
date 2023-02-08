package controller

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team08/entity"
	"github.com/sut65/team08/service"
	"golang.org/x/crypto/bcrypt"
)

// LoginPayload login body
type LoginPayload_Screening_officer struct {
	Email           string `json:"email"`
	ScreeningIDCard string `json:"ScreeningIDCard"`
}

// SignUpPayload signup body
type SignUpPayload_Screening_officer struct {
	Screening_officer_Name string `json:"Screening_officer_Name" valid:"required~Name officer cannot be blank"`
	Email                  string `json:"email" `
	ScreeningIDCard        string `json:"ScreeningIDCard" valid:"matches(^[1-9]\\d{12}$),required~IDCard officer cannot be blank"`
	Birthday               string `json:"Birthday" valid:"required~Birthday officer cannot be blank"`

	OfficerID     *uint `json:"OfficerID" valid:"-"`
	PrefixID      *uint `json:"PrefixID" valid:"-"`
	GenderID      *uint `json:"GenderID" valid:"-"`
	BloodID       *uint `json:"BloodID" valid:"-"`
	ReligionID    *uint `json:"ReligionID" valid:"-"`
	CountryID     *uint `json:"CountryID" valid:"-"`
	EducationID   *uint `json:"EducationID" valid:"-"`
	NationalityID *uint `json:"NationalityID" valid:"-"`

	Phone          string `json:"Phone" valid:"matches(^[0]\\d{9}$),required~Phone officer cannot be blank"`
	EducationName  string `json:"EducationName" valid:"required~EducationName officer cannot be blank"`
	EducationMajor string `json:"EducationMajor" valid:"required~EducationMajor officer cannot be blank"`
	University     string `json:"University" valid:"required~University officer cannot be blank"`
}

// LoginResponse token response
type LoginResponse_Screening_officer struct {
	Token string `json:"token"`
	ID    uint   `json:"id"`
	Role  string `json:"role"`
}

// POST /login
func Login_Screening_officer(c *gin.Context) {
	var payload LoginPayload_Screening_officer
	var Screening_officer entity.Screening_officer

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา Screening_officer ด้วย Email ที่ผู้ใช้กรอกเข้ามา
	if err := entity.DB().Raw("SELECT * FROM Screening_officers WHERE email = ?", payload.Email).Scan(&Screening_officer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบรหัสผ่าน
	err := bcrypt.CompareHashAndPassword([]byte(Screening_officer.ScreeningIDCard), []byte(payload.ScreeningIDCard))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ScreeningIDCard is incerrect"})
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

	signedToken, err := jwtWrapper.GenerateToken(Screening_officer.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
		return
	}

	tokenResponse := LoginResponse{
		Token: signedToken,
		ID:    Screening_officer.ID,
		Role:  "Screening_officer",
	}

	c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
}


