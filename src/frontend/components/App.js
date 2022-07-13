import '../styles/reset.css'
import '../styles/global.css'
import '../styles/index.css'
import '../styles/todo.css'
import '../styles/confirm-modal.css'

import Header from './Header.js'
import HistorySidebar from './history/Sidebar.js'
import TodoContainer from './todo/Container'

export default function App($target) {
  new Header({ $target })
  new HistorySidebar({ $target })
  new TodoContainer({ $target })
}
