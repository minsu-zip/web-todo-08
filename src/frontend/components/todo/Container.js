import TodoColumn from './Column'

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
      todoColumns[i].setState({ title: todoColumnData[i].label, todos })
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

  const todoColumns = this.getTodoByStatus().map((todos, i) => {
    const { status, label } = todoColumnData[i]
    return new TodoColumn({
      $target: this.$element,
      initialState: { status, title: label, todos },
    })
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
}
