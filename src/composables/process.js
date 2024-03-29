/** helper functions for process functionality */


/**
 * Maps the process instance ID to the number of occurrences within the array.
 *
 * @param instances  array with process instances
 * @returns {null|*}  mapped instance IDs to count
 */
export function mapInstances(instances) {
    if (instances) {
        return instances.reduce((accumulator, currentValue) =>
            ( accumulator[currentValue.activityId] = (accumulator[currentValue.activityId] || 0) + 1, accumulator), Object.create(null));
    }

    return null;
}

export function formatValue(value, type, valueInfo) {
    if (type === 'File') {
       return valueInfo.filename;
    }

    return value;
}

export function filterCalledInstances(instances) {
    return instances.filter(instance => instance.activityType === 'callActivity');
}