import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { PythonCodeEditor } from '../../components/editor/PythonCodeEditor';
import { quizApi } from '../../api/quiz';
import { Quiz, QuizQuestion, QuizAttempt } from '../../types';
import {
  ClipboardList,
  CheckCircle2,
  XCircle,
  Award,
  Zap,
  ArrowRight,
  Loader2,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';

export const QuizPage: React.FC = () => {
  const { moduleSlug } = useParams<{ moduleSlug: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ is_correct: boolean; explanation?: string } | null>(null);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!moduleSlug) return;
      try {
        const quizRes = await quizApi.getModuleQuiz(moduleSlug);
        setQuiz(quizRes.data.quiz);

        if (quizRes.data.quiz) {
          const attemptRes = await quizApi.startAttempt(quizRes.data.quiz.id);
          setAttempt(attemptRes.data.attempt);
        }
      } catch (err) {
        console.error('Failed to load quiz:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuiz();
  }, [moduleSlug]);

  const currentQuestion: QuizQuestion | undefined = quiz?.questions?.[currentQuestionIndex];

  const handleSubmitAnswer = async (answerValue: number | string) => {
    if (!quiz || !attempt || !currentQuestion || isSubmitting) return;
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const res = await quizApi.submitAnswer(
        quiz.id,
        attempt.id,
        currentQuestion.id,
        answerValue
      );
      setFeedback(res.data);
    } catch (err) {
      console.error('Failed to submit answer:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextQuestion = () => {
    setFeedback(null);
    setSelectedOption(null);
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-indigo-600" />
        </div>
      </AppLayout>
    );
  }

  if (!quiz) {
    return (
      <AppLayout>
        <div className="text-center py-20 space-y-4">
          <h2 className="font-sans font-bold text-xl text-slate-800">Kuis Tidak Ditemukan</h2>
          <Link to="/learning-paths" className="text-indigo-600 text-xs font-semibold hover:underline">
            Kembali ke Alur Belajar
          </Link>
        </div>
      </AppLayout>
    );
  }

  if (isQuizFinished) {
    return (
      <AppLayout>
        <div className="max-w-xl mx-auto py-12 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto shadow-md">
            <Award size={40} />
          </div>

          <div className="space-y-2">
            <h1 className="font-sans font-extrabold text-3xl text-slate-900">
              Kuis Selesai! 🎉
            </h1>
            <p className="text-sm text-slate-600">
              Selamat! Kamu telah menyelesaikan evaluasi kuis modul ini.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex items-center justify-around">
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase block">Passing Score</span>
              <span className="font-mono text-xl font-bold text-slate-800">{quiz.passing_score}%</span>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div>
              <span className="text-xs text-purple-600 font-semibold uppercase block flex items-center gap-1">
                <Zap size={13} className="fill-purple-600" /> Bonus XP
              </span>
              <span className="font-mono text-xl font-bold text-purple-700">+{quiz.total_xp_reward} XP</span>
            </div>
          </div>

          <Link
            to="/learning-paths"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-bold text-sm rounded-xl transition-all shadow-md"
          >
            <span>Kembali ke Modul</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Quiz Progress Header */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <ClipboardList size={20} />
            </div>
            <div>
              <h2 className="font-sans font-bold text-base text-slate-900">{quiz.title}</h2>
              <span className="text-xs text-slate-500 font-medium">
                Soal {currentQuestionIndex + 1} dari {quiz.questions.length}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-100">
            <Zap size={14} className="fill-purple-600" />
            <span>+{quiz.total_xp_reward} XP</span>
          </div>
        </div>

        {/* Current Question Card */}
        {currentQuestion && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="space-y-2">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 font-semibold text-xs rounded-full border border-indigo-100">
                {currentQuestion.type === 'theory' ? 'Pilihan Ganda' : 'Ketik Kode Python'}
              </span>
              <h3 className="font-sans font-bold text-lg sm:text-xl text-slate-900 leading-snug">
                {currentQuestion.question_text}
              </h3>
            </div>

            {/* Theory Multiple Choice Options */}
            {currentQuestion.type === 'theory' && currentQuestion.options && (
              <div className="space-y-3">
                {currentQuestion.options.map((opt) => {
                  const isSelected = selectedOption === opt.order;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setSelectedOption(opt.order);
                        handleSubmitAnswer(opt.order);
                      }}
                      disabled={isSubmitting || !!feedback}
                      className={`w-full text-left p-4 rounded-2xl border text-sm font-medium transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold'
                          : 'border-slate-200 hover:border-indigo-200 bg-white text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-mono text-xs flex items-center justify-center font-bold">
                          {String.fromCharCode(65 + (opt.order - 1))}
                        </span>
                        <span>{opt.option_text}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Code Writing Quiz Component */}
            {currentQuestion.type === 'code_writing' && (
              <div className="space-y-4">
                <PythonCodeEditor
                  initialCode={currentQuestion.starter_code || '# Tulis solusi kode Python kamu di sini\n'}
                  questionId={currentQuestion.id}
                  onSuccess={() => {
                    handleSubmitAnswer('CODE_SUBMITTED');
                  }}
                />
              </div>
            )}

            {/* Instant Feedback View */}
            {feedback && (
              <div
                className={`p-5 rounded-2xl border space-y-2 ${
                  feedback.is_correct
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-red-50 border-red-200 text-red-900'
                }`}
              >
                <div className="flex items-center gap-2 font-sans font-bold text-sm">
                  {feedback.is_correct ? (
                    <>
                      <CheckCircle2 size={18} className="text-emerald-600" />
                      <span>Jawaban Tepat!</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={18} className="text-red-600" />
                      <span>Jawaban Belum Tepat</span>
                    </>
                  )}
                </div>
                {feedback.explanation && (
                  <p className="text-xs leading-relaxed opacity-90">{feedback.explanation}</p>
                )}

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-sans font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <span>Lanjut ke Soal Berikutnya</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
};
