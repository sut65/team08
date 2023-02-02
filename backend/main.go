package main

import (
	"github.com/sut65/team08/controller"
	"github.com/sut65/team08/middlewares"

	"github.com/sut65/team08/entity"

	//"github.com/B6332907/SE-G08/middlewares"

	"github.com/gin-gonic/gin"
)

func main() {

	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())

	router := r.Group("/")

	{
		router.Use(middlewares.Authorizes())
		{
			// J
			//Building
			r.GET("/Buildings", controller.ListBuildings)
			r.GET("/Building/:id", controller.GetBuilding)
			r.POST("/Building", controller.CreateBuilding)
			r.PATCH("/Building", controller.UpdateBuilding)
			r.DELETE("/Building/:id", controller.DeleteBuilding)

			//Room
			r.GET("/Rooms", controller.ListRooms)
			r.GET("/Room/:id", controller.GetRoom)
			r.POST("/Room", controller.CreateRoom)
			r.PATCH("/Room", controller.UpdateRoom)
			r.DELETE("/Room/:id", controller.DeleteRoom)

			//State
			r.GET("/States", controller.ListStates)
			r.GET("/State/:id", controller.GetState)
			r.POST("/States", controller.CreateState)
			r.PATCH("/States", controller.UpdateState)
			r.DELETE("/State/:id", controller.DeleteState)

			//Save_ITI
			r.GET("/Save_ITIs", controller.ListSave_ITIs)
			r.GET("/Save_ITI/:id", controller.GetSave_ITI)
			r.POST("/Save_ITIs", controller.CreateSave_ITI)
			r.PATCH("/Save_ITI", controller.UpdateSave_ITI)
			r.DELETE("/Save_ITI/:id", controller.DeleteSave_ITI)
			r.GET("/Save_ITIs/ready", controller.ListReady_Save)

			//Operating_Room
			r.GET("/Operating_Rooms", controller.ListOperating_Rooms)
			r.GET("/Operating_Room/:id", controller.GetOperating_Room)
			r.POST("/Operating_Rooms", controller.CreateOperating_Room)
			r.PATCH("/Operating_Room", controller.UpdateOperating_Room)
			r.DELETE("/Operating_Room/:id", controller.DeleteOperating_Room)
			//---------------------------------------------------

			// Screening_officer
			r.GET("/Screening_officers", controller.ListScreening_officer)
			r.GET("/Screening_officer/:id", controller.GetScreening_officer)
			r.POST("/Screening_officers", controller.CreateScreening_officer)
			r.PATCH("/Screening_officers", controller.UpdateScreening_officer)
			r.DELETE("/Screening_officers/:id", controller.DeleteScreening_officer)

			//Prefix
			r.GET("/Prefixs", controller.ListPrefix)
			r.GET("/Prefix/:id", controller.GetPrefix)
			r.POST("/Prefix", controller.CreatePrefix)
			r.PATCH("/Prefix", controller.UpdatePrefix)
			r.DELETE("/Prefix/:id", controller.DeletePrefix)

			//Gender
			r.GET("/Genders", controller.ListGender)
			r.GET("/Gender/:id", controller.GetGender)
			r.POST("/Gender", controller.CreateGender)
			r.PATCH("/Gender", controller.UpdateGender)
			r.DELETE("/Gender/:id", controller.DeleteGender)

			//Education
			r.GET("/Educations", controller.ListEducation)
			r.GET("/Education/:id", controller.GetEducation)
			r.POST("/Educations", controller.CreateEducation)
			r.PATCH("/Educations", controller.UpdateEducation)
			r.DELETE("/Education/:id", controller.DeleteEducation)

			//Patient
			r.GET("/Patients", controller.ListPatient)
			r.GET("/Patient/:id", controller.GetPatient)
			r.POST("/Patients", controller.CreatePatient)
			r.PATCH("/Patients", controller.UpdatePatient)
			r.DELETE("/Patient/:id", controller.DeletePatient)

			// Run the server

			//idea Nationality
			//Blood
			r.GET("/Bloods", controller.ListBlood)
			r.GET("/Blood/:id", controller.GetBlood)
			r.POST("/Blood", controller.CreateBlood)
			r.PATCH("/Blood", controller.UpdateBlood)
			r.DELETE("/Blood/:id", controller.DeleteBlood)

			//Nationality
			r.GET("/Nationalities", controller.ListNationality)
			r.GET("/Nationality/:id", controller.GetNationality)
			r.POST("/Nationality", controller.CreateNationality)
			r.PATCH("/Nationality", controller.UpdateNationality)
			r.DELETE("/Nationality/:id", controller.DeleteNationality)

			//Marital
			r.GET("/Maritals", controller.ListMarital)
			r.GET("/Marital/:id", controller.GetMarital)
			r.POST("/Marital", controller.CreateMarital)
			r.PATCH("/Marital", controller.UpdateMarital)
			r.DELETE("/Marital/:id", controller.DeleteMarital)

			//AddressThailand
			r.GET("/AddressThailands", controller.ListAddressThailand)
			r.GET("/AddressThailand/:id", controller.GetAddressThailand)
			r.GET("/ZipAddressThailand/:id", controller.GetZipAddressThailand)
			r.POST("/AddressThailand", controller.CreateAddressThailand)
			r.PATCH("/AddressThailand", controller.UpdateAddressThailand)
			r.DELETE("/AddressThailand/:id", controller.DeleteAddressThailand)

			//Religion
			r.GET("/Religions", controller.ListReligion)
			r.GET("/Religion/:id", controller.GetReligion)
			r.POST("/Religion", controller.CreateReligion)
			r.PATCH("/Religion", controller.UpdateReligion)
			r.DELETE("/Religion/:id", controller.DeleteReligion)

			//DocPrefix
			r.GET("/DocPrefixs", controller.ListDocPrefix)
			r.GET("/DocPrefix/:id", controller.GetDocPrefix)
			r.POST("/DocPrefix", controller.CreateDocPrefix)
			r.PATCH("/DocPrefix", controller.UpdateDocPrefix)
			r.DELETE("/DocPrefix/:id", controller.DeleteDocPrefix)

			//Doctor
			r.GET("/Doctors", controller.ListDoctor)
			r.GET("/Doctor/:id", controller.GetDoctor)
			r.POST("/Doctor", controller.CreateDoctor)
			r.PATCH("/Doctor", controller.UpdateDoctor)
			r.DELETE("/Doctor/:id", controller.DeleteDoctor)

			//Gg
			// โรค
			r.GET("/diseases", controller.ListDiseases)
			r.GET("/diseases/:id", controller.GetDisease)
			r.POST("/disease", controller.CreateDisease)
			r.PATCH("/disease", controller.UpdateDisease)
			r.DELETE("/disease/:id", controller.DeleteDisease)

			// สถานะ
			r.GET("/statuses", controller.ListStatuses)
			r.GET("/status/:id", controller.GetStatus)
			r.POST("/statuses", controller.CreateStatus)
			r.PATCH("/statuses", controller.UpdateStatus)
			r.DELETE("/status/:id", controller.DeleteStatus)

			// สถานะ
			r.GET("/tracks", controller.ListTracks)
			r.GET("/tracks/:id", controller.GetTrack)
			r.POST("/tracks", controller.CreateTrack)
			r.PATCH("/tracks", controller.UpdateTrack)
			r.DELETE("/track/:id", controller.DeleteTrack)

			// ตารางหลัก ข้อมูลการรักษา ************************************************************
			r.GET("/treatments", controller.ListTreatment)
			r.GET("/treatments/:id", controller.GetTreatment)
			r.POST("/treatments", controller.CreateTreatment)
			r.PATCH("/treatments", controller.UpdateTreatment)
			r.DELETE("/treatment/:id", controller.DeleteTreatment)
			r.GET("/treatments/ready", controller.ListReady_Treat)
			r.GET("/treatments/readyyy", controller.ListReady_Dispense)
			r.GET("/treatments/readyapp", controller.ListReady_Appoint)

			//Aern

			// Drug Routes
			r.GET("/drugs", controller.ListDrugs)
			r.GET("/drug/:id", controller.GetDrug)
			r.POST("/drugs", controller.CreateDrug)
			r.PATCH("/drugs", controller.UpdateDrug)
			r.DELETE("/drugs/:id", controller.DeleteDrug)

			// Practice Routes
			r.GET("/practice", controller.ListPractices)
			r.GET("/practice/:id", controller.GetPractice)
			r.POST("/practice", controller.CreatePractice)
			r.PATCH("/practice", controller.UpdatePractice)
			r.DELETE("/practice/:id", controller.DeletePractice)

			// Dispense Routes
			r.GET("/dispense", controller.ListDispenses)
			r.GET("/dispense/:id", controller.GetDispense)
			r.POST("/dispense", controller.CreateDispense)
			r.PATCH("/dispense", controller.UpdateDispense)
			r.DELETE("/dispense/:id", controller.DeleteDispense)

			//Aern2
			// Departments Routes 6
			r.GET("/department", controller.ListDepartments)
			r.GET("/department/:id", controller.GetDepartment)
			r.POST("/department", controller.CreateDepartment)
			r.PATCH("/department", controller.UpdateDepartment)
			r.DELETE("/department/:id", controller.DeleteDepartment)

			// Levelcure Routes 7
			r.GET("/levelcure", controller.ListLevelcures)
			r.GET("/levelcure/:id", controller.GetLevelcure)
			r.POST("/levelcure", controller.CreateLevelcure)
			r.PATCH("/levelcure", controller.UpdateLevelcure)
			r.DELETE("/levelcure/:id", controller.DeleteLevelcure)

			// Appoint Routes 9
			r.GET("/appoint", controller.ListAppoints)
			r.GET("/appoint/:id", controller.GetAppoint)
			r.POST("/appoint", controller.CreateAppoint)
			r.PATCH("/appoint", controller.UpdateAppoint)
			r.DELETE("/appoint/:id", controller.DeleteAppoint)

			//LEO
			// Medical Equipment Employee Routes
			r.GET("/medemployees", controller.ListMedEmployees)
			r.GET("/medemployees/:id", controller.GetMedEmployee)
			r.POST("/medemployees", controller.CreateMedEmployee)
			r.PATCH("/medemployees", controller.UpdateMedEmployee)
			r.DELETE("/medemployees/:id", controller.DeleteMedEmployee)

			// Brand Routes
			r.GET("/brands", controller.ListBrands)
			r.GET("/brands/:id", controller.GetBrand)
			r.POST("/brands", controller.CreateBrand)
			r.PATCH("/brands", controller.UpdateBrand)
			r.DELETE("/brands/:id", controller.DeleteBrand)

			// Status Routes
			r.GET("/medstatuses", controller.ListMedStatuses)
			r.GET("/medstatuses/:id", controller.GetMedStatus)
			r.POST("/medstatuses", controller.CreateMedStatus)
			r.PATCH("/medstatuses", controller.UpdateMedStatus)
			r.DELETE("/medstatuses/:id", controller.DeleteMedStatus)

			// med equipment Routes
			r.GET("/medicalequipments", controller.ListMedEquipments)
			r.GET("/medicalequipment/:id", controller.GetMedEquipment)
			r.POST("/medicalequipments", controller.CreateMedEquipment)
			r.PATCH("/medicalequipments", controller.UpdateMedEquipment)
			r.DELETE("/medicalequipments/:id", controller.DeleteMedEquipment)

			//Gg
			r.GET("/locations", controller.ListLocations) ////---------------------
			r.GET("/locations/:id", controller.GetLocation)
			r.POST("/locations", controller.CreateLocation)
			r.PATCH("/locations", controller.UpdateLocation)
			r.DELETE("/location/:id", controller.DeleteLocation)

			r.GET("/requests", controller.ListRequest) ////------------------------
			r.GET("/requests/:id", controller.GetRequest)
			r.POST("/requests", controller.CreateRequest)
			r.PATCH("/requests", controller.UpdateRequest)
			r.DELETE("/request/:id", controller.DeleteRequest)

		}

	}
	// Signup User Route
	r.POST("/signup", controller.CreatePrefix)
	// login User Route
	r.POST("/login", controller.Login)

	// Run the server go run main.go
	r.Run()

}

func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")

		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {

			c.AbortWithStatus(204)

			return
		}

		c.Next()
	}

}
