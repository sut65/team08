package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team08/entity"
)

// POST /levelcures
func CreateLevelcure(c *gin.Context) {
	var levelcure entity.Levelcure
	if err := c.ShouldBindJSON(&levelcure); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&levelcure).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": levelcure})
}

// GET /Levelcure
func GetLevelcure(c *gin.Context) {
	var levelcure entity.Levelcure
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM levelcures WHERE id = ?", id).Scan(&levelcure).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": levelcure})
}

// GET /Levelcures
func ListLevelcures(c *gin.Context) {
	var levelcures []entity.Levelcure
	if err := entity.DB().Raw("SELECT * FROM levelcures").Scan(&levelcures).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": levelcures})
}

// DELETE /levelcures/:id
func DeleteLevelcure(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM levelcures WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "levelcure not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /levelcures
func UpdateLevelcure(c *gin.Context) {
	var levelcure entity.Levelcure
	if err := c.ShouldBindJSON(&levelcure); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", levelcure.ID).First(&levelcure); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "levelcure not found"})
		return
	}
	if err := entity.DB().Save(&levelcure).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": levelcure})
}
