package controller

import (
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team08/entity"
	"golang.org/x/crypto/bcrypt"
	"net/http"
)

// POST /Doctor
func CreateDoctor(c *gin.Context) {

	var Doctor entity.Doctor

	var DocPrefix entity.DocPrefix
	var Gender entity.Gender
	var Blood entity.Blood
	var Marital entity.Marital

	var Religion entity.Religion
	var Address entity.AddressThailand
	var Education entity.Education
	var Nationality entity.Nationality

	var Country entity.Nationality
	var DocFaPrefix entity.DocPrefix
	var DocMoPrefix entity.DocPrefix
	var DocWiPrefix entity.DocPrefix

	if err := c.ShouldBindJSON(&Doctor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(Doctor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", Doctor.DocPrefixID).First(&DocPrefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "DocPrefixID not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Doctor.GenderID).First(&Gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "GenderID not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Doctor.BloodID).First(&Blood); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "BloodID) not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Doctor.MaritalID).First(&Marital); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "MaritalID not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Doctor.ReligionID).First(&Religion); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ReligionID not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Doctor.NationalityID).First(&Nationality); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "NationalityID not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Doctor.CountryID).First(&Country); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "CountryID not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Doctor.EducationID).First(&Education); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "EducationID not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Doctor.AddressID).First(&Address); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "AddressID not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Doctor.DocPrefixID).First(&DocPrefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "DocPrefixID not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Doctor.DocFaPrefixID).First(&DocFaPrefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "DocFaPrefixID not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Doctor.DocMoPrefixID).First(&DocMoPrefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "DocMoPrefixID not found"})
		return
	}
	if *Doctor.DocWiPrefixID != 99 {
		if tx := entity.DB().Where("id = ?", Doctor.DocWiPrefixID).First(&DocWiPrefix); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "DocWiPrefixID not found"})
			return
		}
	}

	password, _ := bcrypt.GenerateFromPassword([]byte(Doctor.DocterIDCard), 14)

	createDoctor := entity.Doctor{
		Address:    Address,
		AllAddress: Doctor.AllAddress,
		Birthday:   Doctor.Birthday,
		Blood:      Blood,

		Country:     Country,
		District:    Doctor.District,
		DocFaPrefix: DocFaPrefix,
		DocMoPrefix: DocMoPrefix,

		DocPassword: string(password),
		DocPrefix:   DocPrefix,
		DocWiPrefix: DocWiPrefix,
		DocterCode:  Doctor.DocterCode,

		DocterIDCard:   Doctor.DocterIDCard,
		Education:      Education,
		EducationMajor: Doctor.EducationMajor,
		EducationName:  Doctor.EducationName,

		Email:        Doctor.Email,
		EndEducation: Doctor.EndEducation,
		FaFirstName:  Doctor.FaFirstName,
		FaIDCard:     Doctor.FaIDCard,

		FaLastName:   Doctor.FaLastName,
		FaOccupation: Doctor.FaOccupation,
		FirstNameEN:  Doctor.FirstNameEN,
		FirstNameTH:  Doctor.FirstNameTH,

		Gender:     Gender,
		LastNameEN: Doctor.LastNameEN,
		LastNameTH: Doctor.LastNameTH,
		Marital:    Marital,

		MoFirstName:  Doctor.MoFirstName,
		MoIDCard:     Doctor.MoIDCard,
		MoLastName:   Doctor.MoLastName,
		MoOccupation: Doctor.MoOccupation,

		Nationality: Nationality,
		Province:    Doctor.Province,
		ReOther:     Doctor.ReOther,
		Religion:    Religion,

		StartEducation: Doctor.StartEducation,
		Subdistrict:    Doctor.Subdistrict,
		TelOffice:      Doctor.TelOffice,
		TelPhone:       Doctor.TelPhone,

		University:  Doctor.University,
		WiFirstName: Doctor.WiFirstName,
		WiIDCard:    Doctor.WiIDCard,
		WiLastName:  Doctor.WiLastName,

		WiOccupation: Doctor.WiOccupation,
		WiPhone:      Doctor.WiPhone,
	}

	if err := entity.DB().Create(&createDoctor).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": createDoctor})
}

// GET /Doctor/:id
func GetDoctor(c *gin.Context) {
	var Doctor entity.Doctor
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM Doctors WHERE id = ?", id).Scan(&Doctor).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Doctor})
}

func FindDoctor(c *gin.Context) {
	var Doctor entity.Doctor
	id := c.Param("id")
	if err := entity.DB().Preload("Address").Preload("Blood").Preload("Country").Preload("DocFaPrefix").Preload("DocMoPrefix").Preload("DocPrefix").Preload("DocWiPrefix").Preload("Education").Preload("Gender").Preload("Marital").Preload("Nationality").Preload("Religion").Raw("SELECT * FROM Doctors WHERE docter_code = '"+id+"'").Scan(&Doctor).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Doctor})
}

