package main

import (
	"github.com/sut65/team08/entity"

	"github.com/sut65/team08/controller/Screening_officer"

	//"github.com/B6332907/SE-G08/middlewares"

	"github.com/gin-gonic/gin"
)

func main() {

	entity.SetupDatabase()
	r := gin.Default()
	//r.Use(CORSMiddleware())

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
			r.POST("/Education", controller.CreateEducation)
			r.PATCH("/Education", controller.UpdateEducation)
			r.DELETE("/Education/:id", controller.DeleteEducation)
			// Run the server
		}

	}
	// Signup User Route
	//r.POST("/signup", controller.CreatePrefix)
	// login User Route
	//r.POST("/login", controller.Login)

	// Run the server go run main.go
	r.Run()

}

// func CORSMiddleware() gin.HandlerFunc {

// 	return func(c *gin.Context) {

// 		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

// 		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

// 		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")

// 		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

// 		if c.Request.Method == "OPTIONS" {

// 			c.AbortWithStatus(204)

// 			return
// 		}

// 		c.Next()
// 	}

// }
