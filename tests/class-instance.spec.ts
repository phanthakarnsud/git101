import { test } from '@playwright/test';
import { Student } from '../modes/student';

test('demo class instance', async () => {
    let student = new Student('Ford', 'Doe', 20, 5);
    console.log(student.getFullName());
    console.log(student.getAge());
    console.log(student.getGrade());
    student.setGrade(6);
    console.log(student.getGrade());
});