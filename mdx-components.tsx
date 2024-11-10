import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="text-xl font-bold mt-6 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-semibold mt-4 mb-2">{children}</h3>
    ),
    table: props => (
      <div className="overflow-x-auto my-4">
        <table className="min-w-full table-auto border-collapse border border-gray-300" {...props} />
      </div>
    ),
    thead: props => (
      <thead className="bg-gray-50" {...props} />
    ),
    tbody: props => (
      <tbody className="divide-y divide-gray-200" {...props} />
    ),
    tr: props => (
      <tr className="hover:bg-gray-50" {...props} />
    ),
    th: props => (
      <th className="px-4 py-3 border border-gray-300 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...props} />
    ),
    td: props => (
      <td className="px-4 py-3 border border-gray-300 text-sm text-gray-500 whitespace-normal" {...props} />
    ),
    ul: props => (
      <ul className="my-4 space-y-2" {...props} />
    ),
    li: props => (
      <li className="text-gray-600" {...props} />
    ),
    p: props => (
      <p className="my-4 text-gray-600" {...props} />
    ),
    ...components,
  }
} 