const CardBack = ({ modality, region, radiology, diagnose }) => {
  return (
    <div className="p-4 h-[500px] space-y-2 flex flex-col justify-center bg-white rounded-md">
      <div className="flex flex-col">
        <span className="font-bold text-md text-gray-600">Modalitás</span>
        {modality && modality}
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-md text-gray-600">Régió</span>
        {region && region}
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-md text-gray-600">
          Radiológiai jellemző
        </span>
        {radiology && radiology}
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-md text-gray-600">Diagnózis</span>
        {diagnose && diagnose}
      </div>
    </div>
  );
};

export default CardBack;
