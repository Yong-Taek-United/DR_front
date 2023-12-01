import SignUpForm from '@/components/account/SignUpForm';
import { useRouter } from 'next/router';

export default function SignUp() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-50">
      <div>
        <div className="flex w-full rounded-t-lg bg-gray-100">
          <button
            className="p-3 flex-1 rounded-t-lg font-semibold text-lg text-gray-400"
            onClick={() =>
              router.push({ pathname: '/account/login' }, undefined, {
                shallow: true,
              })
            }
          >
            로그인
          </button>
          <button
            className="bg-white p-3 flex-1 rounded-t-lg font-bold text-lg"
            onClick={() =>
              router.push({ pathname: '/account/signUp' }, undefined, {
                shallow: true,
              })
            }
          >
            회원가입
          </button>
        </div>
        <div className="bg-white px-5 pb-5 pt-4 rounded-b-lg">
          <SignUpForm />
        </div>
      </div>
    </main>
  );
}