'use client';
import { useTrivia } from '../../context/QuizContext';
import { Button } from '../ui/button';
import { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Label } from '../ui/label';

const AdminDashboard = () => {
  const { adminSettings, updateAdminSettings } = useTrivia();
  const [numOfQuestions, setNumOfQuestions] = useState(
    adminSettings.numOfQuestions
  );
  const [questionType, setQuestionType] = useState(adminSettings.questionType);

  useEffect(() => {
    setNumOfQuestions(adminSettings.numOfQuestions);
    setQuestionType(adminSettings.questionType);
  }, [adminSettings]);

  const handleSaveSettings = () => {
    updateAdminSettings({
      numOfQuestions: Number(numOfQuestions),
      questionType,
    });

    alert('Settings updated successfully!');
  };

  return (
    <div className='flex justify-center'>
      <main className='flex flex-col  text-white min-h-screen gap-3 w-56'>
        <h1 className='text-3xl font-bold mb-6'>Admin Settings</h1>
        <div className='mb-4'>
          <Label className='font-medium mb-1'>Number of Questions:</Label>
          <Input
            type='number'
            value={numOfQuestions}
            onChange={(e) => setNumOfQuestions(e.target.value)}
            min='1'
            max='50'
          />
        </div>
        <div className='mb-4'>
          <Label className='font-medium mb-1'>Question Type:</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder='Select Question Type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='multiple'>Multiple Choice</SelectItem>
              <SelectItem value='boolean'>True / False</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleSaveSettings} variant='secondary'>
          Save Settings
        </Button>
        <Button
          variant='destructive'
          onClick={() => {
            localStorage.removeItem('isAuthenticated');
            window.location.href = '/';
          }}
        >
          Sign Out
        </Button>
      </main>
    </div>
  );
};

export default AdminDashboard;
