import { ref, unref } from 'vue';

export function useFormatDate(date) {
    let formatted = '';

    if (date) {
        const input = unref(date);
        formatted = new Intl.DateTimeFormat('de-de', {dateStyle: 'short', timeStyle: 'short'}).format(new Date(input));
    }

    return formatted;
}