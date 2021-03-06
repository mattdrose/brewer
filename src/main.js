import './main.scss'
import 'lazysizes'
import Gallery from './javascripts/gallery'
import Router from './javascripts/router'
import Tabs from './javascripts/tabs'
import Clock from './javascripts/clock'
import translations from '../locale/en'

const $ = document.querySelector.bind(document)

// Gallery
const gallery = new Gallery($('[data-gallery]'))
gallery.init()

// Menu Tabs
const tabs = new Tabs($('[data-tabs]'), (target) => {
  router.go(target, false)
})
tabs.init()

// Router
const router = new Router()
router.on('/', translations.en.title, () => {
  tabs.current = '/'
})
router.on('/about', translations.en.about.title, () => {
  tabs.current = '/about'
})
router.on('/contact', translations.en.contact.title, () => {
  tabs.current = '/contact'
})

// Clock
const clockEl = $('[data-clock]')
const clock = new Clock((time) => {
  clockEl.innerHTML = time
})
clock.init()
