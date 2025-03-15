import { Provider } from 'react-redux'
import RootNavigation from './app/navigation/RootNavigation'
import { store } from './app/redux/store'
import 'react-notifications/lib/notifications.css'

function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <RootNavigation />
      </Provider>

    </div>
  )
}

export default App
