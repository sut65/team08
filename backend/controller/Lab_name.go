package controller

import (
	"github.com/sut65/team08/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /Lab_Name

func CreateLabName(c *gin.Context) {
	var Lab_Name entity.Lab_Name
	if err := c.ShouldBindJSON(&Lab_Name); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&Lab_Name).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Lab_Name})
}

// GET /Lab_Name/:id
func GetLabName(c *gin.Context) {
	var Lab_Name entity.Lab_Name
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM lab_names WHERE id = ?", id).Scan(&Lab_Name).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Lab_Name})
}

// GET /Lab_Name
func ListLabName(c *gin.Context) {
	var Lab_Name []entity.Lab_Name
	if err := entity.DB().Raw("SELECT * FROM lab_names").Scan(&Lab_Name).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Lab_Name})
}

// DELETE /Lab_Name/:id
func DeleteLabName(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM lab_names WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Lab_Name
func UpdateLabName(c *gin.Context) {
	var Lab_Name entity.Lab_Name
	if err := c.ShouldBindJSON(&Lab_Name); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", Lab_Name.ID).First(&Lab_Name); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	if err := entity.DB().Save(&Lab_Name).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Lab_Name})

}
