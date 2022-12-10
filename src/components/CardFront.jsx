const CardFront = ({ image, currentIndex }) => {
  return (
    <div className="h-[480px] bg-transparent overflow-hidden">
      <span className="absolute left-2 top-2 font-bold text-3xl text-gray-300">
        {currentIndex}
      </span>
      <img
        className="w-full h-full object-contain"
        src={
          !image ? (
            <span className="text-gray-400 text-2xl">Loading...</span>
          ) : (
            image
          )
        }
        alt=""
      />
    </div>
  );
};
export default CardFront;
