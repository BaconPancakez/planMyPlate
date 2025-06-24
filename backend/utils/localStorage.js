export const localStorage = {
    /*
     * Set an item with optional expiry (in ms)
     * @param {string} key 
     * @param {any} value 
     * @param {number} [expiryMS] Optional expiry in milliseconds
     */
    set(key, value, expiryMS = null){
        const item = {
            value,
            expiry: expiryMS ? Date.now() + expiryMS : null
        }
        localStorage.setItem(key, JSON.stringify(item))
    },

    /**
     * Get an item (returns null if expired or not found)
     * @param {string} key 
     */
    get(key){
        const itemStr = localStorage.getItem(key)
        if(!itemStr) return null

        try{
            const item = JSON.parse(itemStr)
            if(item.expiry && Date.now() > item.expiry){
                localStorage.removeItem(key)
                return null
            }
            return item.value
        } catch(err){
            console.warn(`Invalid ${err}`)
            return null
        }
    },
    /**
     * Remove an item
     * @param {string} key 
     */
    remove(key) {
        localStorage.removeItem(key)
    }
   
}