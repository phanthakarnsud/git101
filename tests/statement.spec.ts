import { test } from '@playwright/test';
test('demo if else', async () => {
    let grade : number = 60;
    if (grade === 100) {
        console.log("Grade: A+");
    } else if (grade >= 90) {
        console.log("Grade: A");
    } else if (grade >= 80) {
        console.log("Grade: B");
    }
     else if (grade >=70) {
        console.log("Grade: C");
    }
    else if (grade >=60) {
        console.log("Grade: D");
    }
    else if (grade < 60) {
        console.log("Grade: F");
    }
});

test('demo for loop', async () => {
    let name: string = "ford";
    for (let i = 0; i < 5; i++) {
        console.log(name);
    }
});

test('demo for of loop', async () => {
    const grades: number[] = [10, 20, 30, 40];
    for (const grade of grades) {
        console.log(grade);
    }
});

test('demo for in loop', async () => {
    const grades: number[] = [10, 20, 30, 40];
    for (const i in grades) {
        console.log('index ' + i);
        console.log('No ' +  grades[i]);
    }
});
