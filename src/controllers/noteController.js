const noteModel = require('../models/noteModel');

const createNote = async (req,res)=>{
    const {title,description} = req.body;
    const note = noteModel({
        title: title,
        description:description,
        userId: req.userId,
    });

    try {
        await note.save();
        res.status(201).json(note);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'something went wrong '});
        
    }

};
const updateNote = async (req,res)=>{
    const id = req.params.id;

    const {title,description} = req.body;
    const updateNote = {
        title:title,
        description:description,
        userId:req.userId
    }
    try {
        await noteModel.findByIdAndUpdate(id,updateNote,{new:true});
        res.status(200).json(updateNote);
        }
    catch (error) {
        console.log(error);
        res.status(500).json({message:'something went wrong'});
    }
};
const deleteNote = async (req,res)=>{
    const id = req.params.id;
    
    try {
        const note = await noteModel.findByIdAndRemove(id);
        res.status(200).json(note);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'something went wrong'});
        
    }
};
const getNote = async (req,res)=>{
    try {
        const note = await noteModel.find({userId:req.userId});
        res.status(200).json(note);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'something wrong'});
    }
    



};

module.exports = {createNote,
                updateNote,
                deleteNote,
                getNote,
}