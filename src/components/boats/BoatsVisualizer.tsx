import { Anchor } from 'lucide-react';

interface Boat {
  people: number[];
  totalWeight: number;
}

interface BoatsVisualizerProps {
  people: number[];
  limit: number;
  boats?: Boat[];
  currentLeft?: number;
  currentRight?: number;
  sortedPeople?: number[];
}

export default function BoatsVisualizer({
  people,
  limit,
  boats = [],
  currentLeft,
  currentRight,
  sortedPeople,
}: BoatsVisualizerProps) {
  const displayPeople = sortedPeople || people;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4">
          People Waiting (Limit: {limit})
        </h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {displayPeople.map((weight, index) => {
            const isLeft = index === currentLeft;
            const isRight = index === currentRight;
            const isProcessed =
              currentLeft !== undefined &&
              currentRight !== undefined &&
              (index < currentLeft || index > currentRight);

            return (
              <div
                key={index}
                className={`relative transition-all duration-300 ${
                  isProcessed ? 'opacity-30' : ''
                }`}
              >
                <div
                  className={`w-16 h-20 rounded-lg flex flex-col items-center justify-center font-bold text-white shadow-md ${
                    isLeft
                      ? 'bg-gradient-to-br from-green-500 to-green-600 scale-110 ring-4 ring-green-300'
                      : isRight
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 scale-110 ring-4 ring-blue-300'
                      : 'bg-gradient-to-br from-slate-400 to-slate-500'
                  }`}
                >
                  <div className="text-2xl">{weight}</div>
                  <div className="text-xs mt-1">kg</div>
                </div>
                {isLeft && (
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full whitespace-nowrap">
                    L
                  </div>
                )}
                {isRight && (
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full whitespace-nowrap">
                    R
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {boats.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-800">
              Boats Deployed: {boats.length}
            </h3>
            <div className="text-sm text-slate-600">
              Total capacity per boat: {limit} kg
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {boats.map((boat, index) => {
              const utilization = (boat.totalWeight / limit) * 100;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-4 border-2 border-cyan-200 shadow-md"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Anchor className="text-cyan-600" size={20} />
                    <span className="font-bold text-slate-800">Boat {index + 1}</span>
                  </div>
                  <div className="flex gap-2 mb-3 justify-center">
                    {boat.people.map((weight, pIndex) => (
                      <div
                        key={pIndex}
                        className="w-12 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex flex-col items-center justify-center text-white font-bold shadow-sm"
                      >
                        <div className="text-lg">{weight}</div>
                        <div className="text-xs">kg</div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Weight:</span>
                      <span className="font-semibold">
                        {boat.totalWeight} / {limit} kg
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          utilization > 90
                            ? 'bg-gradient-to-r from-green-500 to-green-600'
                            : utilization > 60
                            ? 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                            : 'bg-gradient-to-r from-orange-500 to-orange-600'
                        }`}
                        style={{ width: `${utilization}%` }}
                      />
                    </div>
                    <div className="text-xs text-center text-slate-500">
                      {utilization.toFixed(0)}% utilized
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
