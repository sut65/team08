// โรค Grim ของระบบข้อมูลการรักษา
package controller

import (
	"net/http"

	"github.com/sut65/team08/entity"
	"github.com/gin-gonic/gin"
)

// POST Disease
func CreateDisease(c *gin.Context) {
	var disease entity.Disease
	if err := c.ShouldBindJSON(&disease); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&disease).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": disease})
}

// GET Disease
func GetDisease(c *gin.Context) {
	var disease entity.Disease
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&disease); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "disease not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": disease})
}

// GET Disease
func ListDiseases(c *gin.Context) {
	var diseases []entity.Disease
	if err := entity.DB().Raw("SELECT * FROM diseases").Scan(&diseases).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": diseases})
}

// DELETE Disease
func DeleteDisease(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM diseases WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "disease not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH Disease
func UpdateDisease(c *gin.Context) {
	var disease entity.Disease
	if err := c.ShouldBindJSON(&disease); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", disease.ID).First(&disease); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "disease not found"})
		return
	}

	if err := entity.DB().Save(&disease).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": disease})
}
