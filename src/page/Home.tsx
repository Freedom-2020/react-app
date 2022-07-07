import {Switch, Route } from 'react-router-dom';
import './Home.css'
import Header from '../page/Header'
import Navbar from '../page/Navbar'
import Agent from '../page/Agent'
import Help from '../page/Help'
import Login from '../page/Login'
import Register from '../page/Register'
import Timecard from '../page/Timecard'
import FormEdit from '../page/Form/FormEdit'

function Home() {
    return (
        <div className="home-container">
            <Header />
            <section className="flex main-box">
                <aside className="aside-box">
                    <Navbar/>
                    <div className="history-box">
                        History
                        <ul>
                            <li className="history-li">
                                <i className="point-li"></i>
                                bjstdmngbgr02/Acceptance_test
                            </li>
                            <li className="history-li">
                                <i className="point-li"></i>
                                bjstdmngbgr03/Acceptance_test
                            </li>
                        </ul>
                    </div>
                </aside>
                <div className="route-container">
                    <Switch>
                        <Route path="/agent" component={Agent} />
                        <Route path="/help" component={Help} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/timecard" component={Timecard} />
                        <Route path="/formEdit" component={FormEdit} />
                    </Switch>
                </div>
            </section>
        </div>
    )
}

export default Home