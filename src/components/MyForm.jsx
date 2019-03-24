import React, { Component } from 'react';
export class MyForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onHandleFirstName(event.target.value)
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input
                  placeholder="Placeholder"
                  id="first_name"
                  type="text"
                  className="validate"
                  onChange={this.handleChange}
                  value={this.props.firstName}
                />
                <label htmlFor="first_name">First Name</label>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    )
  }
}