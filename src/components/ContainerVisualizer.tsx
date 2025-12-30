import { useLanguage } from '../i18n';

interface ContainerVisualizerProps {
  heights: number[];
  leftPointer?: number;
  rightPointer?: number;
  maxArea?: number;
  currentArea?: number;
  showResult?: boolean;
}

export default function ContainerVisualizer({
  heights,
  leftPointer,
  rightPointer,
  maxArea,
  currentArea: _currentArea,
  showResult: _showResult = false,
}: ContainerVisualizerProps) {
  const { t } = useLanguage();
  const maxHeight = Math.max(...heights, 1);
  const barWidth = Math.min(60, 800 / heights.length);

  const calculateArea = (l: number, r: number) => {
    return Math.min(heights[l], heights[r]) * (r - l);
  };

  const waterHeight =
    leftPointer !== undefined && rightPointer !== undefined
      ? Math.min(heights[leftPointer], heights[rightPointer])
      : 0;

  return (
    <div className="w-full">
      <div className="flex items-end justify-center gap-1 h-80 bg-gradient-to-b from-slate-50 to-slate-100 rounded-xl p-6 border-2 border-slate-200 shadow-lg">
        {heights.map((height, index) => {
          const isLeftPointer = index === leftPointer;
          const isRightPointer = index === rightPointer;
          const isInRange =
            leftPointer !== undefined &&
            rightPointer !== undefined &&
            index >= leftPointer &&
            index <= rightPointer;

          const barHeight = (height / maxHeight) * 250;
          const waterFillHeight =
            isInRange && waterHeight > 0 ? (waterHeight / maxHeight) * 250 : 0;

          return (
            <div
              key={index}
              className="relative flex flex-col items-center justify-end transition-all duration-300"
              style={{ width: `${barWidth}px` }}
            >
              {/* Height label on top */}
              <div className="absolute -top-6 text-xs font-semibold text-slate-600">
                {height}
              </div>

              {/* Bar */}
              <div
                className={`relative transition-all duration-500 rounded-t-lg ${
                  isLeftPointer || isRightPointer
                    ? 'bg-gradient-to-t from-blue-600 to-blue-400 shadow-xl scale-105 z-10 ring-4 ring-blue-300'
                    : isInRange
                    ? 'bg-gradient-to-t from-slate-400 to-slate-300'
                    : 'bg-gradient-to-t from-slate-300 to-slate-200'
                }`}
                style={{
                  height: `${barHeight}px`,
                  width: '100%',
                }}
              >
                {/* Water fill */}
                {waterFillHeight > 0 && (
                  <div
                    className="absolute bottom-0 w-full bg-blue-400 bg-opacity-40 rounded-t-lg transition-all duration-500 animate-pulse"
                    style={{ height: `${waterFillHeight}px` }}
                  />
                )}
              </div>

              {/* Index label */}
              <div className="mt-1 text-xs text-slate-500">{index}</div>

              {/* Pointer labels */}
              {isLeftPointer && (
                <div className="absolute -bottom-8 text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  L
                </div>
              )}
              {isRightPointer && (
                <div className="absolute -bottom-8 text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  R
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Info panel */}
      {leftPointer !== undefined && rightPointer !== undefined && (
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-md border-2 border-slate-200">
            <div className="text-sm text-slate-600 mb-1">{t.currentArea}</div>
            <div className="text-2xl font-bold text-blue-600">
              {calculateArea(leftPointer, rightPointer)}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              min({heights[leftPointer]}, {heights[rightPointer]}) × (
              {rightPointer} - {leftPointer})
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-md border-2 border-green-200">
            <div className="text-sm text-slate-600 mb-1">{t.maxArea}</div>
            <div className="text-2xl font-bold text-green-600">
              {maxArea || calculateArea(leftPointer, rightPointer)}
            </div>
            <div className="text-xs text-slate-500 mt-1">{t.bestSoFar}</div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-md border-2 border-slate-200">
            <div className="text-sm text-slate-600 mb-1">{t.pointers}</div>
            <div className="text-2xl font-bold text-slate-700">
              [{leftPointer}, {rightPointer}]
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {t.width}: {rightPointer - leftPointer}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
