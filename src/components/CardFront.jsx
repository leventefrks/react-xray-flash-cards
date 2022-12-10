const CardFront = ({ image, currentIndex }) => {
  return (
    <div className="h-[500px] bg-transparent overflow-hidden">
      <img
        className="w-full h-full object-contain"
        src={
          !image ? (
            <span className="text-gray-700 text-2xl">Loading...</span>
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
