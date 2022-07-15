import TodoColumn from './Column'
import ConfirmModal from '../ConfirmModal'

import TodoAPI from '../../api/todo'

const todoColumnData = [
  { status: 'todo', label: '해야할 일' },
  { status: 'inprogress', label: '하고있는 일' },
  { status: 'done', label: '완료한 일' },
]

export default function TodoContainer({ $target }) {
  this.$element = document.createElement('main')
  this.$element.classList.add('todo-container')
  $target.appendChild(this.$element)

  this.$dragPoint = document.createElement('div')
  this.$dragPoint.classList.add('drag-point')
  this.$element.appendChild(this.$dragPoint)

  this.state = {
    todosByStatus: [[], [], []],
  }

  this.setState = (nextState) => {
    this.state = nextState
    this.state.todosByStatus.forEach((todos, i) => {
      const { status, label } = todoColumnData[i]
      todoColumns[i].setState({ status, title: label, todos })
    })
  }

  this.removeTodo = (id) => {
    const newTodosByStatus = this.state.todosByStatus.map((todos) => {
      const todoIndex = todos.findIndex((todo) => todo.id === id)
      if (todoIndex === -1) return [...todos]
      return todos.filter((todo) => todo.id !== id)
    })
    this.setState({
      todosByStatus: newTodosByStatus,
    })
  }

  this.addTodo = (todo) => {
    const { status } = todo
    const columnIndex = todoColumnData.findIndex(
      (column) => column.status === status
    )
    const newTodosByStatus = this.state.todosByStatus.map((todos, index) =>
      index === columnIndex ? [todo, ...todos] : [...todos]
    )
    this.setState({
      todosByStatus: newTodosByStatus,
    })
  }

  this.updateTodo = (todo) => {
    const { id, status } = todo
    const columnIndex = todoColumnData.findIndex(
      (column) => column.status === status
    )
    const newTodosByStatus = this.state.todosByStatus.map((todos, index) => {
      if (index !== columnIndex) return [...todos]
      const todoIndex = todos.findIndex((todo) => todo.id === id)
      return [...todos.slice(0, todoIndex), todo, ...todos.slice(todoIndex + 1)]
    })
    this.setState({
      todosByStatus: newTodosByStatus,
    })
  }

  const todoColumns = this.state.todosByStatus.map((todos, i) => {
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
    TodoAPI.getList((todosByStatus) => {
      this.setState({ todosByStatus })
    })
  }

  this.init()

  this.openRemoveConfirmModal = (id) => {
    confirmModal.setState({
      message: '선택한 카드를 삭제할까요?',
      submitText: '삭제',
      onSubmit: () => {
        TodoAPI.delete(id, () => {
          this.removeTodo(id)
          confirmModal.close()
        })
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

  const dragPoint = this.$dragPoint

  // element2이 element1보다 앞에 있는지 검사
  const isBefore = (element1, element2) => {
    if (element1.parentNode !== element2.parentNode) return false

    return element1.previousSibling === element2
  }

  let clicked = false
  let dragPointLi = undefined

  let $todoCard = undefined

  // 선택한 카드 정보
  let targetLi = undefined
  let targetNode = undefined
  let targetStatus = []

  const getCard = () => {
    if (!targetLi) return

    // 선택한 카드의 status, 인덱스 위치 값
    targetStatus = targetLi.getAttribute('data-name').split('-')
    // 선택한 카드의 객체 정보
    let todos = []
    if (targetStatus[0] === 'todo') {
      todos = [...this.state.todosByStatus[0]]
    } else if (targetStatus[0] === 'inprogress') {
      todos = [...this.state.todosByStatus[1]]
    } else if (targetStatus[0] === 'done') {
      todos = [...this.state.todosByStatus[2]]
    }

    targetNode = todos[Number(targetStatus[1]) - 1]
    // console.log('선택한 카드 status', targetStatus)
    // console.log('선택한 카드 객체', targetNode)
  }

  // 인접한 카드 정보
  let prevCard = undefined
  let todoCardNode = undefined
  let todoCardStatus = []

  const getNearNode = () => {
    if (!prevCard) return
    // 선택한 카드의 status, 인덱스 위치 값
    todoCardStatus = prevCard.getAttribute('data-name').split('-')
    // 선택한 카드의 객체 정보

    let todos = []
    if (todoCardStatus[0] === 'todo') {
      todos = [...this.state.todosByStatus[0]]
    } else if (todoCardStatus[0] === 'inprogress') {
      todos = [...this.state.todosByStatus[1]]
    } else if (todoCardStatus[0] === 'done') {
      todos = [...this.state.todosByStatus[2]]
    }

    todoCardNode = todos[Number(todoCardStatus[1]) - 1]
    // console.log('인접한 카드 status', todoCardStatus)
    // console.log('인접한 카드 객체', todoCardNode)
    moveCard()
  }

  const map = {
    todo: 0,
    inprogress: 1,
    done: 2,
  }

  const moveCard = () => {
    // const todoList = [...this.state.todosByStatus[0]]
    // const inprogressList = [...this.state.todosByStatus[1]]
    // const doneList = [...this.state.todosByStatus[2]]

    const data = [...this.state.todosByStatus]

    //속성 값 변경
    if (targetNode.status !== todoCardStatus[0]) {
      TodoAPI.patch(targetNode.id, { status: todoCardStatus[0] })
      targetNode.status = todoCardStatus[0]
    }

    const targetList = [...data[map[targetStatus[0]]]]
    const targetChangeList = targetList.filter(
      (item, idx) => idx !== Number(targetStatus[1]) - 1
    )

    data[map[targetStatus[0]]] = targetChangeList

    const prevList = [...data[map[todoCardStatus[0]]]]
    prevList.splice(Number(todoCardStatus[1]), 0, targetNode)

    //console.log(prevList)

    // const data = [...this.state.todosByStatus]
    // data[map[targetStatus[0]]] = targetChangeList
    data[map[todoCardStatus[0]]] = prevList

    // console.log(data)

    this.setState({
      todosByStatus: data,
    })

    // console.log(targetChangeList)
    // console.log(prevList)
  }

  const handleMouseMove = (event) => {
    if (!clicked || !dragPointLi) return

    // pageX, pageY 는 모든 페이지 기반
    // clientX, clientY 는 현제 보이는 화면 기반
    const { pageX, pageY } = event

    // 잠시 현재 dragPoint element를 가리고 현재 좌표의 element를 가져온다
    dragPoint.hidden = true
    const elemBelow = document.elementFromPoint(pageX, pageY)
    $todoCard = elemBelow.closest('.todo-card-wrapper')

    const $todoCardContainer = elemBelow.closest('.todo-card-container')
    dragPoint.hidden = false

    dragPoint.style.left = pageX - dragPoint.offsetWidth / 2 + 'px'
    dragPoint.style.top = pageY - dragPoint.offsetHeight / 2 + 'px'

    if (!$todoCard) {
      if ($todoCardContainer) {
        const startLine = $todoCardContainer.querySelector('.startLine')

        //

        //

        const { top } = startLine.getBoundingClientRect()
        if (top > pageY) {
          // startLine.parentNode.insertBefore(targetLi, startLine.nextSibling)
        } else {
          //  하단에 옮겨지는 경우
          $todoCardContainer.appendChild(targetLi)
        }
      }

      return
    }

    // 만약 같은 $todoCardContainer에서 taeget이 가까운 todoCard보다 앞에 있다면
    // target을 todoCard 위로 옮겨줍니다.
    // if (isBefore(targetLi, $todoCard) && $todoCard.className !== 'startLine') {
    //   $todoCard.parentNode.insertBefore(targetLi, $todoCard)
    //   return
    // }

    // // 그 외에는 밑으로 이동.
    $todoCard.parentNode?.insertBefore(targetLi, $todoCard)
  }

  const handleMouseDown = (event) => {
    if (event.button !== 0) {
      return
    }

    clicked = true
    const targetRemove = event.target.closest('.todo-card-wrapper')
    if (targetRemove === null || targetRemove.className === 'startLine') {
      return
    }

    // 현재 삭제하려고하는 taeget li태그입니다.
    targetLi = targetRemove
    // 카드 정보 얻는 함수
    getCard()

    // 내부 값을 복사한 element를 마우스를 따라다닐 dragPoint로 설정합니다.
    dragPointLi = targetRemove.cloneNode(true)
    // target을 불투명하게 하기 위해 class를 넣어주세요
    targetLi.classList.add('temp')

    const { pageX, pageY } = event

    dragPoint.appendChild(dragPointLi)

    dragPoint.style.left = pageX - dragPoint.offsetWidth / 2 + 'px'
    dragPoint.style.top = pageY - dragPoint.offsetHeight / 2 + 'px'
  }

  const handleMouseUp = () => {
    prevCard = targetLi.previousSibling
    //    console.log(prevCard)

    if (prevCard.getAttribute('data-name')) {
      if (targetLi && prevCard) {
        getNearNode()
      }
    }

    if (!clicked) {
      return
    }

    clicked = false
    if (targetLi) {
      targetLi.classList.remove('temp')
    }
    if (dragPointLi) {
      dragPointLi.remove()
    }
    dragPointLi = undefined
    targetLi = undefined
  }

  const handleMouseLeave = () => {
    if (!clicked) {
      return
    }
    handleMouseUp()
  }

  this.$element.addEventListener('mousemove', handleMouseMove)
  this.$element.addEventListener('mousedown', handleMouseDown)
  this.$element.addEventListener('mouseup', handleMouseUp)
  this.$element.addEventListener('mouseleave', handleMouseLeave)
}
