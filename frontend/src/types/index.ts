export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  avatar: string;
  total_xp: number;
  created_at?: string;
}

export interface ApiResponse<T> {
  message: string;
  code: number;
  data: T;
  errors: Record<string, string[]> | null;
}

export interface LearningPath {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon?: string;
  level: string;
  estimated_hours?: number;
  total_modules?: number;
  total_lessons?: number;
  is_enrolled?: boolean;
  progress_percentage?: number;
  modules?: Module[];
}

export interface Module {
  id: number;
  learning_path_id: number;
  title: string;
  slug: string;
  description: string;
  order: number;
  is_locked?: boolean;
  total_lessons?: number;
  completed_lessons?: number;
  lessons?: Lesson[];
}

export interface LessonReference {
  id: number;
  title: string;
  url: string;
}

export interface Lesson {
  id: number;
  module_id: number;
  title: string;
  slug: string;
  order: number;
  explanation: string;
  code_example: string;
  output_example?: string;
  key_points?: string[];
  tips?: string[];
  common_mistakes?: string[];
  xp_reward: number;
  is_completed?: boolean;
  module?: Module;
  references?: LessonReference[];
}

export interface QuizQuestionOption {
  id: number;
  option_text: string;
  order: number;
  // Note: is_correct is intentionally excluded from API response for students
}

export interface TestCase {
  id: number;
  input: string;
  expected_output: string;
  is_hidden: boolean;
}

export interface QuizQuestion {
  id: number;
  quiz_id: number;
  type: 'theory' | 'code_writing' | 'code_completion';
  question_text: string;
  order: number;
  explanation?: string;
  starter_code?: string;
  options?: QuizQuestionOption[];
  test_cases?: TestCase[];
}

export interface Quiz {
  id: number;
  module_id: number;
  title: string;
  passing_score: number;
  total_xp_reward: number;
  questions: QuizQuestion[];
}

export interface QuizAttempt {
  id: number;
  quiz_id: number;
  user_id: number;
  score: number;
  passed: boolean;
  xp_earned: number;
  completed_at: string;
}

export interface CodeExecutionResult {
  stdout: string;
  stderr: string;
  exit_code: number;
  passed_test_cases?: number;
  total_test_cases?: number;
  test_results?: {
    input: string;
    expected: string;
    actual: string;
    passed: boolean;
  }[];
}

export interface Community {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  members_count: number;
  is_member?: boolean;
}

export interface CommunityMessage {
  id: number;
  community_id: number;
  user_id: number;
  content: string;
  created_at: string;
  user: User;
}

export interface Note {
  id: number;
  user_id: number;
  lesson_id?: number;
  title: string;
  content: string;
  created_at: string;
  lesson?: {
    id: number;
    title: string;
    slug: string;
  };
}

export interface LeaderboardEntry {
  rank: number;
  user_id: number;
  name: string;
  username: string;
  avatar: string;
  total_xp: number;
}
