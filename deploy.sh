#!/bin/bash

echo "🚀 Building Source Code Collector for production..."

# Build the application
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Production files are in the 'build' directory"
    echo ""
    echo "🌐 To serve the production build:"
    echo "   cd build"
    echo "   python3 -m http.server 8000"
    echo "   # or"
    echo "   npx serve -s . -l 8000"
    echo ""
    echo "🔗 Open http://localhost:8000 in your browser"
else
    echo "❌ Build failed!"
    exit 1
fi

