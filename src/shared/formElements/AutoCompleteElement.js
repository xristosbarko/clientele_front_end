import React, { Component } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import { API_ROOT } from '../../appConfig'
import {getAxiosConfig} from '../axios'

class AutoCompleteElement extends Component {
  state = {
    options: [],
    loading: false
  }

  getData (event) {
    if (event.target.value !== "") {
      this.setState({ loading: true })
      let app = this.props.app
      if (app === 'tasksDTY') {
        app = 'tasksDTY/taskDTYInputElementSearch'
      }
      axios.get(API_ROOT + app + '/?search=' + event.target.value, getAxiosConfig())
        .then(response => {
          this.setState({
            options: response.data.results,
            loading: false
          })
        })
        .catch(error => {
          console.log(error)
      })
    }
    this.props.changed(event)
  }

  renderOption = (option) => {
    let updatedOption = null
    if (this.props.app === 'clients' || this.props.app === 'techs' ) {
        updatedOption = option.last_name + ' ' + option.first_name
    } else if (this.props.app === 'tasksDTY') {
      updatedOption = option.code_number
    } else if (this.props.app === 'departments') {
      updatedOption = option.name
    } else {
      updatedOption = "autocomplete render option not available."
    }
    return updatedOption
  }

  onChangeHandler (event, value) {
    if (this.props.taskDTYChanged) {
      this.state.options.forEach((option, index) => {
        if (option.code_number === value) {
          this.props.taskDTYChanged(this.state.options[index])
        }
      })
    }
    this.props.changed({target: {value: value}})
  }

  render () {
    const { options, loading } = this.state

    return (
      <div style={{padding: '5px'}}>
        <Autocomplete
          options = {options.map(option => this.renderOption(option))}
          freeSolo
          loading = {loading}
          loadingText = "Αναζήτηση..."
          disableClearable
          value={this.props.value}
          onChange = {(event, value) => this.onChangeHandler(event, value)}
          renderInput = {params => (
            <TextField {...params}
              id="standard-basic"
              {...this.props.elementConfig}
              value={this.props.value}
              onChange={(event) => this.getData(event)}
            />
          )} />
        </div>
    )
  }

}

export default AutoCompleteElement