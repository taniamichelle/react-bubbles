import React from "react";
import axios from 'axios';

class Login extends React.Component {
  state = {
    credentials: {
      username: '',
      password: ''
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    axios
      // make a post request to retrieve a token from the api
      .post(`http://localhost:5000/api/login`, this.state.credentials)
      .then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.payload);
        // when you have handled the token, navigate to the BubblePage route
        this.history.push('/BubblePage');
      })
      .catch(err => err.response);
  };

  render() {
    return (
      <>
        <h1>Welcome to the Bubble App!</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='username'
            placeholder='username'
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input
            type='text'
            name='password'
            placeholder='password'
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button type='submit'>Login</button>
        </form>
      </>
    );
  }
};

export default Login;
