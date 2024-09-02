import { hr } from './hr';

interface ICourse {
  name: string;
  duration: number;
  students: string[];
  registerStudent(student: string): void;
  isStudentRegistered(student: string): boolean;
}

class OnlineCourse implements ICourse {
  constructor(
    public name: string,
    public duration: number,
    public students: string[],
  ) {}
  registerStudent(student: string) {
    this.students.push(student);
  }
  isStudentRegistered(student: string) {
    return this.students.some((st) => st === student);
  }
}

interface ICourseManager {
  addCourse(course: ICourse): void;
  removeCourse(courseName: string): void;
  findCourse(courseName: string): ICourse[] | undefined;
}

class CourseManager implements ICourseManager {
  constructor(private _courses: ICourse[] = []) {}
  addCourse(course: ICourse) {
    this._courses.push(course);
  }
  removeCourse(courseName: string) {
    this._courses = this._courses.filter((c) => c.name !== courseName);
  }
  findCourse(courseName: string) {
    if (!courseName) return [...this._courses];
    const foundCourses = this._courses.filter((c) => c.name === courseName);
    return foundCourses.length > 0 ? foundCourses : undefined;
  }
}

const arcaneArts = new OnlineCourse('Arcane Arts 101', 45, []);
const quantumMechanics = new OnlineCourse(
  'Quantum Mechanics for Beginners',
  60,
  [],
);
const cyberSecurity = new OnlineCourse('Cyber Security Mastery', 35, []);

const academy = new CourseManager();
academy.addCourse(arcaneArts);
academy.addCourse(quantumMechanics);
academy.addCourse(cyberSecurity);

arcaneArts.registerStudent('Merlin');
arcaneArts.registerStudent('Morgana');

quantumMechanics.registerStudent('Einstein');
console.log(
  `Einstein is registered on ${
    quantumMechanics.name
  }: ${quantumMechanics.isStudentRegistered('Einstein')}`,
);
console.log(
  `Schrödinger is registered on ${
    quantumMechanics.name
  }: ${quantumMechanics.isStudentRegistered('Schrödinger')}`,
);
hr();

cyberSecurity.registerStudent('Neo');
cyberSecurity.registerStudent('Trinity');

const courses = academy.findCourse('');
if (courses) {
  courses.forEach((course) => {
    console.log(`Course: ${course.name}`);
    console.log(`Duration: ${course.duration} hours`);
    console.log(`Students: ${course.students.join(', ')}`);
    hr();
  });
}

export {};
