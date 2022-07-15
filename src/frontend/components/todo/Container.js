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
  let clicked = false
  let dragPointLi = undefined
  let $todoCard = undefined

  // 상태에 따른 데이터 배열 인덱스
  const map = {
    todo: 0,
    inprogress: 1,
    done: 2,
  }

  // element2이 element1보다 앞에 있는지 검사
  const isBefore = (element1, element2) => {
    if (element1.parentNode !== element2.parentNode) return false

    return element1.previousSibling === element2
  }

  // 선택한 카드 정보
  let targetLi = undefined
  let targetNode = undefined
  let targetStatus = []

  const getClickedCard = () => {
    if (!targetLi) return
    // 선택한 카드의 status, 인덱스 위치 값
    targetStatus = targetLi.getAttribute('data-name').split('-')
    // 선택한 카드의 객체 정보
    const todos = [...this.state.todosByStatus[map[targetStatus[0]]]]
    targetNode = todos[Number(targetStatus[1]) - 1]
  }

  // 인접한 카드 정보
  let prevCard = undefined
  let prevCardNode = undefined
  let prevCardStatus = []

  const getPrevCard = () => {
    if (!prevCard) return
    // 선택한 카드의 status, 인덱스 위치 값
    prevCardStatus = prevCard.getAttribute('data-name').split('-')
    // 선택한 카드의 객체 정보
    const todos = [...this.state.todosByStatus[map[prevCardStatus[0]]]]
    prevCardNode = todos[Number(prevCardStatus[1]) - 1]
  }

  const setStateCard = () => {
    //속성 값 변경
    if (targetNode.status !== prevCardStatus[0]) {
      TodoAPI.patch(targetNode.id, { status: prevCardStatus[0] })
      targetNode.status = prevCardStatus[0]
    }

    const data = [...this.state.todosByStatus]

    // 클린된 곳의 데이터를 찾아서 삭제 해준다.
    const targetList = [...data[map[targetStatus[0]]]]
    const targetChangeList = targetList.filter(
      (_, idx) => idx !== Number(targetStatus[1]) - 1
    )
    data[map[targetStatus[0]]] = targetChangeList

    // 상위의 데이터를 찾아서 해당 위치 뒤에 클린된 카드 데이터를 삽입
    const prevList = [...data[map[prevCardStatus[0]]]]
    prevList.splice(Number(prevCardStatus[1]), 0, targetNode)
    data[map[prevCardStatus[0]]] = prevList

    // 데이터 교체
    this.setState({
      todosByStatus: data,
    })
  }

  const handleMouseMove = (event) => {
    if (!clicked || !dragPointLi) return

    // pageX, pageY 는 모든 페이지 기반
    // clientX, clientY 는 현제 보이는 화면 기반
    const { pageX, pageY } = event

    // 잠시 현재 dragPoint element를 가리고 현재 좌표의 element를 가져온다
    dragPoint.hidden = true

    const elemBelow = document.elementFromPoint(pageX, pageY)
    // 마우스 좌표에서 가장 가까운 카드 받아오기 (상위 카드)
    $todoCard = elemBelow.closest('.todo-card-wrapper')
    // 마우스 좌표에서 가장 가까운 카드 컨테이너 받아오기
    const $todoCardContainer = elemBelow.closest('.todo-card-container')
    dragPoint.hidden = false

    // 마우스 따라 이동
    dragPoint.style.left = pageX - dragPoint.offsetWidth / 2 + 'px'
    dragPoint.style.top = pageY - dragPoint.offsetHeight / 2 + 'px'

    // 가장 가까운 카드는 없고 카드 컨테이너가 있는 경우
    // -> 카드가 제일 상단에 위치해야 하거나 제일 하단에 위치해야함
    // 그냥 하위에 요소를 넣으면 된다
    if (!$todoCard && $todoCardContainer) {
      $todoCardContainer.appendChild(targetLi)
      return
    }
    // 가장 가까운 카드가 있는 경우 해당 카드 하단에 배치
    $todoCard?.parentNode?.insertBefore(targetLi, $todoCard)
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
    // 내부 값을 복사한 element를 마우스를 따라다닐 dragPoint로 설정
    dragPointLi = targetRemove.cloneNode(true)
    // target을 불투명하게 하기 위한 class
    targetLi.classList.add('temp')

    const { pageX, pageY } = event
    dragPoint.appendChild(dragPointLi)
    dragPoint.style.left = pageX - dragPoint.offsetWidth / 2 + 'px'
    dragPoint.style.top = pageY - dragPoint.offsetHeight / 2 + 'px'
  }

  const handleMouseUp = () => {
    prevCard = targetLi.previousSibling
    // 선택한 카드와 선택한 카드 상위 카드 or 컴포넌트가 있는 경우
    if (targetLi && prevCard.getAttribute('data-name')) {
      // 선택한 카드 정보
      getClickedCard()
      // 상위 카드 정보
      getPrevCard()
      // 교체된 위치에 따라 전체 데이터 교체
      setStateCard()
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
    prevCard = undefined
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
