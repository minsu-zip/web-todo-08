import TodoCard from './Card.js'
import TodoCardForm from './CardForm.js'

export default function TodoCardContainer({
  $target,
  initialState,
  addTodo,
  updateTodo,
}) {
  this.$element = document.createElement('div')
  this.$element.classList.add('todo-card-container')
  $target.appendChild(this.$element)

  this.$startLine = document.createElement('div')
  this.$startLine.classList.add('startLine')
  this.$element.appendChild(this.$startLine)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  new TodoCardForm({
    $target: this.$element,
    initialState: {
      index: 0,
      todo: {
        status: this.state.status,
        title: '',
        description: '',
      },
      submitButtonText: '등록',
    },
    todoAction: addTodo,
  })

  this.render = () => {
    this.$element
      .querySelectorAll('.todo-card-wrapper')
      .forEach(($el) => $el.remove())
    Array.from([this.$element.querySelectorAll('.todo-form')])
      .slice(1)
      .forEach(($el) => {
        $el.remove()
      })

    this.state.todos.forEach((todo, index) => {
      new TodoCard({
        $target: this.$element,
        initialState: { todo, index: index + 1 },
      })
      new TodoCardForm({
        $target: this.$element,
        initialState: {
          index: index + 1,
          todo,
          submitButtonText: '수정',
        },
        todoAction: updateTodo,
      })
    })
  }

  this.render()
}
