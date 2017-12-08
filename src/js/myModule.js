export default class MyModule {

    constructor() {

    }

    sayHello() {
        console.log('Hello');
    }

    async sayHelloAsync() {
        await this.resolveAfter2Second();
        console.log('Hello new world');
    }

    async getSomeData() {
        const req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if(req.readyState === 4 ) {
                console.log(JSON.parse(req.responseText))
            }

        };
        req.open('GET', './static/someData.json', true);
        req.send(null);

    }

    resolveAfter2Second() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 2000)
        })
    }
}