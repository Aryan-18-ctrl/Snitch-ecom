import { Outlet } from 'react-router'
import SellerNavbar from '../components/SellerNavbar'

const SellerLayout = () => {
  return (

    <div className='flex'>
<SellerNavbar/>
<div className='w-full'>
  
          <Outlet/>

</div>
    </div>
  )
}

export default SellerLayout