import TodoColumn from './Column'
import ConfirmModal from '../ConfirmModal'

const todoColumnData = [
  { status: 'todo', label: '해야할 일' },
  { status: 'inprogress', label: '하고있는 일' },
  { status: 'done', label: '완료할 일' },
]

export default function TodoContainer({ $target }) {
  this.$element = document.createElement('main')
  this.$element.classList.add('todo-container')
  $target.appendChild(this.$element)

  this.state = {
    todos: [],
  }

  this.setState = (nextState) => {
    this.state = nextState
    this.getTodoByStatus().forEach((todos, i) => {
      const { status, label } = todoColumnData[i]
      todoColumns[i].setState({ status, title: label, todos })
    })
  }

  this.getTodoByStatus = () => {
    return this.state.todos.reduce(
      (acc, curr) => {
        acc[todoColumnData.findIndex((v) => v.status === curr.status)].push(
          curr
        )
        return acc
      },
      [[], [], []]
    )
  }

  this.removeTodo = (id) => {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id),
    })
  }

  this.addTodo = (todo) => {
    this.setState({
      todos: [todo, ...this.state.todos],
    })
  }

  this.updateTodo = (todo) => {
    const { id } = todo
    const { todos } = this.state
    const todoIndex = todos.findIndex((v) => v.id === id)
    if (todoIndex === -1) return

    const newTodos = [
      ...todos.slice(0, todoIndex),
      todo,
      ...todos.slice(todoIndex + 1),
    ]
    this.setState({
      todos: newTodos,
    })
  }

  const todoColumns = this.getTodoByStatus().map((todos, i) => {
    const { status, label } = todoColumnData[i]
    return new TodoColumn({
      $target: this.$element,
      initialState: { status, title: label, todos },
      addTodo: this.addTodo,
      updateTodo: this.updateTodo,
    })
  })

  const confirmModal = new ConfirmModal({
    $target: this.$element,
    initialState: {},
  })

  this.init = () => {
    // data fetch
    this.setState({
      todos: [
        {
          id: 1,
          status: 'todo',
          title: '컴포넌트 구현',
          description: '화면에 필요한 컴포넌트들을 생성합니다.',
        },
        {
          id: 2,
          status: 'todo',
          title: 'API 구현',
          description: '웹 어플리케이션에 필요한 API를 구현합니다.',
        },
        {
          id: 3,
          status: 'inprogress',
          title: '컴포넌트 구조 설계',
          description: '컴포넌트 구조를 설계합니다.',
        },
        {
          id: 4,
          status: 'done',
          title: '기본 스타일 추가',
          description: '기본 스타일 파일을 추가합니다.',
        },
      ],
    })
  }

  this.init()

  this.openRemoveConfirmModal = (id) => {
    confirmModal.setState({
      message: '선택한 카드를 삭제할까요?',
      submitText: '삭제',
      onSubmit: () => {
        // 삭제 요청
        this.removeTodo(id)
        confirmModal.close()
      },
    })
    confirmModal.open()
  }

  this.$element.addEventListener('click', (e) => {
    const $todoCardRemoveBtn = e.target.closest('.todo-card-removeBtn')
    if ($todoCardRemoveBtn) {
      const { todoId } = $todoCardRemoveBtn.dataset
      this.openRemoveConfirmModal(+todoId)
      return
    }
  })
}
