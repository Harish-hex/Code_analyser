import React, { useState } from 'react';
import { Link as LinkIcon, ExternalLink } from 'lucide-react';

const RepositoryInput = ({ value, onChange, platform }) => {
  const [isValid, setIsValid] = useState(true);

  const getPlatformExamples = (platformId) => {
    const examples = {
      github: 'https://github.com/username/repository',
      gitlab: 'https://gitlab.com/username/repository',
      bitbucket: 'https://bitbucket.org/username/repository',
      sourceforge: 'https://sourceforge.net/projects/project-name/',
      'apache-svn': 'https://svn.apache.org/repos/asf/project-name/'
    };
    return examples[platformId] || examples.github;
  };

  const validateUrl = (url) => {
    if (!url.trim()) return true;
    
    const platformPatterns = {
      github: /^https:\/\/github\.com\/[^\/]+\/[^\/]+/,
      gitlab: /^https:\/\/gitlab\.com\/[^\/]+\/[^\/]+/,
      bitbucket: /^https:\/\/bitbucket\.org\/[^\/]+\/[^\/]+/,
      sourceforge: /^https:\/\/sourceforge\.net\/projects\/[^\/]+/,
      'apache-svn': /^https:\/\/svn\.apache\.org\/repos\/asf\/[^\/]+/
    };
    
    const pattern = platformPatterns[platform.id];
    return pattern ? pattern.test(url) : true;
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
    setIsValid(validateUrl(newValue));
  };

  const handlePaste = (e) => {
    const pastedText = e.clipboardData.getData('text');
    if (pastedText && validateUrl(pastedText)) {
      setIsValid(true);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 text-blue-100 mb-2">
          <LinkIcon size={20} />
          <span className="font-medium">Repository URL</span>
        </div>
        <p className="text-sm text-blue-200">
          Paste the repository link from {platform.name}
        </p>
      </div>

      <div className="relative">
        <input
          type="url"
          value={value}
          onChange={handleInputChange}
          onPaste={handlePaste}
          placeholder={getPlatformExamples(platform.id)}
          className={`w-full px-4 py-3 bg-white/20 border-2 rounded-lg text-white placeholder-blue-200 transition-all ${
            isValid 
              ? 'border-white/30 focus:border-primary-400' 
              : 'border-red-400 focus:border-red-500'
          } focus:outline-none focus:ring-2 focus:ring-primary-400/50`}
        />
        {value && (
          <button
            onClick={() => window.open(value, '_blank')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-200 hover:text-white transition-colors"
            title="Open in new tab"
          >
            <ExternalLink size={18} />
          </button>
        )}
      </div>

      {!isValid && value && (
        <div className="bg-red-500/20 border border-red-400 rounded-lg p-3">
          <p className="text-red-200 text-sm">
            Please enter a valid {platform.name} repository URL
          </p>
        </div>
      )}

      <div className="bg-white/10 rounded-lg p-4">
        <h4 className="font-medium text-white mb-2">Example format:</h4>
        <code className="text-blue-200 text-sm break-all">
          {getPlatformExamples(platform.id)}
        </code>
      </div>
    </div>
  );
};

export default RepositoryInput;
