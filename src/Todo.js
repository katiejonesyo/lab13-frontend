import React, { Component } from 'react'
import request from 'superagent';

export default class Todos extends Component {
    state = {
        todos: [],
        loading: false
    };
    
    componentDidMount = async () => {
        await this.fetchTodos()
    }

    fetchTodos = async () => {
        const { token } = this.props;

        await this.setState({ loading: true });
        const response = await request.get('https://warm-river-88711.herokuapp.com/api/todo')
        .set('Authorization', token)

        await this.setState({ todos: response.body, loading: false })
    }

    handleSubmit = async (e) => {
        const { todos, completed } = this.state;
        const { token } = this.props;

        e.preventDefault();

        const newTodo = {
            completed: completed,
            todos: todos
        };

                await this.setState({ loading: true });

        await request.post('https://warm-river-88711.herokuapp.com/api/todo')
        .send(newTodo)
        .set('Authorization', token)  ;

        await this.fetchTodos();
    }

    handleWaterClick = async (someId) => {
        const { token } = this.props;

       
        await request.put(`https://warm-river-88711.herokuapp.com/api/todo${someId}`)
        .set('Authorization', token)  ;

        await this.fetchTodos();
    }

    render() {
        const { 
            completed,  
            loading,
            todos,
         } = this.state;

        return (
            <div>
                Welcome To Your Todos!
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Add a todo:
                        <input 
                            value={todos} 
                            onChange={(e) => this.setState({ todos: e.target.value })}
                        />
                    </label>
                    <label>
                        Derp
                        <input 
                            
                            value={completed} 
                            onChange={(e) => this.setState({ completed: e.target.value })}
                        />
                    </label>
                        <button>
                            Add todo
                        </button>
                      

                </form>
                {
                    loading 
                        ? 'loadingggggg' 
                        : todos.map(todo => <div key={`${todo.todo}${todo.id}${Math.random()}`} style={{ 
                            textDecoration: todo.completed ? 'line-through' : 'none' }
                        }>
                        name: {todo.todo}
                        {
                            todo.completed ? '' : <button 
                            // if you're ever onClicking inside of a map, you might need to make an anonymous function like this:
                                onClick={() => this.handleCompletedClick(todo.id)}>
                                Complete
                            </button>
                        }
                        </div>)
                }
            </div>
        )
    }
}