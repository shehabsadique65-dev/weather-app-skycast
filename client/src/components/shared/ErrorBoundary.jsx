import { Component } from 'react';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="glass-card p-8 flex flex-col items-center gap-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center">
            <AlertTriangle size={22} className="text-red-400" />
          </div>
          <div>
            <p className="font-semibold text-white/90">Something went wrong</p>
            <p className="text-sm text-white/50 mt-1">This section failed to load. Try refreshing.</p>
          </div>
          <button
            className="glass-button px-4 py-2 text-sm"
            onClick={() => this.setState({ hasError: false })}
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
