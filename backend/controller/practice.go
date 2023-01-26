package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team08/entity"
)

// POST /practices
func CreatePractice(c *gin.Context) {
	var practice entity.Practice
	if err := c.ShouldBindJSON(&practice); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&practice).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": practice})
}

// GET /Practice
func GetPractice(c *gin.Context) {
	var practice entity.Practice
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM practices WHERE id = ?", id).Scan(&practice).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": practice})
}

// GET /Practices
func ListPractices(c *gin.Context) {
	var practices []entity.Practice
	if err := entity.DB().Raw("SELECT * FROM practices").Scan(&practices).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": practices})
}

// DELETE /practices/:id
func DeletePractice(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM practices WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "practice not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /practices
func UpdatePractice(c *gin.Context) {
	var practice entity.Practice
	if err := c.ShouldBindJSON(&practice); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", practice.ID).First(&practice); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "practice not found"})
		return
	}
	if err := entity.DB().Save(&practice).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": practice})
}
