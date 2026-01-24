import { Outlet } from 'react-router'
import PathshalaNavbar from '~/components/navbars/PathshalaNavbar'

const NormalLayout = () => {
  return (
    <main>
        <PathshalaNavbar />
        <Outlet />
    </main>
  )
}

export default NormalLayout