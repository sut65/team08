package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team08/entity"
)

// POST /drugs
func CreateDrug(c *gin.Context) {
	var drug entity.Drug
	if err := c.ShouldBindJSON(&drug); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&drug).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": drug})
}

// GET /Drug
func GetDrug(c *gin.Context) {
	var drug entity.Drug
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM drugs WHERE id = ?", id).Scan(&drug).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": drug})
}

// GET /Drugs
func ListDrugs(c *gin.Context) {
	var drugs []entity.Drug
	if err := entity.DB().Raw("SELECT * FROM drugs").Scan(&drugs).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": drugs})
}

// DELETE /drugs/:id
func DeleteDrug(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM drugs WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "drug not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /drugs
func UpdateDrug(c *gin.Context) {
	var drug entity.Drug
	if err := c.ShouldBindJSON(&drug); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", drug.ID).First(&drug); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "drug not found"})
		return
	}
	if err := entity.DB().Save(&drug).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": drug})
}
