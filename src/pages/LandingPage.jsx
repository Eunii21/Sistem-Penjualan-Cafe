import Background from "../assets/MacBook Air - 9.png"
export default function LandingPage(){
    return(
        <div
              className="h-screen w-full bg-cover bg-center flex items-center justify-center relative"
              style={{ backgroundImage: `url(${Background})` }}
            >
              {/* overlay */}
              <div className="absolute inset-0 bg-[#3b1f1a]/70"></div>
        
              {/* content */}
              <div className="relative z-10 text-center text-white">
                <h1 className="text-4xl md:text-5xl font-abhaya font-extrabold mb-6">
                  Mesombang Cafe
                </h1>
        
                <button className="px-8 py-3 bg-[#b08980] hover:bg-[#8c6b63] transition rounded-full text-lg font-medium shadow-lg font-abhaya">
                  mulai
                </button>
              </div>
            </div>
    );
}