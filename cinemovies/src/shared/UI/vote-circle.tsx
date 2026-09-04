const CircleRating = ({ rating }: { rating: number }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = (rating / 10) * circumference;

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="8"
        />
        {/* прогресс */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#D4A447"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-xl font-bold text-[#D4A447]">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

export default CircleRating;
