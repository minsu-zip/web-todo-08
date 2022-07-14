import TodoColumnHeader from './ColumnHeader.js'
import TodoCardContainer from './CardContainer.js'

export default function TodoColumn({
  $target,
  initialState,
  addTodo,
  updateTodo,
}) {
  this.$element = document.createElement('section')
  this.$element.classList.add('todo-column')
  $target.appendChild(this.$element)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    const { status, title, todos } = this.state
    columnHeader.setState({
      status,
      title,
      todoCnt: todos.length,
    })
    todoCardContainer.setState({
      status,
      todos,
    })
  }

  const { status, title, todos } = this.state

  const columnHeader = new TodoColumnHeader({
    $target: this.$element,
    initialState: {
      status,
      title,
      todoCnt: todos.length,
    },
  })
  const todoCardContainer = new TodoCardContainer({
    $target: this.$element,
    initialState: {
      status,
      todos,
    },
    addTodo,
    updateTodo,
  })
}
