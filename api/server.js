const express = require('express');

let app = express();

let users = [
{
    id : 1,
    name : 'kalyan'
},
{
    id : 2,
    name : 'someone'
},
{
    id : 3,
    name : 'chinni'
},
{
    id : 4,
    name : 'kd'
},
{
    id : 5,
    name : 'kn'
},
]

app.listen(3120, ()=>{
    console.log('working properly at localhost')
})

app.get('/', (req, res)=>{
    res.json({
        message : 'search with / at the end of user at URL'
    })
})

app.get('/users/', (req, res)=>{
    res.json({
        check : true,
        users

    })
})

app.get('/users/:username', (req, res)=>{

    let checkingid = req.params.username

    let filteringUser = users.filter((f)=>f.name == checkingid);

    if(filteringUser.length == 0){
        res.json({
            check : false,
            message : 'User Not Found In Data'
        })
    }
    else{
        res.json({
            check : true,
            filteringUser
        })
    }
})