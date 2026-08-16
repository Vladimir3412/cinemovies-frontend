export const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-10 lg:w-4/5 mx-auto w-full">
        {children}
      </div>
    </div>
  );
};
