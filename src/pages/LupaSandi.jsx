import { useNavigate } from "react-router-dom";
import Background from "../assets/MacBook Air - 9.png";

export default function LupaSandi() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Link reset kata sandi telah dikirim ke email");
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

      {/* card */}
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
            mb-4
          "
        >
          Lupa Sandi
        </h1>

        {/* deskripsi */}
        <p
          className="
            text-white/90
            text-center
            text-sm md:text-base
            mb-8
          "
        >
          Masukkan email akun anda untuk menerima
          link reset kata sandi
        </p>

        {/* form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* email */}
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
              Email
            </label>

            <input
              type="email"
              placeholder="Masukkan email"
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

          {/* tombol kirim */}
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
            Kirim Link Reset
          </button>
        </form>

        {/* kembali */}
        <div
          className="
            mt-6
            text-center
            text-white
            text-sm
          "
        >
          Ingat kata sandi?{" "}
          <button
            onClick={() => navigate("/login")}
            className="font-semibold hover:underline"
          >
            Masuk
          </button>
        </div>
      </div>
    </div>
  );
}