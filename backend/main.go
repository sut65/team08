package main

import (
	"github.com/sut65/team08/controller"
	"github.com/sut65/team08/middlewares"

	"github.com/sut65/team08/entity"

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
			// User Routes   //ของเอา Officer officer
			router.GET("/officers", controller.ListOfficers)
			router.GET("/officer/:id", controller.GetOfficer)
			router.PATCH("/officers", controller.UpdateOfficer)
			router.DELETE("/officers/:id", controller.DeleteOfficer)

			// J
			//Building
			router.GET("/Buildings", controller.ListBuildings)
			router.GET("/Building/:id", controller.GetBuilding)
			router.POST("/Building", controller.CreateBuilding)
			router.PATCH("/Building", controller.UpdateBuilding)
			router.DELETE("/Building/:id", controller.DeleteBuilding)

			//Room
			router.GET("/Rooms", controller.ListRooms)
			router.GET("/Room/:id", controller.GetRoom)
			router.POST("/Room", controller.CreateRoom)
			router.PATCH("/Room", controller.UpdateRoom)
			router.DELETE("/Room/:id", controller.DeleteRoom)
			router.GET("/Rooms/Building/:id", controller.ListRoomBuilding)

			//State
			router.GET("/States", controller.ListStates)
			router.GET("/State/:id", controller.GetState)
			router.POST("/States", controller.CreateState)
			router.PATCH("/States", controller.UpdateState)
			router.DELETE("/State/:id", controller.DeleteState)

			//Save_ITI
			router.GET("/Save_ITIs", controller.ListSave_ITIs)
			router.GET("/Save_ITI/:id", controller.GetSave_ITI)
			router.POST("/Save_ITIs", controller.CreateSave_ITI)
			router.PATCH("/Save_ITIUpdate", controller.UpdateSave_ITI)
			router.DELETE("/Save_ITI/:id", controller.DeleteSave_ITI)
			router.GET("/Save_ITIs/ready", controller.ListReady_Save)

			//Operating_Room
			router.GET("/Operating_Rooms", controller.ListOperating_Rooms)
			router.GET("/Operating_Room/:id", controller.GetOperating_Room)
			router.POST("/Operating_Rooms", controller.CreateOperating_Room)
			router.PATCH("/Operating_RoomUpdate", controller.UpdateOperating_Room)
			router.DELETE("/Operating_Room/:id", controller.DeleteOperating_Room)
			//---------------------------------------------------

			// Screening_officer
			router.GET("/Screening_officers", controller.ListScreening_officer)
			router.GET("/Screening_officer/:id", controller.GetScreening_officer)
			//router.POST("/Screening_officers", controller.CreateScreening_officer)
			router.PATCH("/Screening_officers", controller.UpdateScreening_officer)
			router.DELETE("/Screening_officers/:id", controller.DeleteScreening_officer)
			router.POST("/Screening_officer/create", controller.CreateScreening_officer) //////////***New
			//Prefix
			router.GET("/Prefixs", controller.ListPrefix)
			router.GET("/Prefix/:id", controller.GetPrefix)
			router.POST("/Prefix", controller.CreatePrefix)
			router.PATCH("/Prefix", controller.UpdatePrefix)
			router.DELETE("/Prefix/:id", controller.DeletePrefix)

			//Gender
			router.GET("/Genders", controller.ListGender)
			router.GET("/Gender/:id", controller.GetGender)
			router.POST("/Gender", controller.CreateGender)
			router.PATCH("/Gender", controller.UpdateGender)
			router.DELETE("/Gender/:id", controller.DeleteGender)

			//Education
			router.GET("/Educations", controller.ListEducation)
			router.GET("/Education/:id", controller.GetEducation)
			router.POST("/Educations", controller.CreateEducation)
			router.PATCH("/Educations", controller.UpdateEducation)
			router.DELETE("/Education/:id", controller.DeleteEducation)

			//Patient
			router.GET("/Patients", controller.ListPatient)
			router.GET("/Patient/:id", controller.GetPatient)
			router.POST("/Patients", controller.CreatePatient)
			router.PATCH("/Patients", controller.UpdatePatient)
			router.DELETE("/Patient/:id", controller.DeletePatient)

			// Run the server

			//idea Nationality
			//Blood
			router.GET("/Bloods", controller.ListBlood)
			router.GET("/Blood/:id", controller.GetBlood)
			router.POST("/Blood", controller.CreateBlood)
			router.PATCH("/Blood", controller.UpdateBlood)
			router.DELETE("/Blood/:id", controller.DeleteBlood)

			//Nationality
			router.GET("/Nationalities", controller.ListNationality)
			router.GET("/Nationality/:id", controller.GetNationality)
			router.POST("/Nationality", controller.CreateNationality)
			router.PATCH("/Nationality", controller.UpdateNationality)
			router.DELETE("/Nationality/:id", controller.DeleteNationality)

			//Marital
			router.GET("/Maritals", controller.ListMarital)
			router.GET("/Marital/:id", controller.GetMarital)
			router.POST("/Marital", controller.CreateMarital)
			router.PATCH("/Marital", controller.UpdateMarital)
			router.DELETE("/Marital/:id", controller.DeleteMarital)

			//AddressThailand
			router.GET("/AddressThailands", controller.ListAddressThailand)
			router.GET("/AddressThailand/:id", controller.GetAddressThailand)
			router.GET("/ZipAddressThailand/:id", controller.GetZipAddressThailand)
			router.POST("/AddressThailand", controller.CreateAddressThailand)
			router.PATCH("/AddressThailand", controller.UpdateAddressThailand)
			router.DELETE("/AddressThailand/:id", controller.DeleteAddressThailand)

			//Religion
			router.GET("/Religions", controller.ListReligion)
			router.GET("/Religion/:id", controller.GetReligion)
			router.POST("/Religion", controller.CreateReligion)
			router.PATCH("/Religion", controller.UpdateReligion)
			router.DELETE("/Religion/:id", controller.DeleteReligion)

			//DocPrefix
			router.GET("/DocPrefixs", controller.ListDocPrefix)
			router.GET("/DocPrefix/:id", controller.GetDocPrefix)
			router.POST("/DocPrefix", controller.CreateDocPrefix)
			router.PATCH("/DocPrefix", controller.UpdateDocPrefix)
			router.DELETE("/DocPrefix/:id", controller.DeleteDocPrefix)

			//Doctor
			router.GET("/Doctors", controller.ListDoctor)
			router.GET("/Doctor/:id", controller.GetDoctor)
			router.POST("/Doctor", controller.CreateDoctor) ///////
			router.PATCH("/Doctor", controller.UpdateDoctor)
			router.DELETE("/Doctor/:id", controller.DeleteDoctor)

			//Labname
			router.GET("/LabNames", controller.ListLabName)
			router.GET("/LabName/:id", controller.GetLabName)
			router.POST("/LabName", controller.CreateLabName)
			router.PATCH("/LabName", controller.UpdateLabName)
			router.DELETE("/LabName/:id", controller.DeleteLabName)

			//Lab
			router.GET("/Labs", controller.ListLab)
			router.GET("/Lab/:id", controller.GetLab)
			router.POST("/Lab", controller.CreateLab)
			router.PATCH("/Lab", controller.UpdateLab)
			router.DELETE("/Lab/:id", controller.DeleteLab)

			//Gg
			// โรค
			router.GET("/diseases", controller.ListDiseases)
			router.GET("/diseases/:id", controller.GetDisease)
			router.POST("/disease", controller.CreateDisease)
			router.PATCH("/disease", controller.UpdateDisease)
			router.DELETE("/disease/:id", controller.DeleteDisease)

			// สถานะ
			router.GET("/statuses", controller.ListStatuses)
			router.GET("/status/:id", controller.GetStatus)
			router.POST("/statuses", controller.CreateStatus)
			router.PATCH("/statuses", controller.UpdateStatus)
			router.DELETE("/status/:id", controller.DeleteStatus)

			// สถานะ
			router.GET("/tracks", controller.ListTracks)
			router.GET("/tracks/:id", controller.GetTrack)
			router.POST("/tracks", controller.CreateTrack)
			router.PATCH("/tracks", controller.UpdateTrack)
			router.DELETE("/track/:id", controller.DeleteTrack)

			// ตารางหลัก ข้อมูลการรักษา ************************************************************
			//r.GET("/treatments", controller.ListTreatment)
			// r.GET("/treatmentstatus", controller.ListTreatment)
			// //r.GET("/treatments/:id", controller.GetTreatment)
			// //r.POST("/treatments", controller.CreateTreatment)
			// //r.PATCH("/treatments", controller.UpdateTreatment)
			// //r.DELETE("/treatment/:id", controller.DeleteTreatment)
			// r.GET("/treatments/ready", controller.ListReady_Treat)
			// r.GET("/treatments/readyyy", controller.ListReady_Dispense)
			// r.GET("/treatments/readyapp", controller.ListReady_Appoint)
			router.GET("/treatments", controller.ListTreatment)
			router.GET("/treatmentss/:id", controller.GetTreatment)
			router.POST("/treatments", controller.CreateTreatment)
			router.PATCH("/treatmentsUpdate", controller.UpdateTreatment) ////++
			router.DELETE("/treatment/:id", controller.DeleteTreatment)
			router.GET("/treatments/ready", controller.ListReady_Treat)
			router.GET("/treatments/readyyy", controller.ListReady_Dispense)
			router.GET("/treatments/readyapp", controller.ListReady_Appoint)
			router.GET("/treatmentstatus", controller.ListTreatment)

			//Aern

			// Drug Routes
			router.GET("/drugs", controller.ListDrugs)
			router.GET("/drug/:id", controller.GetDrug)
			router.POST("/drugs", controller.CreateDrug)
			router.PATCH("/drugs", controller.UpdateDrug)
			router.DELETE("/drugs/:id", controller.DeleteDrug)

			// Practice Routes
			router.GET("/practices", controller.ListPractices)
			router.GET("/practice/:id", controller.GetPractice)
			router.POST("/practice", controller.CreatePractice)
			router.PATCH("/practice", controller.UpdatePractice)
			router.DELETE("/practice/:id", controller.DeletePractice)

			// Dispense Routes
			router.GET("/dispenses", controller.ListDispenses)
			router.GET("/dispense/:id", controller.GetDispense)
			router.POST("/dispense", controller.CreateDispense)
			router.PATCH("/DispenseUpdate", controller.UpdateDispense)
			router.DELETE("/dispense/:id", controller.DeleteDispense)

			//Aern2
			// Departments Routes 6
			router.GET("/departments", controller.ListDepartments)
			router.GET("/department/:id", controller.GetDepartment)
			router.POST("/department", controller.CreateDepartment)
			router.PATCH("/department", controller.UpdateDepartment)
			router.DELETE("/department/:id", controller.DeleteDepartment)

			// Levelcure Routes 7
			router.GET("/levelcures", controller.ListLevelcures)
			router.GET("/levelcure/:id", controller.GetLevelcure)
			router.POST("/levelcure", controller.CreateLevelcure)
			router.PATCH("/levelcure", controller.UpdateLevelcure)
			router.DELETE("/levelcure/:id", controller.DeleteLevelcure)

			// Appoint Routes 9
			router.GET("/appoints", controller.ListAppoints)
			router.GET("/appoint/:id", controller.GetAppoint)
			router.POST("/appoint", controller.CreateAppoint)
			router.PATCH("/AppointUpdate", controller.UpdateAppoint)
			router.DELETE("/appoint/:id", controller.DeleteAppoint)

			//LEO
			// Medical Equipment Employee Routes
			router.GET("/medemployees", controller.ListMedEmployees)
			router.GET("/medemployees/:id", controller.GetMedEmployee)
			router.POST("/medemployees/create", controller.CreateMedEmployee)
			router.PATCH("/medemployees", controller.UpdateMedEmployee)
			router.DELETE("/medemployees/:id", controller.DeleteMedEmployee)

			// Brand Routes
			router.GET("/brands", controller.ListBrands)
			router.GET("/brands/:id", controller.GetBrand)
			router.POST("/brands", controller.CreateBrand)
			router.PATCH("/brands", controller.UpdateBrand)
			router.DELETE("/brands/:id", controller.DeleteBrand)

			// Status Routes
			router.GET("/medstatuses", controller.ListMedStatuses)
			router.GET("/medstatuses/:id", controller.GetMedStatus)
			router.POST("/medstatuses", controller.CreateMedStatus)
			router.PATCH("/medstatuses", controller.UpdateMedStatus)
			router.DELETE("/medstatuses/:id", controller.DeleteMedStatus)

			// med equipment Routes
			router.GET("/medicalequipments", controller.ListMedEquipments)
			//router.POST("/medicalequipments", controller.CreateloginMedEquipment)
			router.GET("/medicalequipment/:id", controller.GetMedEquipment)
			router.POST("/medicalequipments", controller.CreateMedEquipment)
			router.PATCH("/medicalequipmentsUpdate", controller.UpdateMedEquipment)
			router.DELETE("/medicalequipments/:id", controller.DeleteMedEquipment)

			//Gg
			router.GET("/locations", controller.ListLocations) ////---------------------
			router.GET("/locations/:id", controller.GetLocation)
			router.POST("/locations", controller.CreateLocation)
			router.PATCH("/locations", controller.UpdateLocation)
			router.DELETE("/location/:id", controller.DeleteLocation)

			router.GET("/requests", controller.ListRequest) ////------------------------
			router.GET("/requests/:id", controller.GetRequest)
			router.POST("/requests", controller.CreateRequest)
			router.PATCH("/requests", controller.UpdateRequest)
			router.DELETE("/request/:id", controller.DeleteRequest)

		}

	}
	// Signup Officer Route
	r.POST("/signup", controller.CreateOfficer)
	// login User Route
	r.POST("/login", controller.Login)
	// // student login
	r.POST("/login_s", controller.Login_Med_employee)
	// Run the server go run main.go
	r.POST("/login_screen", controller.Login_Screening_officer)

	r.POST("/login_Doctor", controller.Login_Doctor)

	r.Run()

}

func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")

		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PATCH , DELETE")

		if c.Request.Method == "OPTIONS" {

			c.AbortWithStatus(204)

			return
		}

		c.Next()
	}

}
