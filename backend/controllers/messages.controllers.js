import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getRecieverSocketId, io } from "../socket/socket.js";

export const sendMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { _id: senderId } = req.user;
    const { message } = req.body;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    conversation.messages.push(newMessage._id);

    await newMessage.save();
    await conversation.save();

    const receiverSocketId = getRecieverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json({ newMessage });
  } catch (error) {
    console.log("error in sendMessages controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChat } = req.params;
    const user = req.user;
    const conversation = await Conversation.findOne({
      participants: { $all: [user._id, userToChat] },
    }).populate("messages");
    if (!conversation) {
      return res.status(200).json([]);
    }
    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("error in getMessages controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
