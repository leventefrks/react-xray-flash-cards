import { AnimatePresence, motion } from 'framer-motion';

const CardFront = ({ image }) => {
  return (
    <div className="h-[450px] select-none overflow-hidden rounded-md bg-white p-2 shadow-xl dark:bg-black dark:shadow-none sm:p-4">
      <AnimatePresence>
        <motion.img
          key={image}
          initial={{ opacity: 0, y: '-10px' }}
          animate={{ opacity: 1, y: '0' }}
          exit={{ opacity: 0, y: '10px' }}
          transition={{ duration: 0.5 }}
          mode="wait"
          className="z-2 relative h-full w-full object-contain"
          src={image}
          alt=""
        />
      </AnimatePresence>
    </div>
  );
};
export default CardFront;
