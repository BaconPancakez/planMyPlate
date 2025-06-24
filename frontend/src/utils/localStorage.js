export const localStorage = {
    /**
     * Set an item with optional expiry (in ms)
     * @param {string} key - The key to store the value under.
     * @param {any} value - The value to store.
     * @param {number} [expiryMS] - Optional expiry in milliseconds.
     */
    set(key, value, expiryMS = null) {
        const item = {
            value,
            expiry: expiryMS ? Date.now() + expiryMS : null,
        };
        window.localStorage.setItem(key, JSON.stringify(item));
    },

    /**
     * Get an item (returns null if expired or not found)
     * @param {string} key - The key to retrieve the value from.
     * @returns {any|null} - The stored value or null if expired/not found.
     */
    get(key) {
        const itemStr = window.localStorage.getItem(key);
        if (!itemStr) return null;

        try {
            const item = JSON.parse(itemStr);
            if (item.expiry && Date.now() > item.expiry) {
                window.localStorage.removeItem(key);
                return null;
            }
            return item.value;
        } catch (err) {
            console.warn(`Invalid JSON format for key "${key}":`, err);
            return null;
        }
    },

    /**
     * Remove an item
     * @param {string} key - The key to remove.
     */
    remove(key) {
        window.localStorage.removeItem(key);
    },

    /**
     * Log all keys and values in localStorage
     */
    logAll() {
        for (let i = 0; i < window.localStorage.length; i++) {
            const key = window.localStorage.key(i);
            const value = this.get(key);
            console.log(`Key: ${key}, Value:`, value);
        }
    },
};
