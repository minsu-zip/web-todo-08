import hamburgerIcon from '../assets/menu.svg'

export default function Header({ $target }) {
  this.$element = document.createElement('header')
  $target.appendChild(this.$element)

  this.render = () => {
    const $heading = document.createElement('h1')
    $heading.innerText = 'TO-DO List'
    this.$element.appendChild($heading)

    const $sidebarOpenBtn = document.createElement('button')
    $sidebarOpenBtn.classList.add('sidebar-openBtn')
    const $hamburgerIcon = document.createElement('img')
    $hamburgerIcon.src = hamburgerIcon
    $hamburgerIcon.alt = 'sidebar-open-button'
    $sidebarOpenBtn.appendChild($hamburgerIcon)
    this.$element.appendChild($sidebarOpenBtn)
  }

  this.render()
}
