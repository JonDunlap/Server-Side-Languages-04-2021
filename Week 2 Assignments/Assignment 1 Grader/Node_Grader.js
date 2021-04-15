const readline = require('readline'),
  interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

class Grader {
  getLetterGrade = (numberGrade) => {
    // Variable to use for the letter grade
    let letterGrade = 'Your letter grade for this assignment is: ';
    // Variable for the warning since it is used several times
    const warning = 'Please enter a valid number between 0 and 100.';

    // Check if the input grade can be parsed into an integer, if not give a warning, if so parse it
    // and give the letter grade corresponding to the number.
    if (!parseInt(numberGrade)) {
      letterGrade = warning;
    } else {
      // Parse the number grade into an integer
      const parsedGrade = parseInt(numberGrade);

      if (parsedGrade < 0) letterGrade = warning;
      else if (parsedGrade < 60) letterGrade += 'F';
      else if (parsedGrade < 70) letterGrade += 'D';
      else if (parsedGrade < 80) letterGrade += 'C';
      else if (parsedGrade < 90) letterGrade += 'B';
      else if (parsedGrade <= 100) letterGrade += 'A';
      // If they give a valid number but it falls outside of 0-100 give a warning
      else letterGrade = warning;
    }

    return letterGrade;
  };
}

interface.question(
  'What is the number grade for your assignment? ',
  (numberGrade) => {
    const grader = new Grader();
    console.log(grader.getLetterGrade(numberGrade));
  }
);
