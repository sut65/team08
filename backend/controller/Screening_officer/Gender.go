package controller

import (
	"github.com/sut65/team08/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /Gender

func CreateGender(c *gin.Context) {

	var Gender entity.Gender
	if err := c.ShouldBindJSON(&Gender); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if err := entity.DB().Create(&Gender).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Gender})

}

// GET /Gender/:id

func GetGender(c *gin.Context) {

	var Gender entity.Gender

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM Genders WHERE id = ?", id).Scan(&Gender).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Gender})

}

// GET /Gender

func ListGender(c *gin.Context) {

	var Gender []entity.Gender

	if err := entity.DB().Raw("SELECT * FROM Genders").Scan(&Gender).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Gender})

}

// DELETE /Gender/:id

func DeleteGender(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM Genders WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /Teaching_duration

func UpdateGender(c *gin.Context) {

	var Gender entity.Gender

	if err := c.ShouldBindJSON(&Gender); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if tx := entity.DB().Where("id = ?", Gender.ID).First(&Gender); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})

		return

	}

	if err := entity.DB().Save(&Gender).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Gender})

}
