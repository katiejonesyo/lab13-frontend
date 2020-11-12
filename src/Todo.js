import React, { Component } from 'react'
import request from 'superagent';

export default class Todos extends Component {
    state = {
        todos: [],
        todoName:'',
        loading: false
    };
    
    componentDidMount = async () => {
        await this.fetchTodos()
    }

    fetchTodos = async () => {
        const { token } = this.props;

        await this.setState({ loading: true });
        const response = await request
        .get('https://warm-river-88711.herokuapp.com/api/todo')
        .set('Authorization', token)

        await this.setState({ todos: response.body, loading: false })
    }

    handleSubmit = async (e) => {
        const { todoName } = this.state;
        const { token } = this.props;

        e.preventDefault();

    
        this.setState({ loading: true });

        const newTodo = {
            todo: todoName
        };

        await request
        .post('https://warm-river-88711.herokuapp.com/api/todo')
        .send(newTodo)
        .set('Authorization', token)  ;

        await this.fetchTodos();
    }

    handleCompletedClick = async (someId) => {
        const { token } = this.props;

       
        await request
        .put(`https://warm-river-88711.herokuapp.com/api/todo/${someId}`)
        .set('Authorization', token)  ;

        await this.fetchTodos();
    }

    render() {
        const { 
            todoName,  
            loading,
            todos,
         } = this.state;

        return (
            <div>
                Your Todo List:
                <br/>
                
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Add a task:
                        <input 
                            value={todoName} 
                            onChange={(e) => this.setState({ todoName: e.target.value })}
                            type="text"
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
                            textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        
                        
                        Task {todo.todoName}
                        {
                            todo.completed ? '' 
                            : <button 
                                onClick={() => this.handleCompletedClick(todo.id)}>
                                Completed
                            </button>
                        }
                        </div>)
                }
            </div>
        )
    }
}