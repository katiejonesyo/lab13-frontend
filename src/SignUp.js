import React, { Component } from 'react'
import request from 'superagent';

export default class Signup extends Component {
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
            .post('https://warm-river-88711.herokuapp.com/auth/signup')
            .send(this.state); // we can send state because the keys are the same on the front and back end

        this.setState({ loading: false })
        
        this.props.changeTokenAndUsername(user.body.email, user.body.token);

        this.props.history.push('/todos');
        }  catch(err){
            this.setState({ err: 'oops!'})
        }
    }
    
    render() {
        return (
            <div>
                <h2>Sign up</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                    {this.state.err && <div>
                            {this.state.err}
                             </div>}
                        Email:
                        <input 
                        value={this.state.email}
                        type="email" required
                        onChange={(e) => this.setState({ email: e.target.value })}
                         />
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
                            Sign up!
                        </button>
                    }
                </form>
            </div>
        )
    }
}