class Clock {
  constructor (refreshCallback = null) {
    this.refreshCallback = refreshCallback
  }

  get now () {
    return new Date(this.nowCache.getTime())
  }

  get nowEst () {
    const nowEstMilli = this.nowUtc.setHours(this.nowUtc.getHours() + this.estOffset)
    return new Date(nowEstMilli)
  }

  get prettyTime () {
    return this.est.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  }

  get nowUtc () {
    const nowUtcMilli = this.now.setHours(this.now.getUTCHours())
    return new Date(nowUtcMilli)
  }

  get estOffset () {
    if (this.now > this.secondSundayInMarch || this.now < this.firstSundayInNovember) {
      return -4
    } else {
      return -5
    }
  }

  get nowYear () {
    return this.now.getFullYear()
  }

  get firstSundayInNovember () {
    const november = new Date(`November, ${this.nowYear}`)
    const firstSundayOffset = (7 - november.getDay()) % 7
    const firstSundayMilli = november.setDate(1 + firstSundayOffset)
    return new Date(firstSundayMilli)
  }

  get secondSundayInMarch () {
    const march = new Date(`March, ${this.nowYear}`)
    const secondSundayOffset = ((7 - march.getDay()) % 7) + 7
    const secondSundayMilli = march.setDate(1 + secondSundayOffset)
    return new Date(secondSundayMilli)
  }

  refreshTime () {
    this.nowCache = new Date()
    this.est = this.nowEst
    if (this.refreshCallback) this.refreshCallback(this.prettyTime, this.est)
  }

  init () {
    this.refreshTime()

    setTimeout(() => {
      this.refreshTime()
      setInterval(() => {
        this.refreshTime()
      }, 60000)
    }, (60 - this.est.getSeconds()) * 1000)
  }
}

export default Clock
