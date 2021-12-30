import updateNodeElement from "./updateNodeElement";

export default function createDOMElement(virtualDOM){
    let newElement = null
    if (virtualDOM.type === 'text') {
        // 文本节点，调用 createTextElement
        newElement = document.createTextNode(virtualDOM.props.textContent)
    } else {
        // 元素节点，调用 createElement
        newElement = document.createElement(virtualDOM.type)
        updateNodeElement(newElement, virtualDOM)
    }

    return newElement
}
