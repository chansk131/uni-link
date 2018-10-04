import { connect } from 'react-redux'
import { reduxifyNavigator } from 'react-navigation-redux-helpers'
import { DrawerNavigator } from './navigation'

var NavigationWithState = reduxifyNavigator(DrawerNavigator, 'root')

const mapStateToProps = state => ({
  state: state.navigation
})

NavigationWithState = connect(mapStateToProps)(NavigationWithState)
export { NavigationWithState }
