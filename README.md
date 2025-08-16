# Source Code Collector & Analyzer

A comprehensive web application for collecting, analyzing, and operating on source code from various open-source platforms. Built with React and Tailwind CSS, featuring a beautiful glass-morphism design and powerful analysis tools.

## 🚀 **Complete Workflow**

### 1. **Collect** → 2. **Analyze** → 3. **Operate**

The application provides a complete pipeline for working with open-source code:

## Features

### 🎯 **Platform Support**
- **GitHub** - Repository analysis from GitHub
- **GitLab** - Project analysis from GitLab
- **Bitbucket** - Repository analysis from Bitbucket
- **SourceForge** - Project analysis from SourceForge
- **Apache SVN** - SVN repository analysis

### 📥 **Input Methods**
1. **Repository Link** - Paste repository URLs for direct analysis
2. **File Upload** - Upload project ZIP/RAR files manually
   - Drag & drop support
   - File validation (ZIP/RAR, max 100MB)
   - Real-time file size display

### 🔍 **Source Code Analysis**
- **Overview Dashboard**
  - Total files and lines of code
  - Language distribution with visual charts
  - Contributor count and last update info
  
- **Code Quality Metrics**
  - Complexity analysis (1-10 scale)
  - Maintainability score
  - Test coverage percentage
  - Documentation coverage

- **Security Analysis**
  - Vulnerability detection
  - Dependency security scanning
  - License compliance checking
  - Overall security score

- **Dependency Management**
  - Current package versions
  - Update recommendations
  - Security vulnerability alerts

### ⚡ **Code Operations**
- **Code Search**
  - Full-text search through source code
  - File and line number results
  - Context-aware code snippets

- **Refactoring Suggestions**
  - AI-powered refactoring recommendations
  - Impact and effort assessment
  - File-specific suggestions

- **Dependency Operations**
  - Update existing packages
  - Install new dependencies
  - Check for available updates

- **Testing Tools**
  - Generate test cases
  - Test coverage analysis
  - Testing recommendations

- **Security Scanning**
  - Vulnerability detection
  - Security score calculation
  - Risk assessment

- **Performance Analysis**
  - Bundle size optimization
  - Load time analysis
  - Performance improvement suggestions

### ✨ **User Experience**
- **Modern UI** - Glass-morphism design with smooth animations
- **Progress Tracking** - Visual workflow progress indicator
- **Responsive Design** - Works perfectly on desktop and mobile
- **Real-time Validation** - URL format validation and file type checking
- **Interactive Feedback** - Visual feedback for all user actions
- **Accessibility** - Keyboard navigation and screen reader support

## Screenshots

The application features:
- Beautiful gradient background with glass-effect cards
- Platform selection with platform-specific icons and colors
- Intuitive input method switching
- Drag-and-drop file upload with visual feedback
- Real-time validation and error handling
- Success/error states with detailed information
- **NEW**: Comprehensive analysis dashboard with multiple tabs
- **NEW**: Advanced code operations with search, refactoring, and more
- **NEW**: Progress tracking workflow from collection to operations

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   # If you have git installed
   git clone <repository-url>
   cd source-code-collector
   
   # Or simply download and extract the ZIP file
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Building for Production

```bash
npm run build
# or
yarn build
```

This creates a `build` folder with optimized production files.

## Usage

### Step 1: Collect Source Code
1. **Select Platform**: Choose from available open-source platforms
2. **Choose Input Method**: Repository link or file upload
3. **Provide Source**: Enter URL or upload file
4. **Collect**: Click "Collect Source Code" to process

### Step 2: Analyze Source Code
After successful collection, click "Analyze Source Code" to:
- View project overview and statistics
- Analyze code quality metrics
- Check security vulnerabilities
- Review dependency information
- Export analysis results

### Step 3: Operate on Code
Click "Code Operations" to access advanced tools:
- **Search** through codebase
- **Get refactoring suggestions**
- **Manage dependencies**
- **Generate test cases**
- **Perform security scans**
- **Analyze performance**

## Technical Details

### Built With
- **React 18** - Modern React with hooks and functional components
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **PostCSS** - CSS processing and optimization

### Project Structure
```
src/
├── components/
│   ├── PlatformSelector.js      # Platform selection interface
│   ├── RepositoryInput.js       # Repository URL input with validation
│   ├── FileUpload.js            # File upload with drag & drop
│   ├── SourceCodeAnalyzer.js    # Comprehensive code analysis
│   └── CodeOperations.js        # Advanced code operations
├── App.js                       # Main application component
├── App.css                      # Custom styles and animations
├── index.js                     # React entry point
└── index.css                    # Global styles and Tailwind imports
```

### Key Features
- **State Management**: React hooks for local state
- **Component Architecture**: Modular, reusable components
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: ARIA labels, keyboard navigation, focus management
- **Performance**: Optimized animations and transitions
- **Workflow Management**: Progress tracking and step management

## Customization

### Adding New Platforms
To add support for additional platforms:

1. Add platform data to the `platforms` array in `App.js`
2. Update URL validation patterns in `RepositoryInput.js`
3. Add platform-specific icons and colors

### Adding New Analysis Features
To extend the analysis capabilities:

1. Add new tabs to `SourceCodeAnalyzer.js`
2. Implement analysis logic in the component
3. Update the tab navigation and content rendering

### Adding New Operations
To add new code operations:

1. Add operation to the `operations` array in `CodeOperations.js`
2. Implement the operation logic
3. Add corresponding render method

### Styling
The application uses Tailwind CSS with custom CSS variables. Modify:
- `tailwind.config.js` for theme customization
- `src/index.css` for global styles
- `src/App.css` for component-specific styles

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or issues:
- Check the documentation above
- Review the code comments
- Open an issue in the repository

---

**Built with ❤️ using React and Tailwind CSS**

**Now with powerful analysis and operations capabilities! 🚀**


---

**Built with ❤️ using React and Tailwind CSS**

**Now with powerful analysis and operations capabilities! 🚀**
