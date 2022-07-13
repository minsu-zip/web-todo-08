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

  // hover 태크
  this.$hover = document.createElement('div')
  this.$hover.classList.add('hover')
  this.$element.appendChild(this.$hover)

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

  const hover = this.$hover

  function isBefore(element1, element2) {
    if (element2.parentNode === element1.parentNode) {
      for (let cur = element1.previousSibling; cur; cur = cur.previousSibling) {
        if (cur === element2) {
          return true
        }
      }
    }

    return false
  }

  let clicked = false
  let hoverLi = undefined
  let targetLi = undefined

  function mousemove(event) {
    if (!clicked || !hoverLi) return

    // pageX, pageY 는 모든 페이지 기반
    // clientX, clientY 는 현제 보이는 화면 기반
    const { pageX, pageY } = event

    // 잠시 현재 hover element를 가리고 현재 좌표의 element를 가져온다
    hover.hidden = true
    const elemBelow = document.elementFromPoint(pageX, pageY)
    const li = elemBelow.closest('.todo-card-wrapper')
    const ul = elemBelow.closest('.todo-card-container')
    hover.hidden = false

    hover.style.left = pageX - hover.offsetWidth / 2 + 'px'
    hover.style.top = pageY - hover.offsetHeight / 2 + 'px'

    if (!li) {
      if (ul) {
        const start = ul.querySelector('.start')
        console.log('start', start)
        const { top } = start.getBoundingClientRect()
        if (top > pageY) {
          start.parentNode.insertBefore(targetLi, start.nextSibling)
        } else {
          ul.appendChild(targetLi)
        }
      }

      return
    }

    if (isBefore(targetLi, li) && li.className !== 'start') {
      li.parentNode.insertBefore(targetLi, li)
    } else if (li.parentNode) {
      li.parentNode.insertBefore(targetLi, li.nextSibling)
    }
  }

  function mousedown(event) {
    if (event.button !== 0) {
      return
    }

    clicked = true
    let targetRemove = event.target.closest('.todo-card-wrapper')
    console.log(targetRemove)
    if (targetRemove === null || targetRemove.className === 'start') {
      return
    }

    targetLi = targetRemove
    hoverLi = targetRemove.cloneNode(true)
    targetLi.classList.add('temp')

    const { pageX, pageY } = event

    hover.appendChild(hoverLi)

    hover.style.left = pageX - hover.offsetWidth / 2 + 'px'
    hover.style.top = pageY - hover.offsetHeight / 2 + 'px'
  }

  function mouseup() {
    if (!clicked) {
      return
    }

    clicked = false
    if (targetLi) {
      targetLi.classList.remove('temp')
    }
    if (hoverLi) {
      hoverLi.remove()
    }
    hoverLi = undefined
    targetLi = undefined
  }

  function mouseleave() {
    if (!clicked) {
      return
    }
    mouseup()
  }

  this.$element.addEventListener('mousemove', mousemove)
  this.$element.addEventListener('mousedown', mousedown)
  this.$element.addEventListener('mouseup', mouseup)
  this.$element.addEventListener('mouseleave', mouseleave)
}
