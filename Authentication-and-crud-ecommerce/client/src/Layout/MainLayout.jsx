import { Outlet } from 'react-router'
import UserNavbar from '../components/UserNavbar'

const MainLayout = () => {
  return (
    <div>

<UserNavbar/>
<div>
      <Outlet/>

</div>
    </div>
  )
}

export default MainLayout