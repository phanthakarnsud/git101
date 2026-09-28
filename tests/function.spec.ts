import { test } from '@playwright/test';
test('demo function', async () => {
    hello('ford');
    hello('Hot');
});

test('demo function with return value', async () => {
    let result = x2(4);
    console.log(result);
});

function hello (username: string) {
    console.log('Hello World ' + username);
}
function x2(input: number){
    return input * 2;

}
