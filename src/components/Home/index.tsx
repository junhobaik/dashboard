import React, { Component } from 'react';
import { Query } from 'react-apollo';

import { USER_DATA } from '../../queries';
import './index.scss';

interface iProps {}
interface iStates {
  googleId: String;
}

class Home extends Component<iProps, iStates> {
  _isMounted = false;

  constructor(props: any) {
    super(props);

    this.state = {
      googleId: ''
    };
  }

  componentDidMount() {
    this._isMounted = true;

    fetch('/api/account')
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.user && this._isMounted) {
          this.setState({
            googleId: json.user.id
          });
        }
      })
      .catch(err => {
        if (this._isMounted) {
          this.setState({
            googleId: ''
          });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { googleId } = this.state;

    return (
      <Query query={USER_DATA} variables={{ googleId }}>
        {({ loading, data, error }: any) => {
          let userRender: any;

          if (loading) userRender = <span>loding...</span>;
          if (error) userRender = <span>error</span>;

          if (!data.user) {
            userRender = <span>가입이 필요합니다.</span>;
          }

          return (
            <div id="Home">
              Home
              <br />
              {userRender}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Home;
