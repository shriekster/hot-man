import React from 'react';


class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <form>
        <label>
          Utilizator:
          <input type="text" name="user" />
        </label>
        <label>
          Parola:
          <input type="password" name="pass" />
        </label>
      </form>
    );
  }
}

export default CreateAccount;
