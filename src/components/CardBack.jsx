import { AnimatePresence, motion } from 'framer-motion';

const CardBack = ({ modality, region, radiology, diagnose }) => {
  return (
    <div className="p-2 sm:p-4 h-[450px] space-y-2 flex flex-col justify-center bg-white dark:bg-gray-800 rounded-md shadow-xl dark:shadow-none overflow-hidden">
      <AnimatePresence>
        <motion.div
          className="absolute"
          key={modality}
          initial={{ opacity: 0, y: '-10px' }}
          animate={{ opacity: 1, y: '0' }}
          exit={{ opacity: 0, y: '20px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col">
            <span className="font-bold text-md text-gray-800 dark:text-gray-100">
              Modalitás
            </span>
            <span className="text-sm sm:text-md text-gray-800 dark:text-gray-100">
              {modality && modality}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-md text-gray-800 dark:text-gray-100">
              Régió
            </span>
            <span className="text-sm sm:text-md text-gray-800 dark:text-gray-100">
              {region && region}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-md text-gray-800 dark:text-gray-100">
              Radiológiai jellemző
            </span>
            <span className="text-sm sm:text-md text-gray-800 dark:text-gray-100">
              {radiology && radiology}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-md text-gray-800 dark:text-gray-100">
              Diagnózis
            </span>
            <span className="text-sm sm:text-md text-gray-800 dark:text-gray-100">
              {diagnose && diagnose}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CardBack;
