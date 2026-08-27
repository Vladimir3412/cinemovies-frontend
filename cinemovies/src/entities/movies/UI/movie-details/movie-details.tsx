export const MovieDetailsCard = ({
  description,
  title,
}: {
  description: string;
  title: string | number;
}) => {
  return (
    <div className="border-r border-white/10 p-4 flex flex-col flex-1 border-b border-l">
      <span className="text-sm text-[#70707a]">{description}</span>
      <h1 className="text-2xl font-bold text-white">{title}</h1>
    </div>
  );
};
