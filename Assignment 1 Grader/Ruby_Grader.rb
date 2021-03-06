class Grader
	def initialize(studentName, assignmentName)
		@studentName = studentName
		@assignmentName = assignmentName
	end

	def getLetterGrade(numberGrade)
		# Variable to use for the letter grade
		letterGrade = "#{@studentName}'s letter grade for #{@assignmentName} is: "
		# Variable for the warning since it is used several times
		warning = 'Please enter a valid number between 0 and 100.'
		# Check if the input grade can be parsed into an integer, if not give a warning, if so parse it
		# and give the letter grade corresponding to the number.
		if !Float(numberGrade)
			letterGrade = warning
		else
				# Parse the number grade into an integer
				parsedGrade = numberGrade.to_f
				if (parsedGrade < 0)
						letterGrade = warning
				elsif (parsedGrade < 60)
						letterGrade += 'F'
				elsif (parsedGrade < 70)
						letterGrade += 'D'
				elsif (parsedGrade < 80)
						letterGrade += 'C'
				elsif (parsedGrade < 90)
						letterGrade += 'B'
				elsif (parsedGrade <= 100)
						letterGrade += 'A'
				# If they give a valid number but it falls outside of 0-100 give a warning
				else
						letterGrade = warning
				end
		end rescue letterGrade = warning
		return letterGrade
	end
end

puts "What is the student's name? "
studentName = gets.chomp

puts "What is the assignment name? "
assignmentName = gets.chomp

puts "What is the number grade for your assignment? "
numberGrade = gets.chomp

grader = Grader.new(studentName, assignmentName)
puts grader.getLetterGrade(numberGrade)
