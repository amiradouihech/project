import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import JeuxA from '../jeuxA/jeuxA'
import MathGame from '../jeuxCalcule';
import Pre from '../pronisation';
import SignIn from '../auth/signln';
import SignUp from '../auth/signUp';
import AuthDetails from '../AuthDetails';
function Rout() {
  return (
    <div>
      <Router>
        <Routes>
            <Route path="/jeuxMot" element={<JeuxA/>}/>
            <Route path="/jCP" element={<MathGame/>}/>
            <Route path="/mot" element={<Pre/>}/>
            <Route path="/signIn" element={<SignIn/>}/>
            <Route path="/signUp" element={<SignUp/>}/>
            <Route path="/AuthD" element={<AuthDetails/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default Rout
