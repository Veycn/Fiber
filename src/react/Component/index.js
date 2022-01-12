import {scheduleUpdate} from "../reconciliation";
export default class Component {
    constructor(props) {
        this.props = props
    }

    setState(partialState) {
        scheduleUpdate(this, partialState)
    }
}
