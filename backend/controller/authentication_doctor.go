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
	DocPassword string `json:"DocPassword"`
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
	err := bcrypt.CompareHashAndPassword([]byte(Doctor.DocPassword), []byte(payload.DocPassword))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "DocPassword is incerrect"})
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