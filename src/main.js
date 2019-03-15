import './main.scss';
import 'lazySizes';
import Gallery from './javascripts/gallery';
import Router from './javascripts/router';
import Tabs from './javascripts/tabs';
import Clock from './javascripts/clock';

const $ = document.querySelector.bind(document);

// Gallery
const gallery = new Gallery($('[data-gallery]'))
gallery.init();

// Menu Tabs
const tabs = new Tabs($('[data-tabs]'), (target) => {
  router.go(target, false);
})
tabs.init();

// Router
const router = new Router();
router.on('/', 'Michael Brewer | Designer | Toronto, Canada', () => {
  tabs.current = '/';
});
router.on('/about', 'Michael Brewer | About', () => {
  tabs.current = '/about';
});
router.on('/contact', 'Michael Brewer | Contact', () => {
  tabs.current = '/contact';
});

// Clock
const clockEl = $('[data-clock]');
new Clock((time) => {
  clockEl.innerHTML = time;
});