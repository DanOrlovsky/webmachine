/**
 * @description
 * Member Registration page/process.
 * 
 * Process consists of two (or more?) steps:
 * 1. Network selection - User selects from array 
 *    of available discoverable networks to join.
 * 2. Member form - Member specific information
 *    is gathered through a form.
 * 3. When moving, either to or from, one step to
 *    another, the data gathered in the state of each
 *    child component is lifted to the state of the 
 *    highest order component; this one.
 * 
 * Successful submission of the data gathered in this
 * process creates and inserts a Member document within
 * the Members collections of the respective Client(s)
 * who manage the selected Network(s).
 */

import React, { Component }       from 'react';
import NetworkSelection           from './components/Steps/NetworkSelection';
import MemberForm                 from './components/Steps/MemberForm';

class MemberRegistration extends Component {

  /**
   * @property {String} location - identifier of current page OR step
   *  in the member registration process
   */
  constructor(props) {
    super(props);
    this.state = {
      // Defaults to step1 of the registration process.
      location: 'networks-to-join',
      networks_to_join: [],
      member_form: {}
    };

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleNetworkSelectionChange = this.handleNetworkSelectionChange.bind(this);
    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.registerMember = this.registerMember.bind(this);
  }

  handlePageChange(location) {
    this.setState({ location });
  }

  handleNetworkSelectionChange() {}

  handleFormInputChange() {}

  // Renders component based on page location
  renderPage() {
    let { location } = this.state;

    if (location === 'networks-to-join') {
      return <NetworkSelection handleChange={} />
    } else if (location === 'member-form') {
      return <MemberForm handleChange={} />
    } else {
      // If, for whatever reason, the value of location is wiped out
      // from state, render the first step of the registration process.
      return <NetworkSelection handleChange={} />
    }
  }

  // Passed to the component handling last step of the process.
  // Triggered when 'Complete Registration' button is clicked.
  // Performs a few things:
  // 1. Checks that load from each step IS NOT empty (@method)
  //  1.1 If one or more is empty, it DOESN'T submit
  //  1.2 If none are empty, it moves on.
  // 2. Makes request to member registration route in backend,
  //    effectively passing ALL information necessary to register
  //    a new member.
  // 3. Waits for response and notifies user of outcome.
  registerMember() {
    // gets called when both loads are valid and ready to go.
    console.log(this.state, 'submitting now!');
  }

  render() {
    return (
      <div className="container">
        {this.renderPage()}
      </div>
    )
  }
}

export default MemberRegistration;

// loadIsOkToSubmit(load) {
//   // if it's not an array, then it's a plain object
//   console.log(load)
//   if (Array.isArray(load)) {
//     if(load.length === 0) {
//       // alert('Please select at least one network to join');
//       return false;
//     }
//   } else {
//     let loadValues;
//     // Address 2 is optional; if it's empty, delete it
//     if (load.address2 === '') delete load.address2;
//     // Capture value of each key in an array
//     let x = Object.values(load);
    
//     // Safety net in case somehow all keys get deleted.
//     // Shouldn't happen (look at initial state of MemberForm)
//     // but just in case
//     if (x.length > 0)
//       loadValues = x
//     else {
//       // alert('Please fill out all fields in the form')
//       return false
//     }

//     for (let i = 0; i < loadValues.length; i++) {
//       if (loadValues[i] === '') {
//         // alert('Please fill out all fields in the form');
//         return false;
//       }
//     }
//   }

//   return true;
// }