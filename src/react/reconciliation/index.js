import {arrayed, createStateNode, createTaskQueue, getTag} from "../Misc";

/**
 * 任务：为每一个节点构建 fiber 对象
 *
 */
const taskQueue = createTaskQueue()

let subTask = null


const getFirstTask = () => {
    // 获取任务
    const task = taskQueue.pop()
    // 返回最外层节点的 fiber 对象
    return {
        props: task.props,
        stateNode: task.dom,
        tag: 'host_root',
        effects: [],
        child: null
    }
}

/**
 * fiber 子节点的构建原则
 * - 抵达左侧的叶子节点
 * - 首先判断这个节点有没有同级，有则构建同级，无则退回父级， 重复此步骤，直到回到根节点
 *
 */

const reconcileChildren = (fiber, children) => {
    /**
     * children 可能是对象或者数组
     * 如果是对象，放入数组中返回
     */
    const arrayedChildren = arrayed(children)

    let index = 0
    let numberOfElements = arrayedChildren.length
    let element = null
    let newFiber = null
    let prevFiber = null

    while (index < numberOfElements) {
        element = arrayedChildren[index]
        newFiber = {
            type: element.type,
            props: element.props,
            tag: getTag(element),
            effects: [],
            effectTag: 'placement',
            stateNode: null,
            parent: fiber
        }
        newFiber.stateNode = createStateNode(newFiber)
        // 在 fiber 中，只有第一个是父级的子节点，其他的子节点都应该是第一个子节点的兄弟节点
        if (index === 0) {
            fiber.child = newFiber
        } else {
            prevFiber.sibling = newFiber
        }

        prevFiber = newFiber
        index++
    }
    console.log(fiber)
}

const executeTask = fiber => {
    /**
     * 构建子级 fiber 对象
     */
    reconcileChildren(fiber, fiber.props.children)

    /**
     * 如果子级存在，返回子级
     * 将这个子级当作父级，构建这个父级下的子级
     */
    if (fiber.child) {
        return fiber.child
    }

    let currentExecutingFiber = fiber
    while (currentExecutingFiber.parent){
        /**
         * 没有子节点则判断有无同级
         * 有同级则返回同级
         */
        if (currentExecutingFiber.sibling){
            return currentExecutingFiber.sibling
        }
        // 没有同级之后回退到当前节点的父节点
        currentExecutingFiber = currentExecutingFiber.parent
    }


}


const workLoop = (deadline) => {
    /**
     * 任务不存在，则去队列中获取
     */
    if (!subTask) {
        subTask = getFirstTask()
    }

    /**
     * 有任务其浏览器有空闲时间
     * 调用 executeTask 执行
     */
    while (subTask && deadline.timeRemaining() > 1) {
        subTask = executeTask(subTask)
    }
}


const performTask = (deadline) => {
    // 执行任务
    workLoop(deadline)
    // 判断任务是否存在，队列里面是否还有未执行任务
    // 如果有则让浏览器继续在空闲事件执行
    if (subTask || !taskQueue.isEmpty()) {
        requestIdleCallback(performTask)
    }
}

export const render = (element, dom) => {
    /**
     * 1、向任务队列中添加任务
     * 2、指定在浏览器空闲的时候执行
     *
     * 任务：通过 vdom 构建 fiber 对象
     */

    taskQueue.push({
        dom,
        props: {children: element}
    })

    requestIdleCallback(performTask)
}
