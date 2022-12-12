const CardFront = ({ image }) => {
  return (
    <div className="h-[450px] overflow-hidden p-2 sm:p-4 select-none bg-white dark:bg-black shadow-2xl dark:shadow-none rounded-md">
      <img
        className="w-full h-full object-contain"
        src={
          !image ? (
            <span className="text-gray-800 text-2xl">Loading...</span>
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
