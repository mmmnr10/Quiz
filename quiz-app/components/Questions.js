import { useTrivia } from '../context/QuizContext';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader } from './ui/card';

export default function Questions() {
  const { questions, currentQuestionIndex, answerQuestion } = useTrivia();

  if (!questions.length)
    return <p className='text-center text-gray-600'>No questions available.</p>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className='flex items-center justify-center'>
      <Card className='flex flex-col items-center text-center'>
        <CardHeader className='text-2xl font-bold'>
          {currentQuestion.question}
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 gap-4 w-full'>
            {currentQuestion.incorrect_answers
              .concat(currentQuestion.correct_answer)
              .sort()
              .map((answer) => (
                <Button
                  key={answer}
                  onClick={() => answerQuestion(answer)}
                  className='min-w-40'
                >
                  {answer}
                </Button>
              ))}
          </div>
          <CardDescription className='mt-5'>
            Question: {currentQuestionIndex + 1} of {questions.length}
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
