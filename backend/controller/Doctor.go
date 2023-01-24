package controller

import (
	"github.com/sut65/team08/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /Doctor

func CreateDoctor(c *gin.Context) {
	var Doctor entity.Doctor
	if err := c.ShouldBindJSON(&Doctor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&Doctor).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Doctor})
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
