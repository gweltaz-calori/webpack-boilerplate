export default class MyModule {

    constructor() {

    }

    sayHello() {
        console.log('ah')
    }

    async sayHelloAsync() {
        await this.resolveAfter2Second();
        console.log('Hello new world');
    }

    resolveAfter2Second() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 2000)
        })
    }
}