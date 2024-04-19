/// <reference types="react-scripts" />

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}

declare module '*.svg' {
  const content: string
  export default content
}

declare module '*.mp4' {
  const src: string
  export default src
}

declare type A = any
