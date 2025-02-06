import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'
import { ToastContainer } from 'react-tiny-toast'

import { useAppSelector } from './app/hooks'
import { selectCurrentUsername } from './features/auth/authSlice'

import { Header } from '@/components'
import {
  LoginView,
  PostsView,
  PostView,
  PostEditView,
  UsersView,
  UserView,
  NotificationsView
} from '@/views'


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const username = useAppSelector(selectCurrentUsername)

  if (!username) {
    return <Navigate to="/" replace />
  }

  return children
}


function App() {
  return (
    <Router>
      <Header />
      
      <Routes>
        <Route
          path="/"
          element={ <LoginView /> }
        />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route
                  path="/posts"
                  element={ <PostsView /> }
                />

                <Route
                  path="/posts/:postId"
                  element={ <PostView /> }
                />

                <Route
                  path="/editPost/:postId"
                  element={ <PostEditView /> }
                />

                <Route
                  path="/users"
                  element={ <UsersView /> }
                />

                <Route
                  path="/users/:userId"
                  element={ <UserView /> }
                />

                <Route
                  path="/notifications"
                  element={ <NotificationsView /> }
                />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer />
    </Router>
  )
}

export default App
