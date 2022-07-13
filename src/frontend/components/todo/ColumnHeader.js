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
    this.$element.innerHTML = `
        <p class="todo-column-title">${this.state.title}</p>
        <p class="todo-column-count">${this.state.todoCnt}</p>
        <button class="todo-card-addBtn">
            <img src="${plusIcon}" alt="todo-card-addBtn" data-todo-status="${this.state.status}"/>
        </button>
        <button class="todo-column-removeBtn">
            <img src="${closeIcon}" alt="todo-card-removeBtn"/>
        </button>
    `
  }

  this.render()
}
