package main

import (
	"github.com/sut65/team08/controller"

	"github.com/sut65/team08/entity"

	//"github.com/B6332907/SE-G08/middlewares"

	"github.com/gin-gonic/gin"
)

func main() {

	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())

	//router := r.Group("/")

	{
		//router.Use(middlewares.Authorizes())
		{
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

			//Patiend
			r.GET("/Patiends", controller.ListPatiend)
			r.GET("/Patiend/:id", controller.GetPatiend)
			r.POST("/Patiend", controller.CreatePatiend)
			r.PATCH("/Patiend", controller.UpdatePatiend)
			r.DELETE("/Patiend/:id", controller.DeletePatiend)

			//Policing
			r.GET("/Policings", controller.ListPolicing)
			r.GET("/Policing/:id", controller.GetPolicing)
			r.POST("/Policing", controller.CreatePolicing)
			r.PATCH("/Policing", controller.UpdatePolicing)
			r.DELETE("/Policing/:id", controller.DeletePolicing)
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

			//AddressThailand
			r.GET("/AddressThailands", controller.ListAddressThailand)
			r.GET("/AddressThailand/:id", controller.GetAddressThailand)
			r.GET("/ZipAddressThailand/:id", controller.GetZipAddressThailand)
			r.POST("/AddressThailand", controller.CreateAddressThailand)
			r.PATCH("/AddressThailand", controller.UpdateAddressThailand)
			r.DELETE("/AddressThailand/:id", controller.DeleteAddressThailand)
		}

	}
	// Signup User Route
	//r.POST("/signup", controller.CreatePrefix)
	// login User Route
	//r.POST("/login", controller.Login)

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
