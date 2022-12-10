const CardBack = ({ modality, region, radiology, diagnose }) => {
  return (
    <div className="p-2 sm:p-4 h-[500px] space-y-2 flex flex-col justify-center bg-white rounded-md">
      <div className="flex flex-col">
        <span className="font-bold text-md text-gray-600">Modalitás</span>
        <span className="text-sm sm:text-md">{modality && modality}</span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-md text-gray-600">Régió</span>
        <span className="text-sm sm:text-md">{region && region}</span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-md text-gray-600">
          Radiológiai jellemző
        </span>
        <span className="text-sm sm:text-md">{radiology && radiology}</span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-md text-gray-600">Diagnózis</span>
        <span className="text-sm sm:text-md">{diagnose && diagnose}</span>
      </div>
    </div>
  );
};

export default CardBack;