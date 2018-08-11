// Service worker registration
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

OfflinePluginRuntime.install();

import './assets/styles/style.css';
import MyModule from './js/myModule';


let module = new MyModule();
module.sayHello();
module.sayHelloAsync();
module.getSomeData();


console.log(API_URL); // this is an env variable (defined in config)
