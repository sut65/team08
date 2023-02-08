package controller
 
import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team08/entity"
	"github.com/sut65/team08/service"
	"golang.org/x/crypto/bcrypt"
)

// LoginPayload login body
type LoginPayload_Doctor struct {
	Email    string `json:"email"`
	DocterIDCard string `json:"DocterIDCard"`
}

// SignUpPayload signup body
type SignUpPayload_Doctor struct {
	DocterCode     string `json:"DocterCode"`
	Email    string `json:"email"`

	DocterIDCard string `json:"DocterIDCard"`
	FirstNameTH string `json:"FirstNameTH"`
	LastNameTH string `json:"LastNameTH"`
	FirstNameEN string `json:"FirstNameEN"`
	LastNameEN string `json:"LastNameEN"`
	ReOther  string `json:"ReOther"`
	TelPhone string `json:"TelPhone"` /////
	TelOffice string `json:"TelOffice"`
	AllAddress string `json:"AllAddress"`
	Subdistrict string `json:"Subdistrict"`
	District string `json:"District"`
	Province string `json:"Province"`
	FaIDCard string `json:"FaIDCard"`
	FaFirstName string `json:"FaFirstName"`
	FaLastName string `json:"FaLastName"`
	FaOccupation string `json:"FaOccupation"`
	MoIDCard string `json:"MoIDCard"`
	MoFirstName string `json:"MoFirstName"`
	MoLastName string `json:"MoLastName"`
	MoOccupation string `json:"MoOccupation"`
	WiIDCard string `json:"WiIDCard"`
	WiFirstName string `json:"WiFirstName"`
	WiLastName string `json:"WiLastName"`
	WiOccupation string `json:"WiOccupation"`
	WiPhone string `json:"WiPhone"`
	EducationName string `json:"EducationName"`
	EducationMajor string `json:"EducationMajor"`
	University string `json:"University"`
	DocPassword string `json:"DocPassword"`

	OfficerID   *uint `json:"OfficerID"`
	DocPrefixID *uint `json:"DocPrefixID"`
	GenderID *uint `json:"GenderID"`
	BloodID *uint `json:"BloodID"`
	MaritalID *uint `json:"MaritalID"`

	ReligionID *uint `json:"ReligionID"`
	CountryID *uint `json:"CountryID"`
	NationalityID *uint `json:"NationalityID"`
	AddressID *uint `json:"AddressID"`
	DocFaPrefixID *uint `json:"DocFaPrefixID"`
	DocMoPrefixID *uint `json:"DocMoPrefixID"`
	DocWiPrefixID *uint `json:"DocWiPrefixID"`
	EducationID *uint `json:"EducationID"`

	
	

	// Birthday time.Time
	// StartEducation time.Time
	// EndEducation   time.Time



}

// LoginResponse token response
type LoginResponse_Doctor struct {
	Token string `json:"token"`
	ID    uint   `json:"id"`
	Role  string `json:"role"`


}

// POST /login
func Login_Doctor(c *gin.Context) {
	var payload LoginPayload_Doctor
	var Doctor entity.Doctor 

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา Doctor ด้วย Email ที่ผู้ใช้กรอกเข้ามา
	if err := entity.DB().Raw("SELECT * FROM Doctors WHERE email = ?", payload.Email).Scan(&Doctor).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบรหัสผ่าน
	err := bcrypt.CompareHashAndPassword([]byte(Doctor.DocterIDCard), []byte(payload.DocterIDCard))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "DocterIDCard is incerrect"})
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

	signedToken, err := jwtWrapper.GenerateToken(Doctor.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
		return
	}

	tokenResponse := LoginResponse{
		Token: signedToken,
		ID:    Doctor.ID,
		Role:  "doctor",
	}

	c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
}

// POST /create A AA
func Create_Doctor(c *gin.Context) {
	var payload SignUpPayload_Doctor
	var Doctor entity.Doctor

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashDocterIDCard, err := bcrypt.GenerateFromPassword([]byte(payload.DocterIDCard), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing ScreeningIDCard"})
		return
	}
    Doctor.DocterCode = payload.DocterCode
	Doctor.DocterIDCard = payload.DocterIDCard
	Doctor.Email = payload.Email
	Doctor.DocterIDCard = string(hashDocterIDCard)

	Doctor.FirstNameTH = payload.FirstNameTH
	Doctor.LastNameTH = payload.LastNameTH
	Doctor.FirstNameEN = payload.FirstNameEN
	Doctor.LastNameEN= payload.LastNameEN
	Doctor.ReOther = payload.ReOther
	Doctor.TelPhone = payload.TelPhone
	Doctor.TelOffice = payload.TelOffice
	Doctor.AllAddress = payload.AllAddress
	Doctor.Subdistrict = payload.Subdistrict
	Doctor.District = payload.District
	Doctor.Province = payload.Province
	Doctor.FaIDCard = payload.FaIDCard
	Doctor.FaFirstName = payload.FaFirstName
	Doctor.FaLastName = payload.FaLastName
	Doctor.FaOccupation = payload.FaOccupation
	Doctor.MoIDCard = payload.MoIDCard
	Doctor.MoFirstName = payload.MoFirstName
	Doctor.MoLastName = payload.MoLastName
	Doctor.MoOccupation = payload.MoOccupation
	Doctor.WiIDCard = payload.WiIDCard
	Doctor.WiFirstName = payload.WiFirstName
	Doctor.WiLastName = payload.WiLastName
	Doctor.WiOccupation = payload.WiOccupation
	Doctor.WiPhone = payload.WiPhone
	Doctor.EducationName = payload.EducationName
	Doctor.EducationMajor = payload.EducationMajor
	Doctor.University = payload.University
	Doctor.DocPassword = payload.DocPassword
	
	Doctor.OfficerID   = payload.OfficerID
	Doctor.DocPrefixID = payload.DocPrefixID
	Doctor.GenderID = payload.GenderID
	Doctor.BloodID = payload.BloodID
	Doctor.ReligionID = payload.ReligionID
	Doctor.CountryID = payload.CountryID
	Doctor.EducationID = payload.EducationID
	Doctor.NationalityID = payload.NationalityID
	Doctor.MaritalID  = payload.MaritalID
	Doctor.AddressID = payload.AddressID
	Doctor.DocFaPrefixID = payload.DocFaPrefixID
	Doctor.DocMoPrefixID = payload.DocMoPrefixID
	Doctor.DocWiPrefixID = payload.DocWiPrefixID
	Doctor.EducationID = payload.EducationID


	// Birthday time.Time
	// StartEducation time.Time
	// EndEducation   time.Time


	if err := entity.DB().Create(&Doctor).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": Doctor})
}