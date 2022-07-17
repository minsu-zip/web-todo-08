import { getHistory } from '../../api/history.js'
import closeBtn from '../../assets/close.svg'
import sidebar from '../../styles/sidebar.css'

export default function HistorySidebar({ $target }) {
  this.state = {
    actions: [],
  }

  this.setState = (nextState) => {
    this.state.actions = nextState
    this.render()
  }

  const init = () => {
    getHistory().then((data) => {
      this.setState(data.reverse())
    })
  }
  init()

  const $sidebar = document.createElement('aside')
  $target.appendChild($sidebar)
  const $cardContainer = document.createElement('div')
  $cardContainer.classList.add('.history-card-container')
  $sidebar.appendChild($cardContainer)

  this.render = () => {
    $sidebar.innerHTML = `
        <button class='sidebar-closeBtn'>
            <img src=${closeBtn} alt='삭제-버튼'/>
        </button>
        <div class='history-card-container'>
            ${this.state.actions
              .map(
                ({ title, created_at }) => `
                <div class='history-card-wrapper'>  
                  <div class='history-card-author'>@partro</div>
                  <div class='history-card-text'>${title}</div>
                  <div class='history-card-createdAt'>${created_at}</div>
                </div>
                `
              )
              .join('')}
        </div>
    `
  }

  $sidebar.addEventListener('click', (e) => {
    const $closeBtn = e.target.closest('.sidebar-closeBtn')
    if ($closeBtn) {
      $sidebar.classList.toggle('is-open', false)
    }
  })
}
