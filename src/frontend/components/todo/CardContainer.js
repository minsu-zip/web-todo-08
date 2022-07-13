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

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.submitTodoCreateForm = (todo) => {
    //  post 요청하고 서버에서 데이터 받기
    addTodo(todo)
  }

  this.submitTodoEditForm = (todo) => {
    //  patch 요청하고 서버에서 데이터 받기
    updateTodo(todo)
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
    submitForm: this.submitTodoCreateForm,
  })

  this.render = () => {
    this.$element
      .querySelectorAll('.todo-card-wrapper')
      .forEach(($el) => $el.remove())
    this.$element
      .querySelectorAll('.todo-form:not(:first-child)')
      .forEach(($el) => $el.remove())

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
          submitButtonText: '등록',
        },
        submitForm: this.submitTodoEditForm,
      })
    })
  }

  this.render()
}
