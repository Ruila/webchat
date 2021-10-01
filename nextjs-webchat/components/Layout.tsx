
import { NextComponentType } from 'next'
import PersonIcon from '@mui/icons-material/Person';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { FriendsList } from "./FriendsList"
import { ChatContainer } from "./ChatContainer"

export const Layout: NextComponentType = () => {
    return (
        <div className="flex justify-center items-center w-full h-full py-8">
            <div className="w-[800px] h-[600px] bg-gray-800 flex">
                <div className="h-full bg-gray-900 w-[80px] flex flex-col items-center">
                    <PersonIcon className="my-8" sx={{ color: "#fff" }} />
                    <ChatBubbleIcon sx={{ color: "#fff" }} />
                </div>
                <div className="w-[250px]">
                    <FriendsList />
                </div>
                <div className="flex-1">
                    <ChatContainer />
                </div>
            </div>
        </div>
    )
}