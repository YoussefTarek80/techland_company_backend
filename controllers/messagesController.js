const messageModel = require('../models/messagesModel');
// messageModel.sync({ alter: true })
const getAllMessages = async (req, res) => {
    try {
        const messages = await messageModel.findAll();
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const addMessage = async (req, res) => {
    try {
        const message = await messageModel.create(req.body);
        res.json(message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
const deleteMessage= async(req,res)=>{
    try{
        const{id}=req.params;
        const message=await messageModel.findByPk(id);
        if(!message){
            return res.status(404).json({message:"Message not found"});
        }
        await message.destroy();
        res.status(200).json({message:"Message deleted successfully"});
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    getAllMessages,
    addMessage,deleteMessage
};