package controller

import (
	"github.com/sut65/team08/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /Lab

func CreateLab(c *gin.Context) {
	var Lab entity.Lab
	if err := c.ShouldBindJSON(&Lab); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&Lab).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Lab})
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
