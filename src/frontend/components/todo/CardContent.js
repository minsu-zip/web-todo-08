import closeIcon from '../../assets/close.svg'

export default function TodoCardContent({ $target, initialState }) {
  this.$element = document.createElement('div')
  this.$element.classList.add('todo-card-content-wrapper')
  $target.appendChild(this.$element)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    const {
      todo: { title, description, id },
    } = this.state
    this.$element.innerHTML = `
        <div class="todo-card-content">
            <p class="todo-card-title">${title}</p>
            <p class="todo-card-description">${description}</p>
            <p class="todo-card-author">author by web</p>
        </div>
        <button data-todo-id="${id}" class="todo-card-removeBtn">
            <img src="${closeIcon}" alt="todo-card-removeBtn"/>
        </button>
    `
  }

  this.render()

  this.$element.addEventListener('dblclick', (e) => {
    const $todoCardWrapper = e.target.closest('.todo-card-wrapper')
    if (!$todoCardWrapper) return
    const $form = document.querySelector(
      `form[name="${$todoCardWrapper.dataset.name}"]`
    )
    $form.classList.remove('hidden')
    this.$element.classList.add('hidden')
  })
}
