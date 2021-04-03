const express = require('express')
const app = express()

const fs = require('fs')



app.set('view engine', 'pug')

app.use('/static', express.static('public'))

app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/create', (req, res) => {
    res.render('create')
})

app.post('/create', (req, res) => {
    const title = req.body.title
    const author = req.body.author
    const description = req.body.description
    
    if (title.trim() === '' && author.trim() === '' && description.trim() === ''){
        res.render('create', { error: true })
    } else {
        fs.readFile('./data/notes.json', (err, data) => {
            if (err) throw err 

            const notes = JSON.parse(data)

            notes.push({
                id: id (),
                title: title,
                author: author,
                description: description
            })


            fs.writeFile('./data/notes.json', JSON.stringify(notes), err => {
                if (err) throw err 

                res.render('create', { success: true} )
            })
        })
    }

})

const notes = ['Some Title', 'Some Title 2']

app.get('/notes', (req, res) =>{
    res.render('notes', {notes: notes})
})

app.get('/notes/detail', (req,res) =>{
    res.render('detail')
})

app.listen(8000, err => {
    if (err) console.log(err)

    console.log('Server is running on port 8000')
})


function id () {
    return '_' + Math.random().toString(36).substr(2, 9);
  };