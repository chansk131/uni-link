import { createNavigationReducer } from 'react-navigation-redux-helpers'
import { DrawerNavigator } from '../../navigation'

const NavReducer = createNavigationReducer(DrawerNavigator)

export default NavReducer
