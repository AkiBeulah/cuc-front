import React, { useState } from "react"
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom"
import Header from './component/header.component'
import Logout from './component/logout'
import Auth from './pages/auth'
import Dashboard from './pages/dashboard'
import Home from './pages/home'

import { BrowserView } from 'react-device-detect'

export default function App() {
  const [activeItem, setActiveItem] = useState(localStorage.getItem("activeItem") === null ? "announcements" : localStorage.getItem("activeItem"))
  const [isSideOpen, setIsSideOpen] = useState(false)
  const [settingsModal, setSettingsModal] = useState(false)
  const [student, setStudent] = useState(JSON.parse(localStorage.getItem(process.env.REACT_APP_USER)))

  return (
    <>
      <div className="housing" >
        <Router basename={"/"}>
          {document.location.href.match(/register|login|signin|signup/) ? <></> :
            <Header
              student={student}
              activeItem={activeItem} setActiveItem={(num) => setActiveItem(num)}
              isSideOpen={isSideOpen} setIsSideOpen={(bool) => setIsSideOpen(bool)}
              settingsModal={settingsModal} setSettingsModal={(bool) => setSettingsModal(bool)}
            />
          }
          <BrowserView>
            <div onClick={() => setIsSideOpen(false)} id="overlay" className={isSideOpen ? "overlay overlay-active" : "overlay"} />
          </BrowserView>
          <Switch>
            <Route exact path={["/", "/home"]} render={() => <Home />} />
            <Route exact path={["/signin", "/login", "/register", "/signup"]} render={() => <Auth />} />
            <Route exact path={["/student", "/student/:location"]} render={() => <Dashboard
              student={student}
              activeItem={activeItem}
              settingsModal={settingsModal} setSettingsModal={(bool) => setSettingsModal(bool)}
            />} />
            <Route exact path={["/lecturer", "/lecturer/:location"]} render={() => <Dashboard activeItem={activeItem} />} />
            <Route exact path={["/logout"]} render={() => <Logout setStudent={setStudent} />} />
          </Switch>
        </Router>
      </div>
    </>
  );
}

