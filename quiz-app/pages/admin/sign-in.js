'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../hooks/use-toast';

const SignIn = () => {
  const [password, setPassword] = useState(''),
    router = useRouter(),
    { toast } = useToast();

  const handleLogin = () => {
    if (password === 'admin123') {
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/admin');
      location.reload();
    } else {
      toast({
        description: 'Invalid Password',
      });
    }
  };

  return (
    <main className='flex flex-col items-center justify-center '>
      <h1 className='h2-bold text-3xl font-bold mb-6'>Admin Login</h1>
      <Input
        type='password'
        className='p-2 border border-gray-600 rounded-md w-80'
        placeholder='Enter Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        onClick={handleLogin}
        className='mt-4 px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600'
      >
        Login
      </Button>
    </main>
  );
};
export default SignIn;
