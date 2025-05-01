import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore';

function ChatContainer() {
  const {messages,getMessages,isMessagesLoading,selectedUser} = useChatStore();

  useEffect(() =>{
    getMessages(selectedUser._id)
  },[selectedUser._id, getMessages]);

  if(isMessagesLoading){
    return(
        <div>
            Loading...
        </div>
    )
  };

  

  return (
    <div>
        
    </div>
  )
}

export default ChatContainer