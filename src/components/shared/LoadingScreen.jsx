const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
        <p className="text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;