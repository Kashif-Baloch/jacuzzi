const Loader = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-8 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00667F] mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading...</p>
            </div>
        </div>
    );
};

export default Loader;
