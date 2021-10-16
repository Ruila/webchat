import React, { FunctionComponent } from 'react'
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button'; 
import { ChatUnit } from "./ChatUnit"
import { mockMessageList } from "../mockData/mockMessageList"
import { useEffect, useState, useRef } from 'react';
import { MessageListType } from "../types/MessageListType"
import { useAsyncFn } from 'react-use';
import webSocket from 'socket.io-client'

const useStyles = makeStyles (theme => ({
    textField: {
        width: "100%"
    },
    multilineColor: {
        color: "#fff"
    }
}))

export const ChatContainer: FunctionComponent = () => {
    const classes = useStyles()
    const refChatBox = useRef<HTMLDivElement>(null);
    const [message, setMessage] = useState<string>("")
    const [messageList, setMessageList] = useState<Array<MessageListType>>(mockMessageList)

    const [ws,setWs] = useState(null)

    useEffect(() => {
        setWs(webSocket('http://localhost:8080', {
            withCredentials: true,
        }))
    }, [])

    useEffect(() => {
        if(ws){
            console.log('success connect in client!')
            onChangeWebSocket()
        }
    },[ws])

    const onChangeWebSocket = () => {
        console.info("i got it")
        ws.on('getMessage', message => {
            console.log("from message", message)
            setMessageList(arr => [...arr, {
                type: "me",
                message: message
            }])
        })
    }
    const [msgList, doGetMsgList] = useAsyncFn(async () => {
        const response = await fetch("http://localhost:3000/api/msg-list/123");
        const result = await response.text();
        return result
    }, []);

    const [sendMessage, doSendMessage] = useAsyncFn(async () => {
        const response = await fetch("http://localhost:3000/api/msg-list/123", {
            method: "POST",
            body: JSON.stringify({
                message:'sending',
                type: "me"
              })
        });
        const result = await response.text();
        return result
    }, []);

    const handleTypeing = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    const submit = () => {
        doSendMessage().catch()
        if(!!message) {
            ws.emit('getMessage', message)
            setMessageList(arr => [...arr, {
                type: "me",
                message: message
            }])
        }
    }

    const scrollToBottom = () => {
        if (refChatBox.current) {
            refChatBox.current.scrollTo(0, refChatBox.current.scrollHeight)
          }
    }

    useEffect(()=>{
        doGetMsgList().catch()
    }, [])

    useEffect(()=>{
        scrollToBottom()
    }, [message, messageList])

    return (
        <div className="w-full h-full flex flex-col">
            <div ref={refChatBox} className="flex-1 w-full border-gray-300 border-[1px] overflow-scroll border-solid">
                 {messageList.map((item, index)=>(<ChatUnit key={index} type={item.type} message={item.message} />))}
            </div>
            <TextField
                fullWidth
                style={{textAlign: 'left'}}
                multiline
                rows={5}
                value = {message}
                onChange = {handleTypeing}
                className="border-[1px] border-white border-solid"
                InputProps={{
                    className: classes.multilineColor,
                    endAdornment: <Button variant="contained" onClick={submit}>submit</Button>
                  }}
            />
        </div>
    )
}