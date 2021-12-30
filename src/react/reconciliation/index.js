import {createTaskQueue} from "../Misc";
import e from "express";

const taskQueue = createTaskQueue()

let subTask = null


const getFirstTask = () => {}


const executeTask = fiber => {}


const workLoop = (deadline) => {
    /**
     * 任务不存在，则去队列中获取
     */
    if (!subTask){
        subTask = getFirstTask()
    }

    /**
     * 有任务其浏览器有空闲时间
     * 调用 executeTask 执行
     */
    while(subTask && deadline.timeRemaining()>1){
        subTask = executeTask(subTask)
    }
}


const performTask = (deadline) => {
    // 执行任务
    workLoop(deadline)
    // 判断任务是否存在，队列里面是否还有未执行任务
    // 如果有则让浏览器继续在空闲事件执行
    if (subTask || !taskQueue.isEmpty()){
        requestIdleCallback(performTask)
    }
}

export const render = (element, dom) => {
    console.log(element)
    console.log(dom)
    /**
     * 1、向任务队列中添加任务
     * 2、指定在浏览器空闲的时候执行
     *
     * 任务：通过 vdom 构建 fiber 对象
     */

    taskQueue.push({
        dom,
        props: { children: element }
    })

    requestIdleCallback(performTask)
}
