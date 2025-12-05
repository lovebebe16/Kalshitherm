import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const CodeBlock = ({ code, language = 'bash' }: { code: string; language?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="bg-gray-950 border border-gray-800 rounded-lg p-4 overflow-x-auto">
        <code className="text-sm text-gray-300 font-mono">{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-gray-400" />
        )}
      </button>
    </div>
  );
};

export const Installation = () => {
  return (
    <div className="prose prose-invert max-w-none">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link to="/docs" className="hover:text-white">Docs</Link>
        <span>/</span>
        <Link to="/docs/getting-started/quick-start" className="hover:text-white">Getting Started</Link>
        <span>/</span>
        <span className="text-white">Installation</span>
      </nav>

      <h1 className="text-3xl font-bold text-white mb-4">Installation Guide</h1>
      <p className="text-gray-300 text-lg mb-8">
        Complete guide to setting up Kalshitherm for local development. This includes
        installing dependencies, configuring environment variables, and running the development server.
      </p>

      {/* Requirements */}
      <h2 className="text-2xl font-semibold text-white mb-4">System Requirements</h2>
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden mb-8">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-gray-400 font-medium px-6 py-3">Requirement</th>
              <th className="text-left text-gray-400 font-medium px-6 py-3">Minimum Version</th>
              <th className="text-left text-gray-400 font-medium px-6 py-3">Recommended</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-800/50">
              <td className="px-6 py-3 text-white">Node.js</td>
              <td className="px-6 py-3 text-gray-300">18.0.0</td>
              <td className="px-6 py-3 text-green-400">20.x LTS</td>
            </tr>
            <tr className="border-b border-gray-800/50">
              <td className="px-6 py-3 text-white">pnpm</td>
              <td className="px-6 py-3 text-gray-300">8.0.0</td>
              <td className="px-6 py-3 text-green-400">9.x</td>
            </tr>
            <tr className="border-b border-gray-800/50">
              <td className="px-6 py-3 text-white">Git</td>
              <td className="px-6 py-3 text-gray-300">2.30.0</td>
              <td className="px-6 py-3 text-green-400">Latest</td>
            </tr>
            <tr>
              <td className="px-6 py-3 text-white">Operating System</td>
              <td className="px-6 py-3 text-gray-300">Windows 10, macOS 10.15, Ubuntu 20.04</td>
              <td className="px-6 py-3 text-green-400">Latest stable</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Quick Install */}
      <h2 className="text-2xl font-semibold text-white mb-4">Quick Installation</h2>
      <p className="text-gray-300 mb-4">
        Run these commands to get Kalshitherm running locally:
      </p>

      <CodeBlock code={`# Clone the repository
git clone https://github.com/kalshitherm/kalshitherm.git
cd kalshitherm

# Install dependencies
pnpm install

# Start development server
pnpm dev`} />

      <p className="text-gray-300 mt-4 mb-8">
        The development server will start at <code className="text-blue-400">http://localhost:5173</code>
      </p>

      {/* Detailed Steps */}
      <h2 className="text-2xl font-semibold text-white mb-4">Detailed Installation Steps</h2>

      <h3 className="text-xl font-semibold text-white mb-3">1. Install Node.js</h3>
      <p className="text-gray-300 mb-4">
        We recommend using Node Version Manager (nvm) to install and manage Node.js versions:
      </p>

      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-400 mb-2">macOS / Linux:</h4>
        <CodeBlock code={`# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install Node.js 20 LTS
nvm install 20
nvm use 20

# Verify installation
node --version`} />
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-400 mb-2">Windows:</h4>
        <CodeBlock code={`# Using winget (Windows Package Manager)
winget install OpenJS.NodeJS.LTS

# Or download from nodejs.org
# https://nodejs.org/en/download/`} />
      </div>

      <h3 className="text-xl font-semibold text-white mb-3">2. Install pnpm</h3>
      <p className="text-gray-300 mb-4">
        pnpm is a fast, disk space efficient package manager:
      </p>
      <CodeBlock code={`# Install pnpm globally
npm install -g pnpm

# Verify installation
pnpm --version`} />

      <h3 className="text-xl font-semibold text-white mt-6 mb-3">3. Clone and Setup</h3>
      <p className="text-gray-300 mb-4">
        Clone the repository and install all dependencies:
      </p>
      <CodeBlock code={`# Clone the repository
git clone https://github.com/kalshitherm/kalshitherm.git

# Navigate to project directory
cd kalshitherm

# Install all dependencies
pnpm install`} />

      <h3 className="text-xl font-semibold text-white mt-6 mb-3">4. Environment Configuration</h3>
      <p className="text-gray-300 mb-4">
        Create a <code className="text-blue-400">.env</code> file in the project root with the following variables:
      </p>
      <CodeBlock code={`# Solana RPC Configuration
VITE_SOLANA_RPC_ENDPOINT=https://api.mainnet-beta.solana.com
VITE_SOLANA_DEVNET_RPC=https://api.devnet.solana.com

# Network Selection (mainnet-beta or devnet)
VITE_NETWORK=devnet

# Optional: Supabase Configuration (for backend features)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key`} />

      <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 my-6">
        <p className="text-blue-300 text-sm mb-0">
          <strong>Note:</strong> For development, we recommend using <code className="text-blue-400">devnet</code> to avoid
          spending real SOL. Weather data from Open-Meteo API works without any API key.
        </p>
      </div>

      <h3 className="text-xl font-semibold text-white mt-6 mb-3">5. Start Development Server</h3>
      <p className="text-gray-300 mb-4">
        Run the development server with hot module replacement:
      </p>
      <CodeBlock code={`# Start development server
pnpm dev

# Or use the convenience script
./scripts/dev.sh`} />

      <h3 className="text-xl font-semibold text-white mt-6 mb-3">6. Build for Production</h3>
      <p className="text-gray-300 mb-4">
        Create an optimized production build:
      </p>
      <CodeBlock code={`# Build for production
pnpm build

# Preview production build locally
pnpm preview`} />

      {/* Available Scripts */}
      <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Available Scripts</h2>
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden mb-8">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-gray-400 font-medium px-6 py-3">Command</th>
              <th className="text-left text-gray-400 font-medium px-6 py-3">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-800/50">
              <td className="px-6 py-3"><code className="text-blue-400">pnpm dev</code></td>
              <td className="px-6 py-3 text-gray-300">Start development server with HMR</td>
            </tr>
            <tr className="border-b border-gray-800/50">
              <td className="px-6 py-3"><code className="text-blue-400">pnpm build</code></td>
              <td className="px-6 py-3 text-gray-300">Create production build</td>
            </tr>
            <tr className="border-b border-gray-800/50">
              <td className="px-6 py-3"><code className="text-blue-400">pnpm preview</code></td>
              <td className="px-6 py-3 text-gray-300">Preview production build locally</td>
            </tr>
            <tr className="border-b border-gray-800/50">
              <td className="px-6 py-3"><code className="text-blue-400">pnpm lint</code></td>
              <td className="px-6 py-3 text-gray-300">Run ESLint for code quality</td>
            </tr>
            <tr>
              <td className="px-6 py-3"><code className="text-blue-400">pnpm type-check</code></td>
              <td className="px-6 py-3 text-gray-300">Run TypeScript type checking</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Next Steps */}
      <div className="mt-12 flex items-center justify-between p-6 bg-gray-900 border border-gray-800 rounded-xl">
        <div>
          <h4 className="font-semibold text-white mb-1">Next: First Usage Guide</h4>
          <p className="text-sm text-gray-400">Learn how to use Kalshitherm features</p>
        </div>
        <Link to="/docs/getting-started/first-usage" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Continue
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
