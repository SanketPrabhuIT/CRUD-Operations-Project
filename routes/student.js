const express = require('express')
const router = express.Router()
const Student = require('./models/student_schema')

router.get('/', async(req, res) =>{
    try{
        const student = await Student.find()
        res.json(student)
    }catch(err){
        res.send('Error ' + err)
    }
   
})


router.post('/', async(req, res) =>{
    const student = new Student({
        name: req.body.name,
        roll: req.body.roll,
        class: req.body.class
    })
    try{
        const s1 = await student.save()
        res.json(s1)
    }catch(err){
        res.send('Error')
    }
})

//display detail by roll no
router.get('/:roll', async(req, res) =>{
    try{
        const student = await Student.findOne({ roll: req.params.roll}).exec();
        res.json(student)
    }catch(err){
        res.send('Error ' + err)
    }
   
})

//update by roll
router.patch('/:roll', async(req, res) =>{
    try{
        const student = await Student.findOne({ roll: req.params.roll}).exec();
        student.class = req.body.class
        const s1= await student.save()
        res.json(s1)
    }catch(err){
        res.send('Error ' + err)
    }
})

//delete by roll
router.delete('/delete/:roll', async(req, res) =>{
    try{
        const student = await Student.findOne({ roll: req.params.roll}).exec();
       
        const s1= await student.deleteOne()
        res.json(s1)
    }catch(err){
        res.send('Error ' + err)
    }
})

//delete all
router.delete('/delete_all', async(req, res) =>{
    try{
        const { deletedCount } = await Student.deleteMany()
        res.json(deletedCount)
        
    }catch(err){
        res.send('Error ' + err)
    }
})

module.exports = router