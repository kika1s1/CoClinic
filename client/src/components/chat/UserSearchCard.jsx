/* eslint-disable react/prop-types */
import Avatar from './Avatar'
import { Link } from 'react-router-dom'

const UserSearchCard = ({user, onClose}) => {
  return (
    <Link to={`/livechat/${user?._id}`} onClick={onClose} className='flex items-center gap-3 p-2 lg:p-4 border border-transparent border-b-slate-200 hover:border hover:border-primary rounded cursor-pointer'>
        <div>
            <Avatar
                width={50}
                height={50}
                name={user?.username}
                userId={user?._id}
                imageUrl={user?.avatar}
                
            />
        </div>
        <div>
            <div className='font-semibold text-ellipsis line-clamp-1'>
                {user?.isDoctor? "Dr. "+ user?.username : "Pa "+ user?.username}
            </div>
            <div className='text-sm text-ellipsis line-clamp-1'>{user?.email}</div>
        </div>
    </Link>
  )
}

export default UserSearchCard
