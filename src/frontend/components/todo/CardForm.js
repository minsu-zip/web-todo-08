export default function TodoCardForm({ $target, initialState, addTodo }) {
  this.$element = document.createElement('form')
  this.$element.classList.add('todo-form')
  this.$element.classList.add('hidden')
  this.$element.action = '/todos'
  this.$element.method = 'post'
  $target.appendChild(this.$element)
  this.state = initialState

  this.render = () => {
    const { status, submitButtonText } = this.state
    this.$element.dataset.todoStatus = status
    this.$element.innerHTML = `
        <input type="hidden" name="status" value="${status}"/>
        <input name="title" class="todo-title-input" placeholder="제목을 입력하세요"/>
        <input name="description" class="todo-description-input" placeholder="내용을 입력하세요" />
        <div class="todo-form-btns">
            <button class="todo-form-cancelBtn">취소</button>
            <input type="submit" class="todo-form-submitBtn" value="${submitButtonText}" disabled>
        </div>
    `
  }

  this.render()

  const $todoTitleInput = this.$element.querySelector('.todo-title-input')
  const $todoDescriptionInput = this.$element.querySelector(
    '.todo-description-input'
  )
  const $submitBtn = this.$element.querySelector('input[type="submit"]')

  this.resetForm = () => {
    $todoTitleInput.value = ''
    $todoDescriptionInput.value = ''
    $submitBtn.disabled = true
  }

  this.closeForm = () => {
    this.$element.classList.add('hidden')
  }

  this.submitForm = () => {
    //  post 요청하고 서버에서 데이터 받아서 addTodo
    return {
      id: Math.random(),
      status: this.state.status,
      title: $todoTitleInput.value,
      description: $todoDescriptionInput.value,
    }
  }

  this.$element.addEventListener('click', (e) => {
    const $todoCardCancelBtn = e.target.closest('.todo-form-cancelBtn')
    if ($todoCardCancelBtn) {
      e.preventDefault()
      this.closeForm()
      return
    }
    const $todoCardSubmitBtn = e.target.closest('.todo-form-submitBtn')
    if ($todoCardSubmitBtn) {
      e.preventDefault() //서버 코드 추가하고 삭제
      const newTodo = this.submitForm()
      addTodo(newTodo)
      this.resetForm()
      this.closeForm()
      return
    }
  })

  this.$element.addEventListener('input', () => {
    const submitBtnDisabled =
      !$todoTitleInput.value || !$todoDescriptionInput.value
    $submitBtn.disabled = submitBtnDisabled
  })
}
