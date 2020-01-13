import React, { Component } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import {getAxiosConfig} from '../shared/axios'
import { API_ROOT } from '../appConfig'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class ClientSearch extends Component {
  state = {
    clients: [],
    loading: false,
    client: ''
  }

  getClients (event) {
    if (event.target.value !== "") {
      this.setState({ loading: true })
      axios.get(API_ROOT + 'clients/?search=' + event.target.value, getAxiosConfig())
        .then(response => {
          this.setState({
            clients: response.data.results,
            loading: false
          })
        })
        .catch(error => {
          console.log(error)
      })
    }
  }

  editClient (event, value) {
    this.setState({
      client: value
    })
  }

  render () {
    let redirect = null
    if (this.state.client) {
      const url = "/clients/edit?client=" + this.state.client
      this.setState({
        client: ''
      })
      redirect = <Redirect to={url} />
    }
    const { clients, loading } = this.state

    return (
      <div>
        <Autocomplete
          options = {clients.map(client => client.last_name + ' ' + client.first_name)}
          freeSolo
          loading = {loading}
          loadingText = "Αναζήτηση..."
          disableClearable
          value={this.state.client}
          onChange = {(event, value) => this.editClient(event, value)}
          renderInput = {params => (
            <TextField {...params}
              id="standard-basic"
              label = "Αναζήτηση Πελάτη"
              onChange = {(event) => this.getClients(event)} />
          )}/>
          {redirect}
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  }
}

export default connect(mapStateToProps, null)(ClientSearch)