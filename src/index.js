import React  from './react'
import {render} from "./react/reconciliation";

const root = document.getElementById('root')

const jsx = (
    <div>
        <p>Hello React Fiber</p>
    </div>
)

console.log(jsx)

render(jsx, root)


