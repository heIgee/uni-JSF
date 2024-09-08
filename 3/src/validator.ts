export class Validator {
  validateBook(formData: FormData): boolean {
    console.log(formData);

    const bookName = formData.get('name');
    const author = formData.get('author');
    const releaseYear = formData.get('year');

    console.log({ bookName, author, releaseYear });
    // modal ??
    return !!bookName && !!author && !!releaseYear;
  }

  validateUser(formData: FormData): boolean {
    console.log(formData);

    const userName = formData.get('name');
    const email = formData.get('email');
    const birthYear = formData.get('year');

    console.log({ userName, email, birthYear });
    // modal ??
    return !!userName && !!email && !!birthYear;
  }

  isYearValid(year: string): boolean {
    const yearRegex = /^\d{4}$/;
    return yearRegex.test(year);
  }
}
