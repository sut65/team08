//สถานที่  เหมือน สถานะ
package controller

import (
	"net/http"

	"github.com/sut65/team08/entity"
	"github.com/gin-gonic/gin"
)

// POST Location
func CreateLocation(c *gin.Context) {
	var location entity.Location
	if err := c.ShouldBindJSON(&location); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&location).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": location})
}

// GET Location
func GetLocation(c *gin.Context) {
	var location entity.Location
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&location); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "location not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": location})
}

// GET Location
func ListLocations(c *gin.Context) {
	var locations []entity.Status
	if err := entity.DB().Raw("SELECT * FROM locations").Scan(&locations).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": locations})
}

// DELETE Location
func DeleteLocation(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM locations WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "location not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH Location
func UpdateLocation(c *gin.Context) {
	var location entity.Location
	if err := c.ShouldBindJSON(&location); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", location.ID).First(&location); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "location not found"})
		return
	}

	if err := entity.DB().Save(&location).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": location})
}
