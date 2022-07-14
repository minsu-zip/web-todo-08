export default function ConfirmModal({ $target, initialState }) {
  this.$element = document.createElement('div')
  this.$element.classList.add('confirm-modal-overlay')
  this.$element.classList.add('closed')
  $target.appendChild(this.$element)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    this.$element.innerHTML = `
        <div class="confirm-modal">
            <p class="confirm-message">${this.state?.message}</p>
            <div class="confirm-action-btns">
                <button class="confirm-cancelBtn">취소</button>
                <button class="confirm-submitBtn">${this.state?.submitText}</button>
            </div>
        </div>
    `
    document
      .querySelector('.confirm-submitBtn')
      .addEventListener('click', this.state.onSubmit)
    document
      .querySelector('.confirm-cancelBtn')
      .addEventListener('click', this.close)
  }

  this.open = () => {
    this.$element.classList.remove('closed')
  }

  this.close = () => {
    this.$element.classList.add('closed')
  }

  this.render()
}
