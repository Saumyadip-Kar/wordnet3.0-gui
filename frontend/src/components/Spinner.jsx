// Custom spinner
const Spinner = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black-900/10 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        {/* Transparent Glowing Ring Spinner */}
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-blue-400 animate-spin"></div>
          {/* Removed the inner gray background */}
        </div>

        {/* Animated Message */}
        <p className="text-white text-lg font-medium animate-pulse tracking-wide drop-shadow-lg">
          Please wait, processing your request...
        </p>
      </div>
    </div>
  );
};

export default Spinner;


//HashLoading Spinner from react
// import { HashLoader } from "react-spinners";

// const Spinner = () => {
//   return (
//     <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center">
//       <div className="flex flex-col items-center space-y-6">
//         {/* Futuristic Neon Hash Spinner */}
//         <HashLoader
//           color="#00FFFF"
//           size={120}
//           speedMultiplier={1.4}
//           cssOverride={{
//             filter: "drop-shadow(0 0 20px rgba(0, 255, 255, 0.8))",
//           }}
//         />

//         {/* Animated Message */}
//         <p className="text-cyan-300 text-lg font-mono animate-pulse tracking-wider drop-shadow-[0_0_10px_rgba(0,255,255,0.6)]">
//           Please wait, processing your request...
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Spinner;
