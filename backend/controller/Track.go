// สถานะติดตามผล Grim ของระบบข้อมูลการรักษา
package controller

import (
	"net/http"

	"github.com/sut65/team08/entity"
	"github.com/gin-gonic/gin"
)

// POST Track
func CreateTrack(c *gin.Context) {
	var track entity.Track
	if err := c.ShouldBindJSON(&track); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&track).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": track})
}

// GET Track
func GetTrack(c *gin.Context) {
	var track entity.Track
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&track); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "track not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": track})
}

// GET Track
func ListTracks(c *gin.Context) {
	var tracks []entity.Status
	if err := entity.DB().Raw("SELECT * FROM tracks").Scan(&tracks).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": tracks})
}

// DELETE Track
func DeleteTrack(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM tracks WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "track not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH Track
func UpdateTrack(c *gin.Context) {
	var track entity.Track
	if err := c.ShouldBindJSON(&track); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", track.ID).First(&track); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "track not found"})
		return
	}

	if err := entity.DB().Save(&track).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": track})
}
