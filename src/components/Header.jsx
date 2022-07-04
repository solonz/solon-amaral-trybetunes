import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import Nav from './Nav';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.userName();
  }

  handleLoading = () => {
    this.setState((prevState) => ({ loading: !prevState.loading }));
  }

  userName = async () => {
    this.handleLoading();
    const { name } = await getUser();
    this.setState({ name }, this.handleLoading());
  }

  render() {
    const { name, loading } = this.state;
    const userWelcome = (
      <h4 data-testid="header-user-name">
        Olá
        {' '}
        {name}
      </h4>
    );
    return (
      <>
        <header data-testid="header-component" className="userData">
          { !loading && userWelcome}
          <Nav />
        </header>
        { loading && <Loading />}
      </>
    );
  }
}

export default Header;
