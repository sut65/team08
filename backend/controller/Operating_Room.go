package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team08/entity"
)

// POST /operating_room
func CreateOperating_Room(c *gin.Context) {

	var Operating_Room entity.Operating_Room
	var Save_ITI entity.Save_ITI
	//var Building entity.Building
	var Room entity.Room
	var Doctor entity.Doctor

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 9 จะถูก bind เข้าตัวแปร Operating_Room
	if err := c.ShouldBindJSON(&Operating_Room); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 10 ค้นหา Save_ITI ด้วย id
	if tx := entity.DB().Where("id = ?", Operating_Room.Save_ITIID).First(&Save_ITI); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "not found Save_ITI"})
		return
	}

	// 11 ค้นหา Building ด้วย id
	// if tx := entity.DB().Where("id = ?", Operating_Room.BuildingID).First(&Building); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "not found JobType"})
	// 	return
	// }

	// 12 ค้นหา Room ด้วย id
	if tx := entity.DB().Where("id = ?", Operating_Room.RoomID).First(&Room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "not found JobType"})
		return
	}
	
	// 13 ค้นหา Doctor ด้วย id
	if tx := entity.DB().Where("id = ?", Operating_Room.DoctorID).First(&Doctor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "nationality not found"})
		return
	}

	// 14: สร้าง Operating_Room
	save := entity.Operating_Room{
		NumOper: Operating_Room.NumOper,
		Datetime: Operating_Room.Datetime,
		TextOper: Operating_Room.TextOper,

		DoctorID: Operating_Room.DoctorID,
		Save_ITIID: 	Operating_Room.Save_ITIID,
		//BuildingID:  	Operating_Room.BuildingID,
		RoomID:		Operating_Room.RoomID,
	}

	if _, err := govalidator.ValidateStruct(save); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 15: บันทึก
	if err := entity.DB().Create(&save).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": save})
}

// GET /operating_room/:id
func GetOperating_Room(c *gin.Context) {
	var operating_room entity.Operating_Room
	id := c.Param("id")
	if err := entity.DB().Preload("Save_ITI").Preload("Building").Preload("Room").Preload("Doctor").Raw("SELECT * FROM operating_rooms WHERE id = ?", id).Find(&operating_room).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": operating_room})
}

// GET /operating_room
func ListOperating_Rooms(c *gin.Context) {
	var operating_rooms []entity.Operating_Room
	if err := entity.DB().Preload("Save_ITI").Preload("Building").Preload("Room").Preload("Doctor").Raw("SELECT * FROM operating_rooms").Find(&operating_rooms).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": operating_rooms})
}

// DELETE /operating_room/:id
func DeleteOperating_Room(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM operating_rooms WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "operating_room not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /operating_room
func UpdateOperating_Room(c *gin.Context) {
	var Operating_Room entity.Operating_Room

	if err := c.ShouldBindJSON(&Operating_Room); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	// สร้าง
	upoperate := entity.Operating_Room{
		NumOper: Operating_Room.NumOper,
		Datetime: Operating_Room.Datetime,
		TextOper: Operating_Room.TextOper,

		Save_ITIID: 	Operating_Room.Save_ITIID,
		//BuildingID:  	Operating_Room.BuildingID,
		RoomID:		Operating_Room.RoomID,
	}

	if _, err := govalidator.ValidateStruct(upoperate); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Where("id = ?", Operating_Room.ID).Updates(&upoperate).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": upoperate})
}

