package controller

import (
	"github.com/sut65/team08/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /Education

func CreateEducation(c *gin.Context) {

	var Education entity.Education
	if err := c.ShouldBindJSON(&Education); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if err := entity.DB().Create(&Education).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Education})

}

// GET /Education/:id

func GetEducation(c *gin.Context) {

	var Education entity.Education

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM educations WHERE id = ?", id).Scan(&Education).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Education})

}

// GET /Education

func ListEducation(c *gin.Context) {

	var Education []entity.Education

	if err := entity.DB().Raw("SELECT * FROM educations").Scan(&Education).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Education})

}

// DELETE /Education/:id

func DeleteEducation(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM educations WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /Teaching_duration

func UpdateEducation(c *gin.Context) {

	var Education entity.Education

	if err := c.ShouldBindJSON(&Education); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if tx := entity.DB().Where("id = ?", Education.ID).First(&Education); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})

		return

	}

	if err := entity.DB().Save(&Education).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Education})

}
