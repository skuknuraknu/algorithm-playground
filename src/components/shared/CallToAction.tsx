import { Lightbulb } from 'lucide-react';

interface CallToActionProps {
  gradient: string;
  title?: string;
  subtitle?: string;
  onVisualizeClick: () => void;
  onSimulateClick: () => void;
}

export default function CallToAction({
  gradient,
  title = 'Ready to Practice?',
  subtitle,
  onVisualizeClick,
  onSimulateClick,
}: CallToActionProps) {
  return (
    <div className={`mt-8 bg-gradient-to-r ${gradient} rounded-xl p-8 text-white shadow-xl`}>
      <div className="flex items-center gap-4 mb-4">
        <Lightbulb size={40} />
        <div>
          <h3 className="text-2xl font-bold">{title}</h3>
          {subtitle && <p className="text-white/90 mt-1">{subtitle}</p>}
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <button
          onClick={onVisualizeClick}
          className="bg-white text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-md"
        >
          Start Visualizing
        </button>
        <button
          onClick={onSimulateClick}
          className="bg-white/20 backdrop-blur text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors shadow-md"
        >
          Watch Simulation
        </button>
      </div>
    </div>
  );
}
