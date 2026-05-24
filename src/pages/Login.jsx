import { useNavigate } from "react-router-dom";
import Background from "../assets/MacBook Air - 9.png";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // sementara langsung masuk dashboard
    navigate("/dashboard");
  };

  return (
    <div
      className="
        min-h-screen
        w-full
        bg-cover
        bg-center
        flex
        items-center
        justify-center
        relative
        px-4
        py-8
      "
      style={{ backgroundImage: `url(${Background})` }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-[#3b1f1a]/70"></div>

      {/* card login */}
      <div
        className="
          relative z-10
          w-full
          max-w-md md:max-w-xl
          bg-white/30
          backdrop-blur-md
          rounded-3xl
          shadow-2xl

          px-6 py-8
          sm:px-8 sm:py-10
          md:px-10 md:py-12
        "
      >
        {/* title */}
        <h1
          className="
            text-white
            text-3xl sm:text-4xl md:text-5xl
            font-abhaya
            font-bold
            text-center
            mb-8 md:mb-10
          "
        >
          Mesombang Cafe
        </h1>

        {/* form */}
        <form
          onSubmit={handleLogin}
          className="space-y-5 md:space-y-6"
        >
          {/* username */}
          <div>
            <label
              className="
                block
                text-white
                text-sm md:text-base
                font-semibold
                mb-2
              "
            >
              Nama Pengguna
            </label>

            <input
              type="text"
              className="
                w-full
                h-11 md:h-12
                rounded-xl
                px-4
                outline-none
                bg-white
                text-black
                text-sm md:text-base
              "
            />
          </div>

          {/* password */}
          <div>
            <label
              className="
                block
                text-white
                text-sm md:text-base
                font-semibold
                mb-2
              "
            >
              Kata sandi
            </label>

            <input
              type="password"
              className="
                w-full
                h-11 md:h-12
                rounded-xl
                px-4
                outline-none
                bg-white
                text-black
                text-sm md:text-base
              "
            />
          </div>

          {/* lupa sandi */}
          <div className="text-left">
           <button
            type="button"
            onClick={() => navigate("/lupa-sandi")}
            className="
                text-white
                text-xs sm:text-sm
                hover:underline
            "
            >
            Lupa sandi?
            </button>
          </div>

          {/* tombol */}
          <button
            type="submit"
            className="
              w-full
              h-11 md:h-12
              rounded-xl
              bg-[#5c322b]
              hover:bg-[#44231e]
              transition
              text-white
              text-lg md:text-xl
              font-semibold
              shadow-lg
            "
          >
            Masuk
          </button>
        </form>

        {/* register */}
        <div
          className="
            mt-6
            text-center
            text-white
            text-sm
          "
        >
          Belum punya akun?{" "}
          <button
            onClick={() => navigate("/daftar")}
            className="font-semibold hover:underline"
          >
            Daftar
          </button>
        </div>
      </div>
    </div>
  );
}