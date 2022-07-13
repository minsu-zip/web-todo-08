import closeIcon from '../../assets/close.svg'
import plusIcon from '../../assets/plus.svg'

export default function TodoColumnHeader({ $target, initialState }) {
  this.$element = document.createElement('div')
  this.$element.classList.add('todo-column-header')
  $target.appendChild(this.$element)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    const { title, todoCnt, status } = this.state
    this.$element.innerHTML = `
        <p class="todo-column-title">${title}</p>
        <p class="todo-column-count">${todoCnt}</p>
        <button class="todo-card-addBtn">
            <img src="${plusIcon}" alt="todo-card-addBtn" data-todo-status="${status}"/>
        </button>
        <button class="todo-column-removeBtn">
            <img src="${closeIcon}" alt="todo-card-removeBtn"/>
        </button>
    `
  }

  this.render()

  this.$element.addEventListener('click', (e) => {
    const $todoCardAddBtn = e.target.closest('.todo-card-addBtn')
    if ($todoCardAddBtn) {
      const form = document.querySelector(
        `form[data-todo-status="${this.state.status}"]`
      )
      form.classList.toggle('hidden')
    }
  })
}
