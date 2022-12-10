const CardFront = ({ image, currentIndex }) => {
  return (
    <div className="sm:h-[500px] h-full bg-transparent overflow-hidden">
      <img
        className="w-full h-full object-contain"
        src={
          !image ? (
            <span className="text-gray-600 text-2xl">Loading...</span>
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
