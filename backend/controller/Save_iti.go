package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team08/entity"
)

// POST /save_iti
func CreateSave_ITI(c *gin.Context) {
	// var save_iti entity.Save_ITI
	// if err := c.ShouldBindJSON(&save_iti); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }
	// if err := entity.DB().Create(&save_iti).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }
	// c.JSON(http.StatusOK, gin.H{"data": save_iti})

	var Save_ITI entity.Save_ITI
	var Treatment entity.Treatment
	//var Building entity.Building
	var Room entity.Room
	var State entity.State
	var Doctor entity.Doctor

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 9 จะถูก bind เข้าตัวแปร Save_ITI
	if err := c.ShouldBindJSON(&Save_ITI); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 10 ค้นหา Treatment ด้วย id
	if tx := entity.DB().Where("id = ?", Save_ITI.TreatmentID).First(&Treatment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "not found Treatment"})
		return
	}

	// 11 ค้นหา Building ด้วย id
	// if tx := entity.DB().Where("id = ?", Save_ITI.BuildingID).First(&Building); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "not found JobType"})
	// 	return
	// }

	// 12 ค้นหา Room ด้วย id
	if tx := entity.DB().Where("id = ?", Save_ITI.RoomID).First(&Room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "not found JobType"})
		return
	}

	// 13 ค้นหา State ด้วย id
	if tx := entity.DB().Where("id = ?", Save_ITI.StateID).First(&State); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "not found JobType"})
		return
	}

	// 14 ค้นหา Doctor ด้วย id
	if tx := entity.DB().Where("id = ?", Save_ITI.DoctorID).First(&Doctor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "nationality not found"})
		return
	}

	// 15: สร้าง Save_ITI
	save := entity.Save_ITI{
		Date_checkin:  Save_ITI.Date_checkin,
		Date_checkout: Save_ITI.Date_checkout,
		TextSave:      Save_ITI.TextSave,

		DoctorID:    Save_ITI.DoctorID,
		TreatmentID: Save_ITI.TreatmentID,
		//BuildingID:  	Save_ITI.BuildingID,
		RoomID:  Save_ITI.RoomID,
		StateID: Save_ITI.StateID,
	}

	if _, err := govalidator.ValidateStruct(save); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 16: บันทึก
	if err := entity.DB().Create(&save).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": save})
}

// GET /save_iti/:id
func GetSave_ITI(c *gin.Context) {
	var save_iti entity.Save_ITI
	id := c.Param("id")
	if err := entity.DB().Preload("Treatment").Preload("Building").Preload("Room").Preload("Doctor").Preload("State").Raw("SELECT * FROM save_itis WHERE id = ?", id).Find(&save_iti).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": save_iti})
}

// GET /save_iti
func ListSave_ITIs(c *gin.Context) {
	var save_itis []entity.Save_ITI
	if err := entity.DB().Preload("Treatment").Preload("Building").Preload("Room").Preload("State").Preload("Doctor").Raw("SELECT * FROM save_itis").Find(&save_itis).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": save_itis})
}

// DELETE /save_iti/:id
func DeleteSave_ITI(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM save_itis WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "save_iti not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /save_iti
func UpdateSave_ITI(c *gin.Context) {
	var Save_ITI entity.Save_ITI

	if err := c.ShouldBindJSON(&Save_ITI); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง
	upsave := entity.Save_ITI{
		Date_checkin:  Save_ITI.Date_checkin,
		Date_checkout: Save_ITI.Date_checkout,
		TextSave:      Save_ITI.TextSave,

		TreatmentID: Save_ITI.TreatmentID,
		//BuildingID:  	Save_ITI.BuildingID,
		RoomID:  Save_ITI.RoomID,
		StateID: Save_ITI.StateID,
	}

	if _, err := govalidator.ValidateStruct(upsave); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Where("id = ?", Save_ITI.ID).Updates(&upsave).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": upsave})
}

func ListReady_Save(c *gin.Context) {
	var operating_rooms []entity.Save_ITI
	if err := entity.DB().Preload("Treatment").Preload("Building").Preload("Room").Preload("State").
		Raw("select * from save_itis where id not in " +
			"(select t.id from save_itis t INNER JOIN operating_rooms o on t.id = o.save_iti_id )" +
			"and state_id = 1").Find(&operating_rooms).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": operating_rooms})
}
