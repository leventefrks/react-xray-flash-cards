import { AnimatePresence, motion } from 'framer-motion';

const CardBack = ({ modality, region, radiology, diagnose }) => {
  return (
    <div className="flex h-[450px] flex-col justify-center space-y-2 overflow-hidden rounded-md bg-white p-2 shadow-xl dark:bg-gray-800 dark:shadow-none sm:p-4">
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
            <span className="text-md font-bold text-gray-800 dark:text-gray-100">
              Modalitás
            </span>
            <span className="sm:text-md text-sm text-gray-800 dark:text-gray-100">
              {modality && modality}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-md font-bold text-gray-800 dark:text-gray-100">
              Régió
            </span>
            <span className="sm:text-md text-sm text-gray-800 dark:text-gray-100">
              {region && region}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-md font-bold text-gray-800 dark:text-gray-100">
              Radiológiai jellemző
            </span>
            <span className="sm:text-md text-sm text-gray-800 dark:text-gray-100">
              {radiology && radiology}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-md font-bold text-gray-800 dark:text-gray-100">
              Diagnózis
            </span>
            <span className="sm:text-md text-sm text-gray-800 dark:text-gray-100">
              {diagnose && diagnose}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CardBack;
