package controller

import (
	"github.com/sut65/team08/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /Nationality

func CreateNationality(c *gin.Context) {

	var Nationality entity.Nationality
	if err := c.ShouldBindJSON(&Nationality); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if err := entity.DB().Create(&Nationality).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Nationality})

}

// GET /Nationality/:id

func GetNationality(c *gin.Context) {

	var Nationality entity.Nationality

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM Nationalities WHERE id = ?", id).Scan(&Nationality).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Nationality})

}

// GET /Nationality

func ListNationality(c *gin.Context) {

	var Nationality []entity.Nationality

	if err := entity.DB().Raw("SELECT * FROM Nationalities").Scan(&Nationality).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Nationality})

}

// DELETE /Nationality/:id

func DeleteNationality(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM Nationalities WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /Nationality

func UpdateNationality(c *gin.Context) {

	var Nationality entity.Nationality

	if err := c.ShouldBindJSON(&Nationality); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if tx := entity.DB().Where("id = ?", Nationality.ID).First(&Nationality); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})

		return

	}

	if err := entity.DB().Save(&Nationality).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Nationality})

}
