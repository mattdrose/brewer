import { nodeListToArray } from './utils';

class Tabs {
  constructor(el, onClick = null) {
    this.el = el;
    this.customOnClick = onClick;

    this.triggerEls = el.querySelectorAll('[data-tabs-trigger]');
    this.triggers = nodeListToArray(this.triggerEls).map((triggerEl) => {
      return new Tabs.Trigger(triggerEl);
    });
  }

  get currentIndex() {
    return this.triggers.findIndex((trigger) => trigger.isActive());
  }

  get current() {
    return this.triggers[this.currentIndex];
  }

  set current(target) {
    if (this.current.target == target) { return; }
    this.current.deactivate();
    this.triggers.find((trigger) => trigger.target == target).activate();
  }

  onClick(evt) {
    if (evt.target.tagName != 'A') { return; }

    evt.preventDefault();
    const target = evt.target.getAttribute('href');
    this.current = target;
    if (this.customOnClick) this.customOnClick.call(this, target);
  }

  init() {
    this.el.addEventListener('click', this.onClick.bind(this));
  }
}

Tabs.Trigger = class {
  constructor(el) {
    this.el = el;
    this.targetEl = document.querySelector(`[data-tabs-target-name="${this.target}"]`);
    this.classes = {
      active: 'is-active',
    };
  }

  get target() {
    return this.el.getAttribute('href');
  }

  isActive() {
    return this.el.classList.contains(this.classes.active);
  }

  activate() {
    this.el.classList.add(this.classes.active);
    this.targetEl.classList.add(this.classes.active);
  }

  deactivate() {
    this.el.classList.remove(this.classes.active);
    this.targetEl.classList.remove(this.classes.active);
  }
}

export default Tabs;
