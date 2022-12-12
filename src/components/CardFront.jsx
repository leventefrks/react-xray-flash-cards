const CardFront = ({ image }) => {
  return (
    <div className="h-[300px] sm:h-[400px] md:h-[450px] bg-transparent overflow-hidden p-2 sm:p-3 bg-white dark:bg-gray-500 shadow-2xl dark:shadow-none rounded-md">
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
