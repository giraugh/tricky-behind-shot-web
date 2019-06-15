export const InputType = {
  PRESSED: 'pressed',
  MOVED: 'moved',
  RELEASED: 'released'
}

export type Input = {
  x : number,
  y : number,
  held : boolean,
  type : string
}