export function getEmptyDataWrapper() {
    return {
        data: null,
        error: null,
        isFetching: false,
        receivedAt: null,
    };
}
export function receiveDataWrapper(data) {
    return {
        data,
        error: null,
        isFetching: false,
        receivedAt: new Date().toISOString(),
    };
}
export function errorDataWrapper(error) {
    return {
        data: null,
        error,
        isFetching: false,
        receivedAt: null,
    };
}
export function fetchDataWrapper() {
    return {
        data: null,
        error: null,
        isFetching: true,
        receivedAt: null,
    };
}
