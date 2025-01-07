export default {
    getStorage: (key, defaultValue = null) => {
        return localStorage.getItem(key) || defaultValue;
    },
    setStorage: (key, value) => {
        localStorage.setItem(key, value);
    },
}