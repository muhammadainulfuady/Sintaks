import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, CheckCircle, XCircle, Terminal, Loader2 } from 'lucide-react';
import { quizApi } from '../../api/quiz';
import { CodeExecutionResult } from '../../types';

interface PythonCodeEditorProps {
  initialCode?: string;
  questionId?: number;
  onSuccess?: () => void;
}

export const PythonCodeEditor: React.FC<PythonCodeEditorProps> = ({
  initialCode = '# Tulis kode Python kamu di sini\nprint("Hello, Sintaks!")\n',
  questionId,
  onSuccess,
}) => {
  const [code, setCode] = useState(initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<CodeExecutionResult | null>(null);

  const handleRun = async () => {
    setIsRunning(true);
    setResult(null);
    try {
      const res = await quizApi.runCode(code, questionId);
      setResult(res.data);
      if (res.data.exit_code === 0 && res.data.passed_test_cases === res.data.total_test_cases) {
        if (onSuccess) onSuccess();
      }
    } catch (err: any) {
      setResult({
        stdout: '',
        stderr: err.response?.data?.message || 'Gagal mengeksekusi kode.',
        exit_code: 1,
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    setResult(null);
  };

  return (
    <div className="border border-slate-700 bg-slate-900 rounded-xl overflow-hidden shadow-md font-mono text-xs">
      {/* Editor Header Bar */}
      <div className="px-4 py-2.5 bg-slate-800/90 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-300 font-sans font-medium text-xs">
          <Terminal size={15} className="text-indigo-400" />
          <span>main.py</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            disabled={isRunning}
            className="px-2.5 py-1 text-slate-400 hover:text-slate-200 hover:bg-slate-700/60 rounded-md transition-colors flex items-center gap-1.5 text-xs font-sans"
            title="Reset Kode"
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md font-sans font-semibold transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50 text-xs"
          >
            {isRunning ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                <span>Menjalankan...</span>
              </>
            ) : (
              <>
                <Play size={13} className="fill-white" />
                <span>Jalankan Kode</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Monaco Code Editor */}
      <div className="h-64">
        <Editor
          height="100%"
          defaultLanguage="python"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || '')}
          options={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            lineHeight: 20,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 12, bottom: 12 },
          }}
        />
      </div>

      {/* Output Console Box */}
      {result && (
        <div className="border-t border-slate-800 bg-slate-950 p-4 font-mono text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 font-sans text-xs font-semibold uppercase tracking-wider">
              Output Konsol
            </span>
            {result.exit_code === 0 ? (
              <span className="text-emerald-400 flex items-center gap-1 font-sans text-xs">
                <CheckCircle size={14} /> Berhasil (Exit Code 0)
              </span>
            ) : (
              <span className="text-red-400 flex items-center gap-1 font-sans text-xs">
                <XCircle size={14} /> Error (Exit Code {result.exit_code})
              </span>
            )}
          </div>

          {/* Test cases summary if present */}
          {result.total_test_cases !== undefined && (
            <div className="mb-3 p-2.5 rounded bg-slate-900 border border-slate-800 font-sans text-xs flex items-center justify-between">
              <span className="text-slate-300">
                Test Cases Lulus:{' '}
                <strong className={result.passed_test_cases === result.total_test_cases ? 'text-emerald-400' : 'text-amber-400'}>
                  {result.passed_test_cases} / {result.total_test_cases}
                </strong>
              </span>
            </div>
          )}

          {/* stdout */}
          {result.stdout && (
            <pre className="text-emerald-300 bg-slate-900/80 p-3 rounded border border-slate-800 overflow-x-auto whitespace-pre-wrap">
              {result.stdout}
            </pre>
          )}

          {/* stderr */}
          {result.stderr && (
            <pre className="text-red-400 bg-red-950/40 p-3 rounded border border-red-900/50 overflow-x-auto whitespace-pre-wrap mt-2">
              {result.stderr}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};
