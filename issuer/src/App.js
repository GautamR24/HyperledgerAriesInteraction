
import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Schema from './components/Schema';
import Definition from './components/Definition';
import CreateInvitation from './components/CreateInvitation';
import ReceiveInvitation from './components/ReceiveInvitation';
import IssueCredential from './components/IssueCredential';

function App() {
  return (
    <>
    <Router>
      <Navbar/>
        <Routes>
            <Route exact path="/schema" element={<Schema/>}/>
            <Route exact path="/definition" element={<Definition/>}/>
            <Route exact path="/createInvitation" element={<CreateInvitation/>}/>
            <Route exact path="/receiveInvitation" element={<ReceiveInvitation/>}/>
            <Route exact path="/issueCredential" element={<IssueCredential/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
