package controller

import (
	"github.com/sut65/team08/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /Lab

func CreateLab(c *gin.Context) {
	var Lab entity.Lab

	var Lab_Name entity.Lab_Name
	var Treatment entity.Treatment
	var Med_Employee entity.Med_Employee
	var Doctor entity.Doctor

	if err := c.ShouldBindJSON(&Lab); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", Lab.LabNameID).First(&Lab_Name); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Lab_NameID not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Lab.TreatmentID).First(&Treatment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "TreatmentID not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Lab.Med_EmployeeID).First(&Med_Employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Med_EmployeeID not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", Lab.DoctorID).First(&Doctor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "DoctorID not found"})
		return
	}

	CreateLab := entity.Lab{
		Lab_test: Lab.Lab_test,
    	Value: Lab.Value,

		Lab_Name:     Lab_Name,
		Treatment:    Treatment,
		Med_Employee: Med_Employee,
		Doctor:       Doctor,

	}
	if err := entity.DB().Create(&CreateLab).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": CreateLab})
}

// GET /Lab/:id
func GetLab(c *gin.Context) {
	var Lab entity.Lab
	id := c.Param("id")
	if err := entity.DB().Preload("Lab_Name").Preload("Treatment").Preload("Med_Employee").Preload("Doctor").Raw("SELECT * FROM Labs WHERE id = ?", id).Scan(&Lab).Find(&Lab).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Lab})
}

// GET /Lab
func ListLab(c *gin.Context) {
	var Lab []entity.Lab
	if err := entity.DB().Preload("Lab_Name").Preload("Treatment").Preload("Med_Employee").Preload("Doctor").Raw("SELECT * FROM Labs").Scan(&Lab).Find(&Lab).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Lab})
}

// DELETE /Lab/:id
func DeleteLab(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM Labs WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Lab not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Lab
func UpdateLab(c *gin.Context) {
	var Lab entity.Lab
	if err := c.ShouldBindJSON(&Lab); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", Lab.ID).First(&Lab); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Lab not found"})
		return
	}
	if err := entity.DB().Save(&Lab).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Lab})

}
