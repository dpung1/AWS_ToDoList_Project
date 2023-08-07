class Routes {
    static #instance = null;

    static getInstance() {
        if(this.#instance === null) {
            this.#instance = new Routes();
        }
        return this.#instance;
    }
}