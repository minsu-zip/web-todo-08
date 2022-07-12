import closeBtn from '../../assets/close.svg'
import sidebar from '../../styles/sidebar.css'

export default function ({ $target }) {
  this.state = {
    actions: [
      {
        title:
          'HTML/CSS공부하기를 해야할 일에서 하고 있는 일로 이동하였습니다.',
        timestamp: '1분전',
      },
      {
        title: '해야할 일에 HTML/CSS 공부하기를 등록하였습니다.',
        timestamp: '5분전',
      },
      {
        title:
          'HTML/CSS공부하기를 해야할 일에서 하고 있는 일로 이동하였습니다.',
        timestamp: '1분전',
      },
    ],
  }
  const $sidebar = document.createElement('aside')
  $target.appendChild($sidebar)
  const $cardContainer = document.createElement('div')
  $cardContainer.classList.add('.history-card-container')
  $sidebar.appendChild($cardContainer)

  this.render = () => {
    $sidebar.innerHTML = `
        <button class='history-closeBtn'>
            <img src=${closeBtn} alt='삭제-버튼'/>
        </button>
        <div class='history-card-container'>
            ${this.state.actions
              .map(
                ({ title, timestamp }) => `
                <div class='history-card-wrapper'>
                    <div class='history-card-author'>@partro</div>
                    <div class='history-card-text'>${title}</div>
                    <div class='history-card-createdAt'>${timestamp}</div>
                </div>
                `
              )
              .join('')}
        </div>
    `
  }
  this.render()

  $sidebar.addEventListener('click', (e) => {
    const $closeBtn = e.target.closest('button')
    if ($closeBtn) {
      $sidebar.style.right = '-30%'
    }
  })
}
