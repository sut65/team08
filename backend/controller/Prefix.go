package controller

import (
	"github.com/sut65/team08/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /Prefix

func CreatePrefix(c *gin.Context) {

	var Prefix entity.Prefix
	if err := c.ShouldBindJSON(&Prefix); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if err := entity.DB().Create(&Prefix).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Prefix})

}

// GET /Prefix/:id

func GetPrefix(c *gin.Context) {

	var Prefix entity.Prefix

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM Prefixes WHERE id = ?", id).Scan(&Prefix).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Prefix})

}

// GET /Prefix

func ListPrefix(c *gin.Context) {

	var Prefix []entity.Prefix

	if err := entity.DB().Raw("SELECT * FROM Prefixes").Scan(&Prefix).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Prefix})

}

// DELETE /Prefix/:id

func DeletePrefix(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM Prefixes WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /Teaching_duration

func UpdatePrefix(c *gin.Context) {

	var Prefix entity.Prefix

	if err := c.ShouldBindJSON(&Prefix); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if tx := entity.DB().Where("id = ?", Prefix.ID).First(&Prefix); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})

		return

	}

	if err := entity.DB().Save(&Prefix).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Prefix})

}
