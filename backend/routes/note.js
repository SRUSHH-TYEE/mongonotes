const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note")
const { body, validationResult } = require("express-validator");
const router = express.Router();

//ROUTE1: Fetch all notes using GET "/api/note/fetchAllNotes". Login Required.
router.get("/fetchAllNotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})

//ROUTE2: Add a new note using POST "/api/note/addNote" Login Required
router.post("/addnote", fetchuser, [
    body('title', "Minimum length of Title should be 3").isLength({ min: 3 }),
    body('description', "Minimum length of Description should be 5").isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, tag, description } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };
        const note = await new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

//ROUTE3: Update an existing note using PUT "/api/note/updateNote" Login Required

router.put('/updateNote/:id', fetchuser, async (req, res) => {
    //Find the note to update and update it
    try {
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("not found")
        }
        if (note.user.toString() !== req.user.id) {
            res.status(401).send("Not Allowed")
        }

        //create a new note object
        const { title, description, tag } = req.body;
        let newNote = {}
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    }
    catch (error) {
        res.status(500).send("Internal Server Error")
    }

})

//ROUTE4: Delete an existing note using DELETE "/api/note/deleteNote" Login Required

router.delete('/deleteNote/:id', fetchuser, async (req, res) => {
    try {
        //Find the note to delete and delete it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("not found")
        }

        //Check whether the user owns the note that he is trying to delete
        if (note.user.toString() !== req.user.id) {
            res.status(401).send("Not Allowed")
        }

        //delete the note
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted successfully!!", note: note })
    }
    catch (error) {
        res.status(500).send("Internal Server Error")
    }

})



module.exports = router