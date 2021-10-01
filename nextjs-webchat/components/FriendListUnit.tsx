import { NextComponentType } from 'next'
import PersonIcon from '@mui/icons-material/Person';

export const FriendsListUnit: NextComponentType = () => {
    return (
        <div className="flex p-2 bg-gray-700">
            <div className="flex flex-col justify-center mr-4">
                <PersonIcon sx={{ color: "#fff" }} />
            </div>
            <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between">
                    <div className="text-white">Name</div>
                    <div className="text-white">下午10:43</div>
                </div>
                <div className="text-xs text-white">對話訊息</div>
            </div>
        </div>
    )
}