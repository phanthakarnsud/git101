export class Student {
    firstName: string;
    lastName: string;  
    age: number;
    grade: number;

    constructor(firstName: string, lastName: string, age: number, grade: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.grade = grade;
    }

    getFullName(): string {
        return this.firstName + ' ' + this.lastName;
    }
    getAge(): number {
        return this.age;
    }
    getGrade(): number {
        return this.grade;
    }
    public setGrade(Newgrade: number){
        this.grade = Newgrade;
    }
}