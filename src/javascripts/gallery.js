import { nodeListToArray } from './utils'

class Gallery {
  constructor (el) {
    this.el = el
    this.itemEls = el.querySelectorAll('[data-gallery-item]')
    this.items = nodeListToArray(this.itemEls).map((itemEl) => {
      return new Gallery.Item(itemEl)
    })
  }

  get currentIndex () {
    return this.items.findIndex((item) => item.isActive())
  }

  get current () {
    return this.items[this.currentIndex]
  }

  set current (index) {
    this.current.deactivate()
    this.items[index].activate()
  }

  next () {
    let nextIndex = this.currentIndex + 1
    if (nextIndex >= this.items.length) { nextIndex = 0 }
    this.current = nextIndex
  }

  init () {
    this.el.addEventListener('click', this.next.bind(this))
  }
}

Gallery.Item = class {
  constructor (el) {
    this.el = el
    this.classes = {
      active: 'is-active'
    }
  }

  get token () {
    return this.el.dataset.galleryToken
  }

  isActive () {
    return this.el.classList.contains(this.classes.active)
  }

  activate () {
    this.el.classList.add(this.classes.active)
  }

  deactivate () {
    this.el.classList.remove(this.classes.active)
  }
}

export default Gallery