// GET /Doctor
func ListDoctor(c *gin.Context) {
	var Doctor []entity.Doctor
	if err := entity.DB().Preload("Address").Preload("Blood").Preload("Country").Preload("DocFaPrefix").Preload("DocMoPrefix").Preload("DocPrefix").Preload("DocWiPrefix").Preload("Education").Preload("Gender").Preload("Marital").Preload("Nationality").Preload("Religion").Raw("SELECT * FROM Doctors").Scan(&Doctor).Find((&Doctor)).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Doctor})
}

// DELETE /Doctor/:id
func DeleteDoctor(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM Doctors WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Doctor
func UpdateDoctor(c *gin.Context) {
	var Doctor entity.Doctor
	var DocPrefix entity.DocPrefix
	var Gender entity.Gender
	var Blood entity.Blood
	var Marital entity.Marital

	var Religion entity.Religion
	var Address entity.AddressThailand
	var Education entity.Education
	var Nationality entity.Nationality

	var Country entity.Nationality
	var DocFaPrefix entity.DocPrefix
	var DocMoPrefix entity.DocPrefix
	var DocWiPrefix entity.DocPrefix

	if err := c.ShouldBindJSON(&Doctor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(Doctor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", Doctor.DocPrefixID).First(&DocPrefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "DocPrefixID not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Doctor.GenderID).First(&Gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "GenderID not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Doctor.BloodID).First(&Blood); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "BloodID) not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Doctor.MaritalID).First(&Marital); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "MaritalID not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Doctor.ReligionID).First(&Religion); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ReligionID not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Doctor.NationalityID).First(&Nationality); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "NationalityID not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Doctor.CountryID).First(&Country); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "CountryID not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Doctor.EducationID).First(&Education); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "EducationID not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Doctor.AddressID).First(&Address); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "AddressID not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Doctor.DocPrefixID).First(&DocPrefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "DocPrefixID not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Doctor.DocFaPrefixID).First(&DocFaPrefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "DocFaPrefixID not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Doctor.DocMoPrefixID).First(&DocMoPrefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "DocMoPrefixID not found"})
		return
	}
	if *Doctor.DocWiPrefixID != 99 {
		if tx := entity.DB().Where("id = ?", Doctor.DocWiPrefixID).First(&DocWiPrefix); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "DocWiPrefixID not found"})
			return
		}
	}

	password, _ := bcrypt.GenerateFromPassword([]byte(Doctor.DocterIDCard), 14)

	createDoctor := entity.Doctor{

		DocPrefixID:   Doctor.DocPrefixID,
		GenderID:      Doctor.GenderID,
		BloodID:       Doctor.BloodID,
		MaritalID:     Doctor.MaritalID,
		ReligionID:    Doctor.ReligionID,
		AddressID:     Doctor.AddressID,
		DocFaPrefixID: Doctor.DocFaPrefixID,
		DocMoPrefixID: Doctor.DocMoPrefixID,
		DocWiPrefixID: Doctor.DocWiPrefixID,
		EducationID:   Doctor.EducationID,

		Address:    Address,
		AllAddress: Doctor.AllAddress,
		Birthday:   Doctor.Birthday,
		Blood:      Blood,

		Country:     Country,
		District:    Doctor.District,
		DocFaPrefix: DocFaPrefix,
		DocMoPrefix: DocMoPrefix,

		DocPassword: string(password),
		DocPrefix:   DocPrefix,
		DocWiPrefix: DocWiPrefix,
		DocterCode:  Doctor.DocterCode,

		DocterIDCard:   Doctor.DocterIDCard,
		Education:      Education,
		EducationMajor: Doctor.EducationMajor,
		EducationName:  Doctor.EducationName,

		Email:        Doctor.Email,
		EndEducation: Doctor.EndEducation,
		FaFirstName:  Doctor.FaFirstName,
		FaIDCard:     Doctor.FaIDCard,

		FaLastName:   Doctor.FaLastName,
		FaOccupation: Doctor.FaOccupation,
		FirstNameEN:  Doctor.FirstNameEN,
		FirstNameTH:  Doctor.FirstNameTH,

		Gender:     Gender,
		LastNameEN: Doctor.LastNameEN,
		LastNameTH: Doctor.LastNameTH,
		Marital:    Marital,

		MoFirstName:  Doctor.MoFirstName,
		MoIDCard:     Doctor.MoIDCard,
		MoLastName:   Doctor.MoLastName,
		MoOccupation: Doctor.MoOccupation,

		Nationality: Nationality,
		Province:    Doctor.Province,
		ReOther:     Doctor.ReOther,
		Religion:    Religion,

		StartEducation: Doctor.StartEducation,
		Subdistrict:    Doctor.Subdistrict,
		TelOffice:      Doctor.TelOffice,
		TelPhone:       Doctor.TelPhone,

		University:  Doctor.University,
		WiFirstName: Doctor.WiFirstName,
		WiIDCard:    Doctor.WiIDCard,
		WiLastName:  Doctor.WiLastName,

		WiOccupation: Doctor.WiOccupation,
		WiPhone:      Doctor.WiPhone,
	}

	if err := entity.DB().Model(Doctor).Where("id = ?", Doctor.ID).First(&Doctor).Updates(&createDoctor).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": createDoctor})
}
