const express = require("express")
const app = express();
const path = require("path")
const {v4: uuid} = require("uuid")
const methodOverride = require("method-override")

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(methodOverride("_method"))

app.listen(3000, () => {
    console.log("we are listening on port 3000")
})

app.get("/", (req,res) => {
    console.log("got a hit")
    res.render("home")
})

//the array as our mock database
let arrOfComments = [
    {
        username: "Qasim",
        comment: "This is exciting",
        id: uuid()
    },
    {
        username: "Aasim",
        comment: "I'm in Itikaaf",
        id: uuid()
    },
    {
        username: "Ebrahim",
        comment: "Wanna play chess?",
        id: uuid()
    },
    {
        username: "Abdullah",
        comment: "Check out this plant",
        id: uuid()
    }
]


//Show All Comments
app.get("/comments/index", (req, res) => {
    res.render("comments/index", {arrOfComments})
})

//Create New Comment
app.post("/comments", (req, res) => {
    const {username, comment} = req.body;
    const id = uuid();
    arrOfComments.push({username, comment, id})
    res.redirect("comments/index")
})

//Get Form to Create New Comment
app.get("/comments/new", (req, res) => {
    res.render("comments/new")
})

//Show Specific Comment in Detail
app.get("/comments/:id", (req, res) => {
    const {id} = req.params;
    const requestedId = arrOfComments.find(x => x.id === id)
    res.render("comments/show", {requestedId})
})

//Show Form to Edit our Comment
app.get("/comments/:id/edit", (req, res) => {
    const {id} = req.params;
    const requestedId = arrOfComments.find(x => x.id === id);
    res.render("comments/edit", {requestedId})
})

//Edit Our Comment
app.patch("/comments/:id", (req, res) => {
    const {id} = req.params;
    const requestedId = arrOfComments.find(x => x.id === id)
    const {commentArea} = req.body;
    console.log(req.body.commentArea)
    requestedId.comment = commentArea;
    console.log(requestedId)
    res.redirect("index")
})

//Delete Specific Comment
app.delete("/comments/:id", (req,res) => {
    const id = req.params.id;
    const newFilteredArray = arrOfComments.filter(x => x.id !== id);
    arrOfComments = newFilteredArray;
    res.redirect("/comments/index")
})











app.get("/tacos", (req, res) => {
    res.send("Thank you for your get request")
})
app.post("/tacos", (req, res) => {
    const {flavor, qty} = req.body;
    res.send("Thank you for your post request" + ` You want ${qty} ${flavor} sandwiches`)
})