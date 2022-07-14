import TodoAPI from '../../api/todo'

export default function TodoCardForm({ $target, initialState, todoAction }) {
  this.$element = document.createElement('form')
  this.$element.classList.add('todo-form')
  this.$element.classList.add('hidden')
  $target.appendChild(this.$element)
  this.state = initialState
  this.formActionType = this.state.todo.id === undefined ? 'create' : 'update'
  this.$element.method = this.formActionType === 'create' ? 'post' : 'put'
  this.$element.action =
    this.formActionType === 'create' ? '/todos' : `/todos/${this.state.todo.id}`

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  let $todoTitleInput, $todoDescriptionInput, $submitBtn

  this.render = () => {
    const {
      index,
      todo: { id, status, title, description },
      submitButtonText,
    } = this.state
    this.formActionType = id === undefined ? 'create' : 'update'
    this.$element.method = this.formActionType === 'create' ? 'post' : 'put'
    this.$element.action =
      this.formActionType === 'create'
        ? '/todos'
        : `/todos/${this.state.todo.id}`
    this.$element.name = `${status}-${index}`
    this.$element.dataset.name = `${status}-${index}`

    const submitDisabled = title === '' && description === ''
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

    $todoTitleInput = this.$element.querySelector('.todo-title-input')
    $todoDescriptionInput = this.$element.querySelector(
      '.todo-description-input'
    )
    $submitBtn = this.$element.querySelector('input[type="submit"]')
  }

  this.render()

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
    const $todoCardContent = document.querySelector(
      `.todo-card-wrapper[data-name="${status}-${index}"] > .todo-card-content-wrapper`
    )
    $todoCardContent.classList.remove('hidden')
  }

  this.getFormData = () => {
    const { id, status } = this.state.todo
    return {
      id,
      status,
      title: $todoTitleInput.value,
      description: $todoDescriptionInput.value,
    }
  }

  this.submitForm = (formData) => {
    const { id, ...body } = formData
    if (this.formActionType === 'update') {
      TodoAPI.patch(id, body, todoAction)
      return
    }
    if (this.formActionType === 'create') {
      TodoAPI.post(body, todoAction)
    }
  }

  this.$element.addEventListener('click', (e) => {
    e.preventDefault()
    const $todoCardCancelBtn = e.target.closest('.todo-form-cancelBtn')
    if ($todoCardCancelBtn) {
      this.closeForm()
      return
    }
    const $todoCardSubmitBtn = e.target.closest('.todo-form-submitBtn')
    if ($todoCardSubmitBtn) {
      const formData = this.getFormData()
      this.submitForm(formData)
      this.closeForm()
      return
    }
  })

  this.$element.addEventListener('input', () => {
    const submitBtnDisabled =
      !$todoTitleInput.value || !$todoDescriptionInput.value
    $submitBtn.disabled = submitBtnDisabled
  })

  const preventEventBubbling = (e) => e.stopPropagation()
  this.$element.addEventListener('mousemove', preventEventBubbling)
  this.$element.addEventListener('mousedown', preventEventBubbling)
  this.$element.addEventListener('mouseup', preventEventBubbling)
  this.$element.addEventListener('mouseleave', preventEventBubbling)
}
