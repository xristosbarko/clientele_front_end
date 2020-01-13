import React, { Component } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './store/actions/index'

import Layout from './Layout'

import Auth from './Auth/Auth'
import Logout from './Auth/Logout'

import Clients from './Clients'
import ClientCreate from './Clients/Create'
import ClientEdit from './Clients/Edit'

import Tasks from './Tasks'
import TaskCreate from './Tasks/Create'
import TaskEdit from './Tasks/Edit'

import TasksDTY from './TasksDTY'
import TaskDTYCreate from './TasksDTY/Create'
import TaskDTYEdit from './TasksDTY/Edit'

import TechReports from './TechReports'
import TechReportCreate from './TechReports/Create'
import TechReportEdit from './TechReports/Edit'

import Devices from './Devices'
import DeviceCreate from './Devices/Create'
import DeviceEdit from './Devices/Edit'

import Techs from './Techs'
import TechCreate from './Techs/Create'
import TechEdit from './Techs/Edit'

import Departments from './Departments'
import DepartmentCreate from './Departments/Create'
import DepartmentEdit from './Departments/Edit'

import Events from './Events'
import EventCreate from './Events/Create'
import EventEdit from './Events/Edit'

import Container from '@material-ui/core/Container'

import Message from './shared/Message'


class App extends Component {
    componentDidMount () {
        this.props.authCheckState()
    }

    render () {
        let routes = (
            <Switch>
                <Route path="/" exact component={Auth} />

            </Switch>
                            // <Redirect to="/" />
        )
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/clients/create" component={ClientCreate} />
                    <Route path="/clients/edit" component={ClientEdit} />
                    <Route path="/clients" component={Clients} />

                    <Route path="/tasks/create" component={TaskCreate} />
                    <Route path="/tasks/edit" component={TaskEdit} />
                    <Route path="/tasks" component={Tasks} />

                    <Route path="/tasksDTY/create" component={TaskDTYCreate} />
                    <Route path="/tasksDTY/edit" component={TaskDTYEdit} />
                    <Route path="/tasksDTY" component={TasksDTY} />

                    <Route path="/techReports/create" component={TechReportCreate} />
                    <Route path="/techReports/edit" component={TechReportEdit} />
                    <Route path="/techReports" component={TechReports} />

                    <Route path="/devices/create" component={DeviceCreate} />
                    <Route path="/devices/edit" component={DeviceEdit} />
                    <Route path="/devices" component={Devices} />

                    <Route path="/techs/create" component={TechCreate} />
                    <Route path="/techs/edit" component={TechEdit} />
                    <Route path="/techs" component={Techs} />

                    <Route path="/departments/create" component={DepartmentCreate} />
                    <Route path="/departments/edit" component={DepartmentEdit} />
                    <Route path="/departments" component={Departments} />

                    <Route path="/events/create" component={EventCreate} />
                    <Route path="/events/edit" component={EventEdit} />
                    <Route path="/events" component={Events} />

                    <Route path="/logout" component={Logout} />

                    <Route path="/" exact component={Events} />
                    <Redirect to="/" />
                </Switch>
            )
        }
        
    return (
        <div>
            <Layout>
                <Container maxWidth="md">
                    {routes}
                    <Message />
                </Container>
            </Layout>
        </div>
    )
    }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authCheckState: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
