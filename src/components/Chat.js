import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/appSlice';
import ChatInput from './ChatInput';

import { db } from '../firebase';
import {  useDocument } from "react-firebase-hooks/firestore";
import Message from './Message';
function Chat() {
    const chatRef = useRef(null);
    const roomId = useSelector(selectRoomId);
    const [roomMessages, setRoomMessages] =useState([]);
    
    const [roomDetails] = useDocument(
        roomId && db.collection("rooms").doc(roomId)
    );
    useEffect(()=> {
        if(roomId){
           

        db.collection('rooms').doc(roomId)
        .collection('messages')
        .orderBy('timestamp','asc')
        .onSnapshot((snapshot) => (
            setRoomMessages(snapshot.docs.map(
                (doc) => doc.data()
            ))
                
            
        ))
    }},[roomId]) 
    useEffect(()=>{
        chatRef?.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest'
           
          });

    },[roomId,roomMessages])
    return (
        <ChatContainer>
            {roomDetails && roomMessages && (
                <>
            <Header>
            <HeaderLeft>
            <h4>
            <strong>
            # {roomDetails?.data().name}
            </strong>
            </h4>
            <StarBorderOutlinedIcon/>
            </HeaderLeft>
            <HeaderRight>
            <p>
            <InfoOutlinedIcon/> Details
            </p>
            </HeaderRight>
            </Header>
            <ChatMessages >
            {roomMessages.map(({message, timestamp, user, userImage}) => (
                <Message
                    message={message}
                    timestamp={timestamp}
                    user={user}
                    userImage={userImage}
                    />
            ))}
            <ChatBottom ref={chatRef}/>
            </ChatMessages>

            <ChatInput 
            chatRef={chatRef}
            channelName={roomDetails?.data().name}
            channelId={roomId}
            
            />
            </>
            )}
            
        </ChatContainer>
    )
}

export default Chat

const ChatContainer = styled.div`
    flex : 0.7;
    flex-grow: 1;
    overflow-y: scroll;
    scrollbar-width: none;

`;
const ChatBottom=styled.div`
    padding-bottom: 100px;
`;
const Header=styled.div`
display: flex;
justify-content: space-between;
padding: 20px;
border-bottom:1px solid lightgray;
`;
const HeaderLeft=styled.div`
display: flex;
align-items: center;

>h4{
    display:flex;
    text-transform:lowercase;
    margin-right:10px;
}
>h4 > .MuiSvgIcon-root{
    margin-left:10px;
    font-size:18px;
}

`;
const HeaderRight=styled.div`
 align-items: center;
>p{
    display:flex;
    align-items:center;
    font-size: 14px;
}

>p >.MuiSvgIcon-root{
    margin-right: 5px !important;
    font-size:16px;
    
}
`;
const ChatMessages=styled.div``;