import React from './react'
import {render} from "./react/reconciliation";
import Component from "./react/Component";

const root = document.getElementById('root')

const jsx = (
    <div>
        <p>Hello React Fiber</p>
        <div>
            <p>Fiber</p>
            <span style="color: red">&hearts;</span>
        </div>
    </div>
)

const jsx2 = (
    <div>
        <p>Hello React Fiber</p>
        <div>
            <p>Fiber 111</p>
        </div>
    </div>
)
// render(jsx, root)


class Greeting extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.title}
            </div>
        );
    }
}

// render(<Greeting title="奥力给"/>, root)


function FunctionComponent (props){
    return <div>{props.title}, FunctionComponent</div>
}


// render(<FunctionComponent title="Hello"/>, root)



render(jsx, root)
setTimeout(() => {
    render(jsx2, root)
}, 2000)
