import InstanceService from './../../this/services/instanceService';
var standalone;
(function (standalone) {
    let instance = null;
    /**
     * Create an instance
     */
    function create(config) {
        if (instance) {
            return instance;
        }
        instance = new InstanceService(config);
        return instance;
    }
    standalone.create = create;
    /**
     * Do NOT call it in production, ONLY used for test cases
     */
    function clearInstance() {
        instance = null;
    }
    standalone.clearInstance = clearInstance;
})(standalone || (standalone = {}));
export default function create(config) {
    return standalone.create(config);
}
/**
 * Do NOT call it in production, ONLY used for test cases
 */
export function clearInstance() {
    standalone.clearInstance();
}
