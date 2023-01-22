package controller

import (
	"github.com/sut65/team08/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /AddressThailand

func CreateAddressThailand(c *gin.Context) {

	var AddressThailand entity.AddressThailand
	if err := c.ShouldBindJSON(&AddressThailand); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if err := entity.DB().Create(&AddressThailand).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": AddressThailand})

}

// GET /AddressThailand/:id
func GetAddressThailand(c *gin.Context) {
	var AddressThailand entity.AddressThailand
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM Address_thailands WHERE id = ?", id).Scan(&AddressThailand).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": AddressThailand})
}

// GET /ZipAddressThailand/:id
func GetZipAddressThailand(c *gin.Context) {
	var Zip []entity.AddressThailand
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM Address_thailands WHERE zipcode = ?", id).Scan(&Zip).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Zip})
}

// GET /AddressThailand
func ListAddressThailand(c *gin.Context) {
	var AddressThailand []entity.AddressThailand
	if err := entity.DB().Raw("SELECT * FROM Address_thailands").Scan(&AddressThailand).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": AddressThailand})
}

// DELETE /AddressThailand/:id

func DeleteAddressThailand(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM Address_thailands WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /AddressThailand

func UpdateAddressThailand(c *gin.Context) {

	var AddressThailand entity.AddressThailand

	if err := c.ShouldBindJSON(&AddressThailand); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if tx := entity.DB().Where("id = ?", AddressThailand.ID).First(&AddressThailand); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})

		return

	}

	if err := entity.DB().Save(&AddressThailand).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": AddressThailand})

}
