const express = require('express');

const app = express();

app.use(express.json());
const userData = [
    {id:1, name:"aman", email:"sikarwaraman@gamil.com", password:'123456789',city:"delhi", phoneno:"12345567678"}
]
//MiddleWare

app.get('/', (req,res) =>{
    console.log('welcome');
    res.status(200).json({
        success : true,
        message: "welcome"
    })
})

//Register user
app.post('/api/user', async (req,res) =>{
    const {name,email,password, city,phoneno} = req.body;
      const user = {
          id: userData.length +1,
          name: name,
            email:email,
            password:password,
            city:city,
            phoneno:phoneno
      }
       await userData.push(user);
      res.status(200).json({
          userData
      })
})


app.get('/api/user', (req,res) =>{
  
    res.status(200).json({
        success : true,
        userData
    })
})

app.delete('/api/user/:id', (req,res) =>{
     const user = userData.find(d => d.id === parseInt(req.params.id))
     if(!user) res.status(404).send('user not found')

     //delete
     const index = userData.indexOf(user);
     userData.splice(index,1);

     res.send(userData)
})

app.put('/api/user/:id', (req,res) =>{
    const user = userData.find(d => d.id === parseInt(req.params.id))
    if(!user) res.status(404).send('user not found')

    const {name,email,password, city,phoneno} = req.body;

    if(name){
        user.name = name;
    }
    if(email){
        user.email = email;
    }
    if(password){
        user.password = password;
    }
    if(city){
        user.city = city;
    }
    if(phoneno){
        user.phoneno = phoneno;
    }

    userData.push(user);

    

    res.send(user)
})




//server Start
app.listen(
    4000,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port 4000`)
  );