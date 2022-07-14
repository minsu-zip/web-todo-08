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
    const prevTodos = this.state.todos
    const prevTodoIds = prevTodos.map((todo) => todo.id)
    this.state = nextState
    const nextTodos = this.state.todos
    const nextTodoIds = nextTodos.map((todo) => todo.id)

    if (JSON.stringify(prevTodos) === JSON.stringify(nextTodos)) return

    // 삭제
    let removedIndex = -1
    const removedTodoIds = prevTodoIds.filter((id, index) => {
      if (nextTodoIds.includes(id)) return false
      if (removedIndex === -1) removedIndex = index
      return true
    })
    if (removedTodoIds.length) {
      //0 아니면 1
      for (let t = 0; t < removedTodoIds.length; t++) {
        todoCards[removedIndex].$element.remove()
      }
      todoCards.splice(removedIndex, removedTodoIds.length)
    }

    //추가
    const addedTodoIds = nextTodoIds.filter((id) => !prevTodoIds.includes(id))

    if (addedTodoIds.length) {
      const addedTodos = this.state.todos.slice(0, addedTodoIds.length)
      for (let index = addedTodos.length - 1; index >= 0; index--) {
        const todo = addedTodos[index]
        todoCards.unshift(
          new TodoCard({
            $target: this.$element,
            initialState: {
              index: index + 1,
              todo,
              submitButtonText: '수정',
            },
            todoAction: updateTodo,
          })
        )
      }
    }

    todoCards.forEach((todoCard, index) => {
      const todo = this.state.todos[index]
      todoCard.setState({
        index: index + 1,
        todo,
        submitButtonText: '수정',
      })
    })
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

  const todoCards = this.state.todos.map((todo, index) => {
    new TodoCard({
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
