import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from 'react-three-fiber'
import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import test from "./gltf/picnic.gltf";

function Asset({ url }) {
    const gltf = useLoader(GLTFLoader, url)

    const mesh = useRef()
    useFrame(() => (mesh.current.rotation.y = mesh.current.rotation.y + 0.00001))
    const s = 6;
    return (
        <primitive ref={mesh} object={gltf.scene} dispose={null} rotation={[0, 200, 0]} scale={[s, s, s]} position={[0, -5, -15]} />
    )
}

function Cube() {
    const mesh = useRef()
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

    return (
        <mesh scale={[5, 5, 5]} ref={mesh}>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <meshStandardMaterial attach="material" color={'pink'} />
        </mesh>
    )
}

export default function Cloth() {
    const blanket = useRef()

    return (
        <div className='world'>
            <Canvas camera={{ position: [0, 8, 9] }} colorManagement={true}>
                <Suspense fallback={<Cube />}>
                    <Asset url={test}></Asset>
                </Suspense>
            </Canvas>
        </div>
    )
}