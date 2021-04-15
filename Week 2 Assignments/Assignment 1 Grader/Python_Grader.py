import sys


class Grader:
    def getLetterGrade(self, numberGrade):
        # Variable to use for the letter grade
        letterGrade = 'Your letter grade for this assignment is: '
        # Variable for the warning since it is used several times
        warning = 'Please enter a valid number between 0 and 100.'

        # Check if the input grade can be parsed into an integer, if not give a warning, if so parse it
        # and give the letter grade corresponding to the number.
        if not float(numberGrade):
            letterGrade = warning
        else:
            # Parse the number grade into an integer
            parsedGrade = float(numberGrade)
            if (parsedGrade < 0):
                letterGrade = warning
            elif (parsedGrade < 60):
                letterGrade += 'F'
            elif (parsedGrade < 70):
                letterGrade += 'D'
            elif (parsedGrade < 80):
                letterGrade += 'C'
            elif (parsedGrade < 90):
                letterGrade += 'B'
            elif (parsedGrade <= 100):
                letterGrade += 'A'
            # If they give a valid number but it falls outside of 0-100 give a warning
            else:
                letterGrade = warning
        return letterGrade


numberGrade = input("What is the number grade for your assignment? ")
grader = Grader()
print(grader.getLetterGrade(numberGrade))
