// @flow

export default function wait(time: number): Promise {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
