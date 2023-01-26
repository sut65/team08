package controller

import (
	"github.com/sut65/team08/entity"

	"github.com/gin-gonic/gin"

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

	if tx := entity.DB().Where("id = ?", Doctor.DocPrefixID).First(&DocPrefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prefix not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Doctor.GenderID).First(&Gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prefix not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Doctor.BloodID).First(&Blood); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prefix not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Doctor.MaritalID).First(&Marital); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prefix not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Doctor.ReligionID).First(&Religion); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prefix not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Doctor.NationalityID).First(&Nationality); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prefix not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Doctor.CountryID).First(&Country); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prefix not found"})
		return
	}

	// if tx := entity.DB().Where("id = ?", Doctor.AddressID).First(&AddressThailand); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "prefix not found"})
	// 	return
	// }

	if tx := entity.DB().Where("id = ?", Doctor.EducationID).First(&Education); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Education not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Doctor.AddressID).First(&Address); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prefix not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Doctor.DocPrefixID).First(&DocPrefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prefix not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Doctor.DocFaPrefixID).First(&DocFaPrefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prefix not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Doctor.DocMoPrefixID).First(&DocMoPrefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prefix not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Doctor.DocWiPrefixID).First(&DocWiPrefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prefix not found"})
		return
	}

	createDoctor := entity.Doctor{
		Address:    Address,
		AllAddress: Doctor.AllAddress,
		Birthday:   Doctor.Birthday,
		Blood:    Blood,

		Country:     Country,
		District:      Doctor.District,
		DocFaPrefix: DocFaPrefix,
		DocMoPrefix: DocMoPrefix,

		DocPassword:   Doctor.DocPassword,
		DocPrefix:   DocPrefix,
		DocWiPrefix: DocWiPrefix,
		DocterCode:    Doctor.DocterCode,

		DocterIDCard:   Doctor.DocterIDCard,
		Education:    Education,
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

		Gender:   Gender,
		LastNameEN: Doctor.LastNameEN,
		LastNameTH: Doctor.LastNameTH,
		Marital:  Marital,

		MoFirstName:  Doctor.MoFirstName,
		MoIDCard:     Doctor.MoIDCard,
		MoLastName:   Doctor.MoLastName,
		MoOccupation: Doctor.MoOccupation,

		Nationality: Nationality,
		Province:      Doctor.Province,
		ReOther:       Doctor.ReOther,
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

// GET /Doctor
func ListDoctor(c *gin.Context) {
	var Doctor []entity.Doctor
	if err := entity.DB().Raw("SELECT * FROM Doctors").Scan(&Doctor).Error; err != nil {
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
	if err := c.ShouldBindJSON(&Doctor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", Doctor.ID).First(&Doctor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	if err := entity.DB().Save(&Doctor).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Doctor})

}
