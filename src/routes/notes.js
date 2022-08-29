const express = require("express");
const { getNote, createNote, deleteNote, updateNote } = require("../controls/noteController");
const auth = require("../middleware/auth");
const notesRoute = express.Router();

notesRoute.get("/",auth, getNote);

notesRoute.post("/",auth,createNote);

notesRoute.delete("/:noteid",auth,deleteNote);
notesRoute.put("/:noteid",auth,updateNote);

module.exports = notesRoute;