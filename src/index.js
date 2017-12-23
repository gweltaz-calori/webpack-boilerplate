import './assets/styles/style.css';
import MyModule from './js/myModule';


let module = new MyModule();
module.sayHello();
module.sayHelloAsync();
module.getSomeData();


console.log(API_URL) // this is an env variable (defined in config)