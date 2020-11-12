import React, { Component } from 'react'
import request from 'superagent';

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        loading: false,
        err: null
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        
        this.setState({ loading:true })

        try {
        const user = await request
            .post('https://warm-river-88711.herokuapp.com/auth/signin')
            .send(this.state); // we can send state because the keys are the same on the front and back end

        this.setState({ loading: false })
        
        this.props.changeTokenAndUsername(user.body.email, user.body.token);
        
        this.props.history.push('/todos');
        } catch(err){
            this.setState({ err: 'Oops! Must have proper email to sign in.'})
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Log in</h2>
                    Username or Email:
                    <label>
                        {this.state.err && <div>
                            {this.state.err}
                             </div>}
                        <input 
                        onChange={(e) => this.setState({ email: e.target.value })}
                        value={this.state.email} />
                    </label>
                    <label>
                        Password:
                        <input 
                        onChange={(e) => this.setState({ password: e.target.value })}
                        value={this.state.password} type="password"/>
                    </label>
                    {
                        this.state.loading 
                        ? 'Loading'
                        : <button>
                            Log in!
                        </button>
                    }
                </form>
            </div>
        )
    }
}