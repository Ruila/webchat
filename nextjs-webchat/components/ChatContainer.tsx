
import { NextComponentType } from 'next'
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button'; 
import { ChatUnit } from "./ChatUnit"
import { mockMessageList } from "../mockData/mockMessageList"

const useStyles = makeStyles (theme => ({
    textField: {
        width: "100%"
    },
    multilineColor: {
        color: "#fff"
    }
}))

export const ChatContainer: NextComponentType = () => {
    const classes = useStyles()

    const renderMessage = mockMessageList.map((item, index)=><ChatUnit key={index} type={item.type} message={item.message} />)

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-1 w-full border-gray-300 border-[1px] overflow-scroll border-solid">
                 {renderMessage}
            </div>
            <TextField
                fullWidth
                style={{textAlign: 'left'}}
                multiline
                rows={5}
                className="border-[1px] border-white border-solid"
                InputProps={{
                    className: classes.multilineColor,
                    endAdornment: <Button variant="contained">submit</Button>
                  }}
            />
        </div>
    )
}