const express = require('express')

const cors = require("cors")
const { FieldValue } = require('firebase-admin/firestore')
const app = express()
app.use(express.json());
const PORT =  5000;
const { db } = require('./firebase.js')






app.use(cors());






// Post the data to the firebase 

app.post('/api/products/post', async (req, res) => {
    const peopleRef = db.collection('project2024').doc("generalData")
    const doc = await peopleRef.set(
        
{
       
     
       
        "data4" :
        {
            "id": "3",
            "title": "Dell XPS 13",
            "image": "https://m.media-amazon.com/images/I/61rU-DBp+6L._AC_SL1280_.jpg",
            "cpu": "Intel Core i7, 8th generation",
            "ram": "16GB",
            "storage": "512 GB SSD",
            "screen": "13.3-inch, Full HD",
            "price": "1199",
            "description": "The Dell XPS 13 is an absolutely brilliant laptop. The 2018 version rocks an 8th-generation Intel Core i5 or i7 processor and a bezel-less ‘Infinity Edge’ display, this Dell XPS 13 continues to be the most popular Windows laptop in the world. What’s more, there’s a wide range of customization options, so you can really make the Dell XPS 13 the best laptop for your needs. "
        },
       
    }, { merge: true }
        


    );
   
  return  res.status(200).send("successful")
})



// Get all the data from the firebase database
app.get('/api/getproducts', async (req, res, next) => {
   
    let value = {};
   const peopleRef = db.collection('project2024');
   const snapshot = await peopleRef.get();
 //  res.status(200).json(snapshot)
  
   snapshot.forEach(doc => {
   // console.log(doc.id, '=>', doc.data());
    //  res.status(200).json("good")

    value = doc.data()

  });
  console.log(value);
/* if (snapshot) {
    console.log(snapshot);
    snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
             const value = doc.data();
             console.log(value);
            return  res.json("Good");
           
      
      });
   } 
   else {
    return res.status(404).send("Bad")
   }

*/
 

  

})

app.get( "/api/getalllaptop" , async(req, res) => {
  
    const peopleRef = db.collection('project2024').doc("generalData")
    const doc = await peopleRef.get()
 
    if (!doc.exists) {
        console.log('No such document!');
      } else {
       
        res.status(200).json(doc.data())
      }
  
});

app.get( "/api/macs" , async(req, res) => {
  
    const peopleRef = db.collection('project2024').doc("macs")
    const doc = await peopleRef.get()
 
    if (!doc.exists) {
        console.log('No such document!');
      } else {
       
        res.status(200).json(doc.data())
      }
  
});


app.get( "/api/individualData/:id" , async(req, res) => {
    const {id} = req.params;
  
    const peopleRef = db.collection('project2024').where('state', '==', 'CA')
    const snapshot = await peopleRef.where("id" , "==" , id)
  
 console.log(snapshot);
  
});
/*
app.get('/api/categories', async (req, res) => {
    const peopleRef = db.collection('project2024').doc('JWnNMn8PUdzvbAl00wGw')
    const doc = await peopleRef.get()
    if (!doc.exists) {
        return res.sendStatus(400)
    }

    res.status(200).json(doc.data())
})
*/



app.listen(PORT, () => console.log(`Server has started on port: ${PORT}`))