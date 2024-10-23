import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Printer } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function MessagePreview({ content }) {
  return (
    <div className="w-[380px] bg-white border border-gray-200 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Preview</h3>
        <Printer className="w-5 h-5 text-gray-500" />
      </div>
      <div className="prose prose-sm max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-6 mb-4" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-xl font-bold mt-5 mb-3" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-lg font-bold mt-4 mb-2" {...props} />,
            h4: ({ node, ...props }) => <h4 className="text-base font-bold mt-3 mb-2" {...props} />,
            p: ({ node, ...props }) => <p className="my-3" {...props} />,
            blockquote: ({ node, ...props }) => (
              <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic text-gray-700" {...props} />
            ),
            ul: ({ node, ...props }) => <ul className="list-disc list-inside my-3" {...props} />,
            ol: ({ node, ...props }) => <ol className="list-decimal list-inside my-3" {...props} />,
            li: ({ node, ...props }) => <li className="my-1" {...props} />,
            code: ({ node, inline, className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={vs}
                  language={match[1]}
                  PreTag="div"
                  className="rounded-md text-sm"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className="bg-gray-100 rounded px-1.5 py-0.5 text-sm" {...props}>
                  {children}
                </code>
              );
            },
            table: ({ node, ...props }) => (
              <div className="overflow-x-auto my-4">
                <table className="min-w-full divide-y divide-gray-200" {...props} />
              </div>
            ),
            th: ({ node, ...props }) => (
              <th className="px-3 py-2 bg-gray-50 text-left text-sm font-semibold text-gray-700" {...props} />
            ),
            td: ({ node, ...props }) => (
              <td className="px-3 py-2 text-sm text-gray-500 border-t" {...props} />
            ),
            a: ({ node, ...props }) => (
              <a className="text-blue-600 hover:text-blue-800 hover:underline" {...props} />
            ),
            img: ({ node, ...props }) => (
              <img className="max-w-full h-auto rounded-lg my-4" {...props} />
            ),
            hr: ({ node, ...props }) => <hr className="my-6 border-t border-gray-300" {...props} />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}