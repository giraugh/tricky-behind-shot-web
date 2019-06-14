export default (reducers) => {
  const props = Object.keys(reducers)
  return (state, ...args) => Object.fromEntries(
    props.map(p => {
      let v = reducers[p](state[p], ...args, state)
      if (typeof v === 'function') { v = v(state[p], ...args) }
      return [p, v]
    })
  )
}