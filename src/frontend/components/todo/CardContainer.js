import TodoCard from './Card.js'
import TodoCardForm from './CardForm.js'

export default function TodoCardContainer({ $target, initialState, addTodo }) {
  this.$element = document.createElement('div')
  this.$element.classList.add('todo-card-container')
  $target.appendChild(this.$element)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  new TodoCardForm({
    $target: this.$element,
    initialState: {
      status: this.state.status,
      submitButtonText: '등록',
    },
    addTodo,
  })

  this.render = () => {
    this.$element
      .querySelectorAll('.todo-card-wrapper')
      .forEach(($el) => $el.remove())
    this.state.todos.forEach(
      (todo) => new TodoCard({ $target: this.$element, initialState: { todo } })
    )
  }

  this.render()
}
