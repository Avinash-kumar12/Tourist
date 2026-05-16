import { Loader2 } from 'lucide-react';

const Loading = ({ text = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="w-10 h-10 rounded-full border-3 border-warm-gray-200 border-t-brand-600 animate-spin" />
      <p className="mt-4 text-warm-gray-500 text-sm font-medium">{text}</p>
    </div>
  );
};

export default Loading;
