import TodoColumnHeader from './ColumnHeader.js'
import TodoCardContainer from './CardContainer.js'

export default function TodoColumn({ $target, initialState }) {
  this.$element = document.createElement('section')
  this.$element.classList.add('todo-column')
  $target.appendChild(this.$element)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    columnHeader.setState({
      title: this.state.title,
      todoCnt: this.state.todos.length,
    })
    todoCardContainer.setState({ todos: this.state.todos })
  }

  const columnHeader = new TodoColumnHeader({
    $target: this.$element,
    initialState: {
      status: this.state.status,
      title: this.state.title,
      todoCnt: this.state.todos.length,
    },
  })
  const todoCardContainer = new TodoCardContainer({
    $target: this.$element,
    initialState: {
      todos: this.state.todos,
    },
  })
}
