import TodoCardContent from './CardContent'
import TodoCardForm from './CardForm'

export default function TodoCard({ $target, initialState, todoAction }) {
  this.$element = document.createElement('div')
  this.$element.classList.add('todo-card-wrapper')

  this.state = initialState
  if (this.state.index === 1) {
    $target.querySelector('.todo-form').after(this.$element)
  } else $target.appendChild(this.$element)

  this.setState = (nextState) => {
    this.state = nextState
    const { index, todo, submitButtonText } = this.state
    this.$element.dataset.name = `${this.state.todo.status}-${index}`
    todoCardContent.setState({
      todo,
    })
    todoCardForm.setState({
      index,
      todo,
      submitButtonText,
    })
  }

  const { index, todo, submitButtonText } = this.state
  this.$element.dataset.name = `${this.state.todo.status}-${index}`

  const todoCardContent = new TodoCardContent({
    $target: this.$element,
    initialState: {
      todo,
    },
  })

  const todoCardForm = new TodoCardForm({
    $target: this.$element,
    initialState: {
      index,
      todo,
      submitButtonText,
    },
    todoAction,
  })
}
