/// <reference types="react-scripts" />
declare global {
  namespace JSX {
    interface IntrinsicElements {
      OrbitControls: ReactThreeFiber.Object3DNode<
        OrbitControls,
        typeof OrbitControls
      >
    }
  }
}
