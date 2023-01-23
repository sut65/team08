package controller

import (
	"github.com/sut65/team08/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /DocPrefix

func CreateDocPrefix(c *gin.Context) {
	var DocPrefix entity.DocPrefix
	if err := c.ShouldBindJSON(&DocPrefix); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&DocPrefix).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": DocPrefix})
}

// GET /DocPrefix/:id
func GetDocPrefix(c *gin.Context) {
	var DocPrefix entity.DocPrefix
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM Doc_prefixes WHERE id = ?", id).Scan(&DocPrefix).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": DocPrefix})
}

// GET /DocPrefix
func ListDocPrefix(c *gin.Context) {
	var DocPrefix []entity.DocPrefix
	if err := entity.DB().Raw("SELECT * FROM Doc_prefixes").Scan(&DocPrefix).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": DocPrefix})
}

// DELETE /DocPrefix/:id
func DeleteDocPrefix(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM Doc_prefixes WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /DocPrefix
func UpdateDocPrefix(c *gin.Context) {
	var DocPrefix entity.DocPrefix
	if err := c.ShouldBindJSON(&DocPrefix); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", DocPrefix.ID).First(&DocPrefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	if err := entity.DB().Save(&DocPrefix).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": DocPrefix})

}
