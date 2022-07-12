import '../styles/reset.css'
import '../styles/global.css'
import '../styles/index.css'

import Header from './Header.js'

export default function App($target) {
  this.state = {
    todos: [
      {
        id: 1,
        status: 'todo',
        title: '컴포넌트 구현',
        description: '화면에 필요한 컴포넌트들을 생성합니다.',
      },
      {
        id: 2,
        status: 'todo',
        title: 'API 구현',
        description: '웹 어플리케이션에 필요한 API를 구현합니다.',
      },
      {
        id: 3,
        status: 'inprogress',
        title: '컴포넌트 구조 설계',
        description: '컴포넌트 구조를 설계합니다.',
      },
      {
        id: 4,
        status: 'done',
        title: '기본 스타일 추가',
        description: '기본 스타일 파일을 추가합니다.',
      },
    ],
    history: [
      {
        title: '컴포넌트 구현을 해야 할 일에서 하고 있는 일로 이동하였습니다.',
        timestamp: new Date().getTime(),
      },
    ],
  }

  this.setState = (nextState) => {
    this.state = nextState
  }

  const header = new Header({ $target })

  const init = async () => {
    //
  }

  init()
}
