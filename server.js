const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
const PORT = 4000;
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'task'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
  })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/',(request, response)=>{
    db.collection('tasks').find().sort({likes: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addTask', (request, response) => {
    db.collection('tasks').insertOne({task: request.body.task, likes: 0})
    .then(result => {
        console.log('Task Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('tasks').updateOne({task: request.body.task1, likes: request.body.likes1},{
        $set: {
            likes:request.body.likes1 + 30
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Added One Like')
        response.json('Like Added')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteTask', (request, response) => {
    db.collection('tasks').deleteOne({task: request.body.task1})
    .then(result => {
        console.log('Task Deleted')
        response.json('Task Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, () => {console.log(`Server running on port ${PORT}`)});
