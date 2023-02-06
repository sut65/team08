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
	Email    string `json:"email"`
	ScreeningIDCard string `json:"ScreeningIDCard"`
}

// SignUpPayload signup body
type SignUpPayload_Screening_officer struct {
	Screening_officer_Name     string `json:"Screening_officer_Name"`
	Email    string `json:"email"`
	ScreeningIDCard string `json:"ScreeningIDCard"`
	Birthday string `json:"Birthday"`

	OfficerID   *uint `json:"OfficerID"`
	PrefixID *uint `json:"PrefixID"`
	GenderID *uint `json:"GenderID"`
	BloodID *uint `json:"BloodID"`
	ReligionID *uint `json:"ReligionID"`
	CountryID *uint `json:"CountryID"`
	EducationID *uint `json:"EducationID"`
	NationalityID *uint `json:"NationalityID"`

	Phone string `json:"Phone"`
	EducationName string `json:"EducationName"`
	EducationMajor string `json:"EducationMajor"`
	University string `json:"University"`

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
		Role:  "screening_officer",
	}

	c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
}

// POST /create A AA
func LoginScreening_officer(c *gin.Context) {
	var payload SignUpPayload
	var Screening_officer entity.Screening_officer

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashScreeningIDCard, err := bcrypt.GenerateFromPassword([]byte(payload.Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing ScreeningIDCard"})
		return
	}

	Screening_officer.Screening_officer_Name = payload.Name
	Screening_officer.Email = payload.Email
	Screening_officer.ScreeningIDCard = string(hashScreeningIDCard)

	if err := entity.DB().Create(&Screening_officer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": Screening_officer})
}
