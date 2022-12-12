const CardBack = ({ modality, region, radiology, diagnose }) => {
  return (
    <div className="p-2 sm:p-4 h-[300px] sm:h-[400px] md:h-[450px] space-y-2 flex flex-col justify-center bg-white dark:bg-slate-500 rounded-md shadow-xl dark:shadow-none">
      <div className="flex flex-col">
        <span className="font-bold text-md text-gray-600 dark:text-white">
          Modalitás
        </span>
        <span className="text-sm sm:text-md text-gray-600 dark:text-white">
          {modality && modality}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-md text-gray-600 dark:text-white">
          Régió
        </span>
        <span className="text-sm sm:text-md text-gray-600 dark:text-white">
          {region && region}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-md text-gray-600 dark:text-white">
          Radiológiai jellemző
        </span>
        <span className="text-sm sm:text-md text-gray-600 dark:text-white">
          {radiology && radiology}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-md text-gray-600 dark:text-white">
          Diagnózis
        </span>
        <span className="text-sm sm:text-md text-gray-600 dark:text-white">
          {diagnose && diagnose}
        </span>
      </div>
    </div>
  );
};

export default CardBack;
