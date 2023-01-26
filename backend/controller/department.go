package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team08/entity"
)

// POST /departments
func CreateDepartment(c *gin.Context) {
	var department entity.Department
	if err := c.ShouldBindJSON(&department); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&department).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": department})
}

// GET /Department
func GetDepartment(c *gin.Context) {
	var department entity.Department
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM departments WHERE id = ?", id).Scan(&department).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": department})
}

// GET /Departments
func ListDepartments(c *gin.Context) {
	var departments []entity.Department
	if err := entity.DB().Raw("SELECT * FROM departments").Scan(&departments).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": departments})
}

// DELETE /departments/:id
func DeleteDepartment(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM departments WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "department not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /departments
func UpdateDepartment(c *gin.Context) {
	var department entity.Department
	if err := c.ShouldBindJSON(&department); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", department.ID).First(&department); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "department not found"})
		return
	}
	if err := entity.DB().Save(&department).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": department})
}
