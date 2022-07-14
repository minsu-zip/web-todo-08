import TodoCardContent from './CardContent'
import TodoCardForm from './CardForm'

export default function TodoCard({ $target, initialState, todoAction }) {
  this.$element = document.createElement('div')
  this.$element.classList.add('todo-card-wrapper')
  $target.appendChild(this.$element)

  this.state = initialState

  this.render = () => {
    const { index, todo, submitButtonText } = this.state
    this.$element.dataset.name = `${this.state.todo.status}-${index}`
    this.$element.innerHTML = ''
    new TodoCardContent({
      $target: this.$element,
      initialState: {
        todo,
      },
    })
    new TodoCardForm({
      $target: this.$element,
      initialState: {
        index,
        todo,
        submitButtonText,
      },
      todoAction,
    })
  }

  this.render()
}
