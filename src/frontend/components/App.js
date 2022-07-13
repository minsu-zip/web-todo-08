import '../styles/reset.css'
import '../styles/global.css'
import '../styles/index.css'
import '../styles/todo.css'

import Header from './Header.js'
import TodoContainer from './todo/Container'

export default function App($target) {
  new Header({ $target })
  new TodoContainer({ $target })
}
