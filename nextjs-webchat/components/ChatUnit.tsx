import React, { FunctionComponent } from 'react'
import PersonIcon from '@mui/icons-material/Person';

type ChatUnitProps = {
    type: string,
    message: string
}

export const ChatUnit: FunctionComponent<ChatUnitProps> = ({type, message}) => {

    const renderUnit = () => {
        if(type === "friend") {
            return (  
                <div className="flex my-2 mx-2">
                    <div className="p-2 bg-gray-600 mr-2 rounded-full">
                        <PersonIcon sx={{ color: "#fff" }} />
                    </div>
                    <div className="text-white flex-1 p-2 bg-gray-600">{message}</div>
                </div>
            )
        } else {
            return (  
                <div className="flex my-4 mx-2">
                    <div className="text-white flex-1 p-2 bg-gray-600">{message}</div>
                    <div className="p-2 bg-gray-600 ml-2 rounded-full">
                        <PersonIcon sx={{ color: "#fff" }} />
                    </div>
                </div>
            )
        }
    }
    return (
       <div>
           {renderUnit()}
       </div>
    )
}