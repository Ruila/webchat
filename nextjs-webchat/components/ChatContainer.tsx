import React, { FunctionComponent } from 'react'
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button'; 
import { ChatUnit } from "./ChatUnit"
import { mockMessageList } from "../mockData/mockMessageList"
import { useEffect, useState } from 'react';
import { MessageListType } from "../types/MessageListType"

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
    const [message, setMessage] = useState<string>("")
    const [messageList, setMessageList] = useState<Array<MessageListType>>(mockMessageList)

    const handleTypeing = (e) => {
        setMessage(e.target.value)
    }

    const submit = () => {
        if(!message) {
            setMessageList(arr => [...arr, {
                type: "me",
                message: message
            }])
        }
    }

    useEffect(()=>{
        console.info("change", messageList)
    }, [messageList])

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-1 w-full border-gray-300 border-[1px] overflow-scroll border-solid">
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