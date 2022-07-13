export default function TodoCardForm({ $target, initialState, submitForm }) {
  this.$element = document.createElement('form')
  this.$element.classList.add('todo-form')
  this.$element.classList.add('hidden')
  $target.appendChild(this.$element)
  this.state = initialState
  this.formActionType = this.state.todo.id === undefined ? 'create' : 'update'
  this.$element.method = this.formActionType === 'create' ? 'post' : 'put'
  this.$element.action =
    this.formActionType === 'create' ? '/todos' : `/todos/${this.state.todo.id}`

  this.render = () => {
    const {
      index,
      todo: { status, title, description },
      submitButtonText,
    } = this.state
    const submitDisabled = title === '' && description === ''
    this.$element.name = `${status}-${index}`
    this.$element.innerHTML = `
        <input type="hidden" name="status" value="${status}"/>
        <input name="title" class="todo-title-input" value="${title}" placeholder="제목을 입력하세요"/>
        <input name="description" class="todo-description-input" value="${description}" placeholder="내용을 입력하세요" />
        <div class="todo-form-btns">
            <button class="todo-form-cancelBtn">취소</button>
            <input type="submit" class="todo-form-submitBtn" value="${submitButtonText}" ${
      submitDisabled ? 'disabled' : ''
    }>
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
    if (this.formActionType === 'create') {
      this.resetForm()
      return
    }
    const {
      index,
      todo: { status },
    } = this.state
    const $todoCard = document.querySelector(
      `.todo-card-wrapper[data-name="${status}-${index}"]`
    )
    $todoCard.classList.remove('hidden')
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
      const { id, status } = this.state.todo
      submitForm({
        id: this.formActionType === 'create' ? Math.random() : id,
        status,
        title: $todoTitleInput.value,
        description: $todoDescriptionInput.value,
      })
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
