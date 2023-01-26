package controller

import (
	"net/http"

	"github.com/sut65/team08/entity"
	"github.com/gin-gonic/gin"
)

// POST /statuses
func CreateMedStatus(c *gin.Context) {
	var med_status entity.Med_Status
	if err := c.ShouldBindJSON(&med_status); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&med_status).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": med_status})
}

// GET /status/:id
func GetMedStatus(c *gin.Context) {
	var med_status entity.Med_Status
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&med_status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "status not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": med_status})
}

// GET /ststuses
func ListMedStatuses(c *gin.Context) {
	var med_statuses []entity.Med_Status
	if err := entity.DB().Raw("SELECT * FROM med_statuses").Scan(&med_statuses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": med_statuses})
}

// DELETE /statuses/:id
func DeleteMedStatus(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM med_statuses WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "statuses not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /statuses
func UpdateMedStatus(c *gin.Context) {
	var med_status entity.Med_Status
	if err := c.ShouldBindJSON(&med_status); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", med_status.ID).First(&med_status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "paymenttype not found"})
		return
	}

	if err := entity.DB().Save(&med_status).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": med_status})
}
