package controller

import (
	"github.com/sut65/team08/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /Religion

func CreateReligion(c *gin.Context) {
	var Religion entity.Religion
	if err := c.ShouldBindJSON(&Religion); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&Religion).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Religion})
}

// GET /Religion/:id
func GetReligion(c *gin.Context) {
	var Religion entity.Religion
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM Religions WHERE id = ?", id).Scan(&Religion).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Religion})
}

// GET /Religion
func ListReligion(c *gin.Context) {
	var Religion []entity.Religion
	if err := entity.DB().Raw("SELECT * FROM Religions").Scan(&Religion).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Religion})
}

// DELETE /Religion/:id
func DeleteReligion(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM Religions WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Religion
func UpdateReligion(c *gin.Context) {
	var Religion entity.Religion
	if err := c.ShouldBindJSON(&Religion); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", Religion.ID).First(&Religion); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	if err := entity.DB().Save(&Religion).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Religion})

}
