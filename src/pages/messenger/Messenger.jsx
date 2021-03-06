import React, { useEffect, useRef, useState } from 'react';
import './messenger.css';
import Topbar from '../../components/topbar/Topbar';
import Conversation from '../../components/conversations/Conversation';
import Message from '../../components/message/Message';
import {io} from 'socket.io-client'
import { useSelector } from 'react-redux';
import api from '../../apiService';

const Messenger = () => {
	const [conversations, setConversations] = useState([]);
	const [currentChat, setCurrentChat] = useState(null);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [arrivalMessage, setArrivalMessage] = useState(null);
	// const [onlineUsers, setOnlineUsers] = useState([]);
	const socket = useRef();
	const user = useSelector(state => state.auth.user)

	const scrollRef = useRef();
  
	useEffect(() => {
	  socket.current = io("ws://localhost:8900");
	  socket.current.on("getMessage", (data) => {
		setArrivalMessage({
		  sender: data.senderId,
		  text: data.text,
		  createdAt: Date.now(),
		});
	  });
	}, []);
  
	useEffect(() => {
	  arrivalMessage &&
		currentChat?.members.includes(arrivalMessage.sender) &&
		setMessages((prev) => [...prev, arrivalMessage]);
	}, [arrivalMessage, currentChat]);
  
	useEffect(() => {
	  socket.current.emit("addUser", user._id);
	
	}, [user]);
  
	useEffect(() => {
	  const getConversations = async () => {
		try {
		  const res = await api.get("/conversations/" + user._id);
		  setConversations(res.data);
		} catch (err) {
		  console.log(err);
		}
	  };
	  getConversations();
	}, [user._id]);
  
	console.log(conversations)

	useEffect(() => {
	  const getMessages = async () => {
		try {
		  const res = await api.get("/messages/" + currentChat?._id);
		  setMessages(res.data);
		} catch (err) {
		  console.log(err);
		}
	  };
	  getMessages();
	}, [currentChat]);
  
	const handleSubmit = async (e) => {
	  e.preventDefault();
	  const message = {
		sender: user._id,
		text: newMessage,
		conversationId: currentChat._id,
	  };
  
	  const receiverId = currentChat.members.find(
		(member) => member !== user._id
	  );
  
	  socket.current.emit("sendMessage", {
		senderId: user._id,
		receiverId,
		text: newMessage,
	  });
  
	  try {
		const res = await api.post("/messages", message);
		setMessages([...messages, res.data]);
		setNewMessage("");
	  } catch (err) {
		console.log(err);
	  }
	};
  
	useEffect(() => {
	  scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<div>
			<Topbar />
			<div className="messenger">
				<div className="chatMenu">
					<div className="chatMenuWrapper">
						<input placeholder="Search for friends" className="chatMenuInput" />
						{conversations.map((c) =><div onClick={() => setCurrentChat(c)}><Conversation conversation={c} currentUser={user} /></div> )}
					</div>
				</div>
				<div className="chatBox">
					<div className="chatBoxWrapper">
						{
							currentChat ? 	
							<> 
								<div className="chatBoxTop">
									{messages.map(m=>(
										<div key={m?._id}  ref={scrollRef}>
											<Message  message={m} own={m.sender === user._id}/>
										</div>
										
									))}
									
								</div>
								<div className="chatBoxBottom">
									<textarea className="chatMessageInput" placeholder="Write something..." onChange={(e)=>setNewMessage(e.target.value)} value={newMessage}/>
									<button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
								</div>
							</> : <span className="noConversationText">Open a Conversation to start a Chat.</span>
						}
						
					</div>
				</div>
				{/* <div className="chatOnline">
					<div className="chatOnlineWrapper">
						<ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat}/>
					</div>
				</div> */}
			</div>
		</div>
	);
};

export default Messenger;
