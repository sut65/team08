package controller

import (
	"github.com/sut65/team08/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /Marital

func CreateMarital(c *gin.Context) {
	var Marital entity.Marital
	if err := c.ShouldBindJSON(&Marital); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&Marital).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Marital})
}

// GET /Marital/:id
func GetMarital(c *gin.Context) {
	var Marital entity.Marital
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM Maritals WHERE id = ?", id).Scan(&Marital).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Marital})
}

// GET /Marital
func ListMarital(c *gin.Context) {
	var Marital []entity.Marital
	if err := entity.DB().Raw("SELECT * FROM Maritals").Scan(&Marital).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Marital})
}

// DELETE /Marital/:id
func DeleteMarital(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM Maritals WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Marital
func UpdateMarital(c *gin.Context) {
	var Marital entity.Marital
	if err := c.ShouldBindJSON(&Marital); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", Marital.ID).First(&Marital); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	if err := entity.DB().Save(&Marital).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Marital})

}
