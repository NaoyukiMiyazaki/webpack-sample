// @flow
import wait from './wait'

window.addEventListener('DOMContentLoaded', () => {
  const hi: string = 'hi'
  wait(1000)
    .then(() => {
      console.log(hi)
    })
})
