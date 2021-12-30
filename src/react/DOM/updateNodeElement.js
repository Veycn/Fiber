export default function updateNodeElement(newElement, virtualDOM, oldVirtualDOM = {}) {
    const newProps = virtualDOM.props || {};
    const oldProps = oldVirtualDOM.props || {};

    /**
     * 增加文本处理能力
     * 当文本被替换的时候，不只是替换文本
     * 可能文本的容器从原来的 p 标签修改为了 span 或者 div 或者其他
     * 此时如果调用 replaceChild 去替换 text 会导致意料之外的异常
     */
    if (virtualDOM.type === 'text') {
        if (newProps.textContent !== oldProps.textContent) {
            // 如果新节点的父级的类型 与 旧节点的父级的类型 不一致
            if (virtualDOM.parent.type !== oldVirtualDOM.parent.type) {
                virtualDOM.parent.stateNode.appendChild(
                    document.createTextNode(newProps.textContent)
                )
            } else {
                // 父级类型一直才能直接 replace
                virtualDOM.parent.stateNode.replaceChild(
                    document.createTextNode(newProps.textContent),
                    oldVirtualDOM.stateNode
                )
            }

        }
        return
    }

    Object.keys(newProps).forEach(propName => {
        // 获取存储在 props 中的属性值
        const newPropsValue = newProps[propName]
        const oldPropsValue = oldProps[propName]

        if (newPropsValue !== oldPropsValue) {
            // 判断是否是事件属性 onClick => click
            if (propName.slice(0, 2) === 'on') {
                // 拿到 事件名称 'click'
                const eventName = propName.toLowerCase().slice(2);
                // 给元素添加事件监听
                newElement.addEventListener(eventName, newPropsValue)
                // addEventListener 可以添加多个监听
                // 在此处如果更新元素的事件，要移除之前的事件处理函数
                if (oldPropsValue) {
                    newElement.removeEventListener(eventName, oldPropsValue)
                }
            } else if (propName === 'value' || propName === 'checked') {
                // 如果属性名称是表单相关的 value 或这 checked
                // 通过 ele.value = xx 的方式设置
                newElement[propName] = newPropsValue
            } else if (propName !== 'children') {
                /**
                 * children 也在 props 属性中，children 会在上一层做处理，
                 * 这里只对某个 native 元素做处理，添加事件、属性等
                 */

                // 如果属性名是 className 则给元素设置 class
                if (propName === 'className') {
                    newElement.setAttribute('class', newPropsValue)
                } else {
                    // 其他熟悉则通过 setAttribute 直接设置
                    newElement.setAttribute(propName, newPropsValue)
                }
            }
        }
    })

    /**
     * 如何判断属性被删除？
     * 这里有两个 virtualDOM，一个新的一个旧的
     * 被删除的属性，在 newProps 中没有，oldProps 中存在
     * 因此，两相对比可以知道某个属性是否被删除
     * - 如果被删除的属性是事件， removeEventListener 移除之
     * - 如果被删除的属性是'属性'，removeAttribute 移除之
     */
    // 处理属性被删除的情况
    Object.keys(oldProps).forEach(propName => {
        const newPropsValue = newProps[propName]
        const oldPropsValue = oldProps[propName]
        if (!newPropsValue) {
            // 属性被删除了
            if (propName.slice(0, 2) === 'on') {
                // 如果是事件，移除对应的事件监听
                const eventName = propName.toLowerCase().slice(2)
                newElement.removeEventListener(eventName, oldPropsValue)
            } else if (propName !== 'children') {
                // 这里一样要排除 children 的情况
                newElement.removeAttribute(propName)
            }
        }
    })
}
