export class Validator {
  validateBook(formData: FormData): boolean {
    const bookName = formData.get('name');
    const author = formData.get('author');
    const releaseYear = formData.get('year');

    return (
      !!bookName &&
      !!author &&
      !!releaseYear &&
      this.isYearValid(releaseYear as string)
    );
  }

  validateUser(formData: FormData): boolean {
    const userName = formData.get('name');
    const email = formData.get('email');
    const birthYear = formData.get('year');

    return (
      !!userName &&
      !!email &&
      !!birthYear &&
      this.isYearValid(birthYear as string)
    );
  }

  isYearValid(year: string): boolean {
    const yearRegex = /^\d{4}$/;
    return yearRegex.test(
      year,
    ) /* && Number(year) <= new Date().getFullYear() */;
  }
}
