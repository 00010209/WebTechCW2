const express = require('express')
const router = express.Router()
const fs =require('fs')
const path = require('path')
const rootFolder = path.dirname(
    require.main.filename || process.require.main.filename
)
const DB = `${ rootFolder }/data/notes.json`

router.get('/', (req, res) =>{
    fs.readFile('./data/notes.json', (err, data) => {
        if (err) throw err 

        const notes = JSON.parse(data)

        res.render('notes', {notes: notes})

    })
})

router.get('/:id', (req,res) =>{
    const id = req.params.id 

    fs.readFile('./data/notes.json', (err, data) => {
        if (err) throw err 

        const notes = JSON.parse(data)

        const note = notes.filter(note => note.id == id)[0]

        res.render('detail', { note: note})
    })
})

router.get('/:id/delete', (req,res) => {
    const id = req.params.id

    fs.readFile('./data/notes.json', (err, data) => {
        if(err) throw err

        const notes = JSON.parse(data)
        const filteredNotes = notes.filter(note => note.id != id)

        fs.writeFile('./data/notes.json', JSON.stringify(filteredNotes), (err) =>{
            if (err) throw err

            res.render('notes', { notes: filteredNotes, deleted: true })
        })
    })
})

module.exports = router