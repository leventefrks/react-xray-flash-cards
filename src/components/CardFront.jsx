import { AnimatePresence, motion } from 'framer-motion';

const CardFront = ({ image }) => {
  return (
    <div className="h-[450px] overflow-hidden p-2 sm:p-4 select-none shadow-xl bg-white dark:bg-black dark:shadow-none rounded-md">
      <AnimatePresence>
        <motion.img
          key={image}
          initial={{ opacity: 0, y: '-10px' }}
          animate={{ opacity: 1, y: '0' }}
          exit={{ opacity: 0, y: '10px' }}
          transition={{ duration: 0.5, type: 'easeIn' }}
          className="relative w-full h-full object-contain z-2"
          src={image}
          alt=""
        />
      </AnimatePresence>
    </div>
  );
};
export default CardFront;
