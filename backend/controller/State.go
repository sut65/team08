package controller

import (
	"net/http"

	"github.com/sut65/team08/entity"
	"github.com/gin-gonic/gin"
)

// POST /states
func CreateState(c *gin.Context) {
	var state entity.State
	if err := c.ShouldBindJSON(&state); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&state).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": state})
}

// GET /states/:id
func GetState(c *gin.Context) {
	var state entity.State
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM states WHERE id = ?", id).Scan(&state).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": state})
}

// GET /building
func ListStates(c *gin.Context) {
	var states []entity.State
	if err := entity.DB().Raw("SELECT * FROM states").Scan(&states).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": states})
}

// DELETE /States/:id
func DeleteState(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM states WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "states not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /States
func UpdateState(c *gin.Context) {
	var state entity.State
	if err := c.ShouldBindJSON(&state); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", state.ID).First(&state); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "states not found"})
		return
	}
	if err := entity.DB().Save(&state).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": state})
}