import React, { useState } from 'react';
import { 
  Github, 
  Gitlab, 
  FolderOpen, 
  Upload, 
  Link as LinkIcon, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';
import PlatformSelector from './components/PlatformSelector';
import RepositoryInput from './components/RepositoryInput';
import FileUpload from './components/FileUpload';
import SourceCodeAnalyzer from './components/SourceCodeAnalyzer';
import CodeOperations from './components/CodeOperations';
import './App.css';

function App() {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [inputMethod, setInputMethod] = useState('link'); // 'link' or 'upload'
  const [repositoryUrl, setRepositoryUrl] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [showAnalyzer, setShowAnalyzer] = useState(false);
  const [showOperations, setShowOperations] = useState(false);
  const [currentStep, setCurrentStep] = useState('collect'); // 'collect', 'analyze', 'operate'

  const platforms = [
    { id: 'github', name: 'GitHub', icon: Github, color: 'bg-gray-800 hover:bg-gray-700' },
    { id: 'gitlab', name: 'GitLab', icon: Gitlab, color: 'bg-orange-600 hover:bg-orange-500' },
    { id: 'bitbucket', name: 'Bitbucket', icon: FolderOpen, color: 'bg-blue-600 hover:bg-blue-500' },
    { id: 'sourceforge', name: 'SourceForge', icon: FolderOpen, color: 'bg-red-600 hover:bg-red-500' },
    { id: 'apache-svn', name: 'Apache SVN', icon: FolderOpen, color: 'bg-purple-600 hover:bg-purple-500' }
  ];

  const handlePlatformSelect = (platform) => {
    setSelectedPlatform(platform);
    setResult(null);
    setShowAnalyzer(false);
    setShowOperations(false);
    setCurrentStep('collect');
  };

  const handleSubmit = async () => {
    if (!selectedPlatform) {
      alert('Please select a platform first');
      return;
    }

    if (inputMethod === 'link' && !repositoryUrl.trim()) {
      alert('Please enter a repository URL');
      return;
    }

    if (inputMethod === 'upload' && !uploadedFile) {
      alert('Please upload a project file');
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setResult({
        success: true,
        message: `Successfully collected source code from ${selectedPlatform.name}`,
        details: {
          platform: selectedPlatform.name,
          method: inputMethod,
          source: inputMethod === 'link' ? repositoryUrl : uploadedFile.name
        }
      });
      setIsProcessing(false);
      setCurrentStep('analyze');
    }, 2000);
  };

  const resetForm = () => {
    setSelectedPlatform(null);
    setInputMethod('link');
    setRepositoryUrl('');
    setUploadedFile(null);
    setResult(null);
    setShowAnalyzer(false);
    setShowOperations(false);
    setCurrentStep('collect');
  };

  const getSourceData = () => {
    if (inputMethod === 'link') {
      return {
        type: 'repository',
        url: repositoryUrl,
        platform: selectedPlatform.id
      };
    } else {
      return {
        type: 'file',
        filename: uploadedFile.name,
        size: uploadedFile.size,
        platform: selectedPlatform.id
      };
    }
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-center mb-4">
        <div className="flex items-center space-x-4">
          <div className={`flex items-center ${currentStep === 'collect' ? 'text-blue-400' : 'text-blue-200'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep === 'collect' ? 'bg-blue-500' : 'bg-white/20'
            }`}>
              1
            </div>
            <span className="ml-2 font-medium">Collect</span>
          </div>
          <div className="w-16 h-0.5 bg-white/20"></div>
          <div className={`flex items-center ${currentStep === 'analyze' ? 'text-blue-400' : 'text-blue-200'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep === 'analyze' ? 'bg-blue-500' : 'bg-white/20'
            }`}>
              2
            </div>
            <span className="ml-2 font-medium">Analyze</span>
          </div>
          <div className="w-16 h-0.5 bg-white/20"></div>
          <div className={`flex items-center ${currentStep === 'operate' ? 'text-blue-400' : 'text-blue-200'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep === 'operate' ? 'bg-blue-500' : 'bg-white/20'
            }`}>
              3
            </div>
            <span className="ml-2 font-medium">Operate</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 animate-fade-in">
            Source Code Collector & Analyzer
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Collect, analyze, and operate on open-source projects from various platforms. 
            Get insights into code quality, security, and dependencies.
          </p>
        </div>

        {/* Progress Bar */}
        {renderProgressBar()}

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* Platform Selection */}
          <div className="glass-effect rounded-2xl p-8 mb-8 animate-slide-up">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">
              Select Open Source Platform
            </h2>
            <PlatformSelector
              platforms={platforms}
              selectedPlatform={selectedPlatform}
              onSelect={handlePlatformSelect}
            />
          </div>

          {/* Input Method Selection */}
          {selectedPlatform && (
            <div className="glass-effect rounded-2xl p-8 mb-8 animate-slide-up">
              <h2 className="text-2xl font-semibold text-white mb-6 text-center">
                Choose Input Method
              </h2>
              <div className="flex gap-4 justify-center mb-6">
                <button
                  onClick={() => setInputMethod('link')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    inputMethod === 'link'
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <LinkIcon size={20} />
                  Repository Link
                </button>
                <button
                  onClick={() => setInputMethod('upload')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    inputMethod === 'upload'
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Upload size={20} />
                  Upload Project
                </button>
              </div>

              {/* Input Fields */}
              {inputMethod === 'link' ? (
                <RepositoryInput
                  value={repositoryUrl}
                  onChange={setRepositoryUrl}
                  platform={selectedPlatform}
                />
              ) : (
                <FileUpload
                  onFileSelect={setUploadedFile}
                  selectedFile={uploadedFile}
                />
              )}
            </div>
          )}

          {/* Submit Button */}
          {selectedPlatform && (repositoryUrl || uploadedFile) && (
            <div className="text-center mb-8 animate-slide-up">
              <button
                onClick={handleSubmit}
                disabled={isProcessing}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 disabled:transform-none"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing...
                  </div>
                ) : (
                  'Collect Source Code'
                )}
              </button>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="glass-effect rounded-2xl p-8 mb-8 animate-slide-up">
              <div className="flex items-center gap-3 mb-4">
                {result.success ? (
                  <CheckCircle className="text-green-400" size={24} />
                ) : (
                  <AlertCircle className="text-red-400" size={24} />
                )}
                <h3 className="text-xl font-semibold text-white">
                  {result.success ? 'Success!' : 'Error'}
                </h3>
              </div>
              <p className="text-blue-100 mb-4">{result.message}</p>
              {result.details && (
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="font-medium text-white mb-2">Details:</h4>
                  <ul className="text-blue-100 space-y-1">
                    <li><strong>Platform:</strong> {result.details.platform}</li>
                    <li><strong>Method:</strong> {result.details.method}</li>
                    <li><strong>Source:</strong> {result.details.source}</li>
                  </ul>
                </div>
              )}
              <div className="flex gap-4 mt-4">
                <button
                  onClick={resetForm}
                  className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg transition-all"
                >
                  Start Over
                </button>
                {result.success && (
                  <>
                    <button
                      onClick={() => {
                        setShowAnalyzer(!showAnalyzer);
                        setShowOperations(false);
                        setCurrentStep(showAnalyzer ? 'collect' : 'analyze');
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all"
                    >
                      {showAnalyzer ? 'Hide Analysis' : 'Analyze Source Code'}
                    </button>
                    <button
                      onClick={() => {
                        setShowOperations(!showOperations);
                        setShowAnalyzer(false);
                        setCurrentStep(showOperations ? 'collect' : 'operate');
                      }}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-all"
                    >
                      {showOperations ? 'Hide Operations' : 'Code Operations'}
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Source Code Analyzer */}
          {showAnalyzer && result && (
            <SourceCodeAnalyzer
              sourceData={getSourceData()}
              platform={selectedPlatform}
            />
          )}

          {/* Code Operations */}
          {showOperations && result && (
            <CodeOperations
              sourceData={getSourceData()}
              platform={selectedPlatform}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
