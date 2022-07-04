import React from 'react';
import { Redirect } from 'react-router-dom';
// https://dev.to/projectescape/programmatic-navigation-in-react-3p1l
import Loading from './Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      disableButton: true,
      userAPIReturn: false,
      loading: false,
    };
  }

  handleValidationButton = () => {
    const { name } = this.state;
    const MIN_CHARS = 3;
    if (name.length >= MIN_CHARS) {
      this.setState({
        disableButton: false,
      });
    } else {
      this.setState({
        disableButton: true,
      });
    }
  }

  handleChangeInput = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    }, () => this.handleValidationButton());
  }

  handleLoading = () => {
    this.setState((prevState) => ({ loading: !prevState.loading }));
  }

  handleClickButton = async () => {
    this.handleLoading();
    const { name } = this.state;
    const userAPIReturn = await createUser({ name });
    this.setState({ userAPIReturn }, () => this.handleLoading());
  }

  render() {
    const { disableButton, userAPIReturn, loading } = this.state;
    const botao = (
      <button
        disabled={ disableButton }
        onClick={ this.handleClickButton }
        data-testid="login-submit-button"
        type="submit"
      >
        Entrar

      </button>);
    const input = (
      <label htmlFor="name">

        <input
          onChange={ this.handleChangeInput }
          data-testid="login-name-input"
          name="name"
          type="text"
          id="name"
        />
      </label>);
    return (
      <div data-testid="page-login">
        { !loading && input}
        { !loading && botao }
        { userAPIReturn === 'OK' && <Redirect to="/search" />}
        { loading && <Loading />}
      </div>
    );
  }
}
export default Login;
