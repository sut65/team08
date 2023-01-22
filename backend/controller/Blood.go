package controller

import (
	"github.com/sut65/team08/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /Blood

func CreateBlood(c *gin.Context) {

	var Blood entity.Blood
	if err := c.ShouldBindJSON(&Blood); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if err := entity.DB().Create(&Blood).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Blood})

}

// GET /Blood/:id

func GetBlood(c *gin.Context) {

	var Blood entity.Blood

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM Bloods WHERE id = ?", id).Scan(&Blood).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Blood})

}

// GET /Blood

func ListBlood(c *gin.Context) {

	var Blood []entity.Blood

	if err := entity.DB().Raw("SELECT * FROM Bloods").Scan(&Blood).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Blood})

}

// DELETE /Blood/:id

func DeleteBlood(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM Bloods WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /Blood

func UpdateBlood(c *gin.Context) {

	var Blood entity.Blood

	if err := c.ShouldBindJSON(&Blood); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if tx := entity.DB().Where("id = ?", Blood.ID).First(&Blood); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})

		return

	}

	if err := entity.DB().Save(&Blood).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Blood})

}
