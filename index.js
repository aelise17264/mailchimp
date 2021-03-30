const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")

const app = express()
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(req, res){
    res.sendFile(__dirname + '/signup.html')
})

app.get('/styles.css', function(req, res){
    res.sendFile(__dirname + "/" + "styles.css")
})

app.post('/', function(req, res){
    var fName = req.body.fName
    var lName = req.body.lName
    var email = req.body.email

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]

    };

    var jsonData = JSON.stringify(data)
    
    const url = "https://us1.api.mailchimp.com/3.0/lists/632d88cfd9"

    const options = {
        method: "POST",
        auth: "aelise17264:1d0dad1280d4037ccfd9d282458e3818-us1"
    }

    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data))
        })
    })
    
    request.write(jsonData)
    request.end()
})

app.listen(3000, function(){
    console.log("Server running on port 3000")
})


// api key API key: 1d0dad1280d4037ccfd9d282458e3818-us1
// unique list id 632d88cfd9
