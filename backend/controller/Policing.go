package controller

import (
	"github.com/sut65/team08/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /Policing

func CreatePolicing(c *gin.Context) {

	var Policing entity.Policing
	if err := c.ShouldBindJSON(&Policing); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if err := entity.DB().Create(&Policing).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Policing})

}

// GET /Policing/:id

func GetPolicing(c *gin.Context) {

	var Policing entity.Policing

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM Policings WHERE id = ?", id).Scan(&Policing).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Policing})

}

// GET /Policing

func ListPolicing(c *gin.Context) {

	var Policing []entity.Policing

	if err := entity.DB().Raw("SELECT * FROM Policings").Scan(&Policing).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Policing})

}

// DELETE /Policing/:id

func DeletePolicing(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM Policings WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /Teaching_duration

func UpdatePolicing(c *gin.Context) {

	var Policing entity.Policing

	if err := c.ShouldBindJSON(&Policing); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if tx := entity.DB().Where("id = ?", Policing.ID).First(&Policing); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})

		return

	}

	if err := entity.DB().Save(&Policing).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Policing})

}
