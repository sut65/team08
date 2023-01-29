package controller

import (
	"github.com/sut65/team08/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /GeneralPrefix

func CreateGeneralPrefix(c *gin.Context) {

	var GeneralPrefix entity.GeneralPrefix
	if err := c.ShouldBindJSON(&GeneralPrefix); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if err := entity.DB().Create(&GeneralPrefix).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": GeneralPrefix})

}

// GET /GeneralPrefix/:id

func GetGeneralPrefix(c *gin.Context) {

	var GeneralPrefix entity.GeneralPrefix

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM GeneralPrefixes WHERE id = ?", id).Scan(&GeneralPrefix).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": GeneralPrefix})

}

// GET /GeneralPrefix

func ListGeneralPrefix(c *gin.Context) {

	var GeneralPrefix []entity.GeneralPrefix

	if err := entity.DB().Raw("SELECT * FROM GeneralPrefixes").Scan(&GeneralPrefix).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": GeneralPrefix})

}

// DELETE /GeneralPrefix/:id

func DeleteGeneralPrefix(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM GeneralPrefixes WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /Teaching_duration

func UpdateGeneralPrefix(c *gin.Context) {

	var GeneralPrefix entity.GeneralPrefix

	if err := c.ShouldBindJSON(&GeneralPrefix); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if tx := entity.DB().Where("id = ?", GeneralPrefix.ID).First(&GeneralPrefix); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})

		return

	}

	if err := entity.DB().Save(&GeneralPrefix).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": GeneralPrefix})

}
