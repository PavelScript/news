const express = require("express");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));


app.get("/", function(req,res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req,res) {
    const email = req.body.email;
    const name = req.body.name;
    const lastname = req.body.lastname;
  
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: name,
                    LNAME: lastname 
                }            }
        ]
    }

    const jsonData = JSON.stringify(data);
   
    const url = "https://us16.api.mailchimp.com/3.0/lists/07ff2fb804"
    const options = {
        method: "POST",
        auth: "Pavel1:6495a38a533b4a33c099898ff9dc14b7-us16"

    }
    const httpsrequest = https.request(url, options, function (response) {
        
        if (response.statusCode == 200) {
        
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    })

    httpsrequest.write(jsonData);
    httpsrequest.end();
    
});

app.post("/failure", function(req,res) {
    res.redirect("/");
})


app.listen(80, function() {
    console.log("Server is running on port 3000");
});

//6495a38a533b4a33c099898ff9dc14b7-us16
//07ff2fb804  