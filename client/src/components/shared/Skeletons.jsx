const SkeletonCard = ({ className = '' }) => (
  <div className={`skeleton h-full min-h-[120px] ${className}`} />
);

export const SkeletonHero = () => (
  <div className="glass-card p-8 flex flex-col gap-6 animate-fade-in">
    <div className="flex justify-between items-start">
      <div className="flex flex-col gap-3">
        <div className="skeleton h-8 w-48 rounded-xl" />
        <div className="skeleton h-5 w-32 rounded-lg" />
      </div>
      <div className="skeleton h-20 w-20 rounded-2xl" />
    </div>
    <div className="skeleton h-24 w-40 rounded-2xl" />
    <div className="flex gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="skeleton h-12 w-24 rounded-xl" />
      ))}
    </div>
  </div>
);

export const SkeletonStatGrid = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className="skeleton rounded-2xl h-28" />
    ))}
  </div>
);

export const SkeletonHourly = () => (
  <div className="glass-card p-5">
    <div className="skeleton h-5 w-32 rounded-lg mb-4" />
    <div className="flex gap-3 overflow-hidden">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="skeleton h-24 w-20 rounded-xl flex-shrink-0" />
      ))}
    </div>
  </div>
);

export const SkeletonChart = () => (
  <div className="glass-card p-5">
    <div className="skeleton h-5 w-40 rounded-lg mb-4" />
    <div className="skeleton h-48 w-full rounded-xl" />
  </div>
);

export default SkeletonCard;
