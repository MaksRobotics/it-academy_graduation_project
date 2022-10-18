import {parseCurrentURL} from '../helpers/utils.js';

class Component {
    static get urlParts() {
        return parseCurrentURL();
    }

    async getData() {}

    afterRender() {}
}

export default Component;