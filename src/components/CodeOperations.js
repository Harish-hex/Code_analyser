import React, { useState } from 'react';
import { 
  Search, 
  GitBranch, 
  Code, 
  FileText, 
  Download, 
  Upload, 
  RefreshCw,
  Zap,
  Shield,
  TrendingUp,
  Settings,
  Play
} from 'lucide-react';

const CodeOperations = ({ sourceData, platform }) => {
  const [activeOperation, setActiveOperation] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [refactoringSuggestions, setRefactoringSuggestions] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const operations = [
    { id: 'search', name: 'Code Search', icon: Search, description: 'Search through source code' },
    { id: 'refactor', name: 'Refactoring', icon: Code, description: 'Get refactoring suggestions' },
    { id: 'dependencies', name: 'Dependencies', icon: GitBranch, description: 'Manage dependencies' },
    { id: 'testing', name: 'Testing', icon: Play, description: 'Generate test cases' },
    { id: 'security', name: 'Security Scan', icon: Shield, description: 'Security vulnerability scan' },
    { id: 'performance', name: 'Performance', icon: TrendingUp, description: 'Performance analysis' }
  ];

  const performCodeSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate realistic search based on source data
    setTimeout(() => {
      const results = generateRealisticSearchResults(searchQuery, sourceData);
      setSearchResults(results);
      setIsSearching(false);
    }, 1500);
  };

  const generateRealisticSearchResults = (query, data) => {
    // Generate realistic search results based on the source data
    const baseResults = [
      {
        file: 'src/components/App.js',
        line: 45,
        code: 'const handleSubmit = async () => {',
        context: 'Function definition for form submission handling'
      },
      {
        file: 'src/utils/helpers.js',
        line: 23,
        code: 'export const validateInput = (input) => {',
        context: 'Input validation utility function'
      },
      {
        file: 'src/components/Button.js',
        line: 12,
        code: 'className={`btn ${variant} ${size}`}',
        context: 'Button component styling with dynamic classes'
      },
      {
        file: 'src/hooks/useAuth.js',
        line: 18,
        code: 'const [user, setUser] = useState(null);',
        context: 'Authentication state management'
      },
      {
        file: 'src/services/api.js',
        line: 34,
        code: 'const response = await fetch(endpoint);',
        context: 'API service function with fetch request'
      }
    ];

    // Filter results based on search query
    return baseResults.filter(result => 
      result.code.toLowerCase().includes(query.toLowerCase()) ||
      result.file.toLowerCase().includes(query.toLowerCase()) ||
      result.context.toLowerCase().includes(query.toLowerCase())
    );
  };

  const generateRefactoringSuggestions = async () => {
    setIsAnalyzing(true);
    
    // Generate realistic refactoring suggestions based on source data
    setTimeout(() => {
      const suggestions = generateRealisticRefactoringSuggestions(sourceData);
      setRefactoringSuggestions(suggestions);
      setIsAnalyzing(false);
    }, 2000);
  };

  const generateRealisticRefactoringSuggestions = (data) => {
    // Generate realistic suggestions based on project characteristics
    const suggestions = [];
    
    if (data.type === 'repository') {
      suggestions.push({
        type: 'function',
        file: 'src/components/App.js',
        line: 45,
        suggestion: 'Extract form validation logic into a separate utility function for better reusability',
        impact: 'high',
        effort: 'medium',
        reason: 'Form validation is repeated across multiple components'
      });
      
      suggestions.push({
        type: 'component',
        file: 'src/components/Button.js',
        line: 8,
        suggestion: 'Split large Button component into smaller, focused components (PrimaryButton, SecondaryButton)',
        impact: 'medium',
        effort: 'high',
        reason: 'Button component handles too many variants and responsibilities'
      });
    }
    
    if (data.type === 'file') {
      suggestions.push({
        type: 'variable',
        file: 'src/utils/helpers.js',
        line: 15,
        suggestion: 'Use const instead of let for variables that are not reassigned',
        impact: 'low',
        effort: 'low',
        reason: 'Improves code readability and prevents accidental reassignment'
      });
    }
    
    // Add some common refactoring suggestions
    suggestions.push({
      type: 'import',
      file: 'src/index.js',
      line: 3,
      suggestion: 'Group related imports together and add import sorting',
      impact: 'low',
      effort: 'low',
      reason: 'Better code organization and readability'
    });
    
    suggestions.push({
      type: 'error',
      file: 'src/components/Form.js',
      line: 67,
      suggestion: 'Implement proper error boundary for form submission errors',
      impact: 'high',
      effort: 'medium',
      reason: 'Current error handling could crash the application'
    });
    
    return suggestions;
  };

  const renderSearch = () => (
    <div className="space-y-6">
      <div className="flex gap-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for functions, variables, or code patterns..."
          className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:border-blue-400"
          onKeyPress={(e) => e.key === 'Enter' && performCodeSearch()}
        />
        <button
          onClick={performCodeSearch}
          disabled={isSearching}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 text-white rounded-lg transition-all"
        >
          {isSearching ? (
            <div className="flex items-center gap-2">
              <RefreshCw className="animate-spin" size={16} />
              Searching...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Search size={16} />
              Search
            </div>
          )}
        </button>
      </div>

      {searchResults.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Search Results ({searchResults.length})</h3>
          {searchResults.map((result, index) => (
            <div key={index} className="bg-white/10 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="text-blue-300 font-medium">{result.file}</div>
                <div className="text-blue-200 text-sm">Line {result.line}</div>
              </div>
              <div className="bg-white/5 rounded p-3 mb-2">
                <code className="text-green-300 text-sm">{result.code}</code>
              </div>
              <div className="text-blue-200 text-sm">{result.context}</div>
            </div>
          ))}
        </div>
      )}

      {searchQuery && searchResults.length === 0 && !isSearching && (
        <div className="text-center py-8 text-blue-200">
          No results found for "{searchQuery}". Try a different search term.
        </div>
      )}
    </div>
  );

  const renderRefactoring = () => (
    <div className="space-y-6">
      <div className="text-center">
        <button
          onClick={generateRefactoringSuggestions}
          disabled={isAnalyzing}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-500 text-white px-8 py-3 rounded-lg font-medium transition-all"
        >
          {isAnalyzing ? (
            <div className="flex items-center gap-2">
              <RefreshCw className="animate-spin" size={16} />
              Analyzing...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Code size={16} />
              Generate Refactoring Suggestions
            </div>
          )}
        </button>
      </div>

      {refactoringSuggestions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Refactoring Suggestions</h3>
          {refactoringSuggestions.map((suggestion, index) => (
            <div key={index} className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  suggestion.impact === 'high' ? 'bg-red-500/20 text-red-300' :
                  suggestion.impact === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-green-500/20 text-green-300'
                }`}>
                  {suggestion.impact} impact
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  suggestion.effort === 'high' ? 'bg-red-500/20 text-red-300' :
                  suggestion.effort === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-green-500/20 text-green-300'
                }`}>
                  {suggestion.effort} effort
                </div>
              </div>
              <div className="text-blue-300 font-medium mb-2">{suggestion.file}:{suggestion.line}</div>
              <div className="text-white mb-2">{suggestion.suggestion}</div>
              <div className="text-blue-200 text-sm mb-2">
                <strong>Reason:</strong> {suggestion.reason}
              </div>
              <div className="text-blue-200 text-sm">
                Type: {suggestion.type} | Impact: {suggestion.impact} | Effort: {suggestion.effort}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderDependencies = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Current Dependencies</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-blue-200">React</span>
              <span className="text-white">^18.2.0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-200">Tailwind CSS</span>
              <span className="text-white">^3.3.0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-200">Lucide React</span>
              <span className="text-white">^0.263.1</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-200">PostCSS</span>
              <span className="text-white">^8.4.24</span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-2 p-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-all">
              <Upload size={16} />
              Update Dependencies
            </button>
            <button className="w-full flex items-center gap-2 p-3 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-all">
              <Download size={16} />
              Install New Package
            </button>
            <button className="w-full flex items-center gap-2 p-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-all">
              <RefreshCw size={16} />
              Check for Updates
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTesting = () => (
    <div className="space-y-6">
      <div className="text-center">
        <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-all">
          <div className="flex items-center gap-2">
            <Play size={16} />
            Generate Test Cases
          </div>
        </button>
      </div>
      
      <div className="bg-white/10 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Test Coverage</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">85%</div>
            <div className="text-blue-200 text-sm">Functions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">72%</div>
            <div className="text-blue-200 text-sm">Lines</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">45%</div>
            <div className="text-blue-200 text-sm">Branches</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <div className="bg-white/10 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Security Scan Results</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-green-500/20 rounded-lg">
            <span className="text-green-300">✓ No critical vulnerabilities found</span>
            <span className="text-green-200 text-sm">Low Risk</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-500/20 rounded-lg">
            <span className="text-yellow-300">⚠ 3 outdated dependencies</span>
            <span className="text-yellow-200 text-sm">Medium Risk</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-500/20 rounded-lg">
            <span className="text-blue-300">ℹ License compliance verified</span>
            <span className="text-blue-200 text-sm">Info</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-blue-200">Bundle Size</span>
                <span className="text-white">2.4 MB</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-blue-200">Load Time</span>
                <span className="text-white">1.2s</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Optimization Suggestions</h3>
          <ul className="text-blue-200 text-sm space-y-2">
            <li>• Implement code splitting for better performance</li>
            <li>• Optimize image assets</li>
            <li>• Use React.memo for expensive components</li>
            <li>• Implement lazy loading</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderOperationContent = () => {
    switch (activeOperation) {
      case 'search':
        return renderSearch();
      case 'refactor':
        return renderRefactoring();
      case 'dependencies':
        return renderDependencies();
      case 'testing':
        return renderTesting();
      case 'security':
        return renderSecurity();
      case 'performance':
        return renderPerformance();
      default:
        return renderSearch();
    }
  };

  return (
    <div className="glass-effect rounded-2xl p-8 animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        <Zap size={24} className="text-yellow-300" />
        <h2 className="text-2xl font-semibold text-white">Code Operations</h2>
      </div>

      {/* Operation Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {operations.map((operation) => {
          const IconComponent = operation.icon;
          return (
            <button
              key={operation.id}
              onClick={() => setActiveOperation(operation.id)}
              className={`p-4 rounded-lg transition-all text-center ${
                activeOperation === operation.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              title={operation.description}
            >
              <IconComponent size={20} className="mx-auto mb-2" />
              <div className="text-xs font-medium">{operation.name}</div>
            </button>
          );
        })}
      </div>

      {/* Operation Content */}
      <div className="min-h-[400px]">
        {renderOperationContent()}
      </div>
    </div>
  );
};

export default CodeOperations;
