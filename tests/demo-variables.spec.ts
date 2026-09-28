import { test } from '@playwright/test';

test('variables', async () => {
    let mag : number = 5;
    console.log(mag);

     let text : string = "Hello, Playwright!";
    console.log(text);

    let test2 : boolean = false;
    console.log(test2);

    const welcome : string = "Welcome to Playwright!";
    console.log(welcome);
});

test('variables2', async () => {

    let text : string = "Hello, Playwright!";
    console.log(text);

    text = "Hello, Playwright! 2";
    console.log(text);

    const welcome : string = "Welcome to Playwright!";
    console.log(welcome);
});


test('array', async () => {

    let test3:string[] = ["Hello", "Playwright"];
    console.log(test3);
    console.log(test3[0])
    console.log(test3[1]);

    let test4:number[] = [5, 10, 15, 20, 25];

    let mtmsg:any = 'banana'
    mtmsg = 10;

});


