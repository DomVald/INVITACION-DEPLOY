import React, { useState, useRef, useEffect } from "react";
import "./App.css";


function App() {
  const targetDate = new Date("2025-06-07T00:00:00").getTime(); // Fecha del evento
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [nombre, setNombre] = useState("");
  const [adultos, setAdultos] = useState("");
  const [ninos, setNinos] = useState("");

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      ),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleCloseOverlay = () => {
    // Agregamos una pequeña espera para que la animación fade-out se complete antes de ocultarlo
    setShowOverlay(false);
  };

  const generarEnlaceWhatsApp = () => {
    const mensaje = `Hola! Confirmo mi asistencia ☺️ Mi nombre es ${nombre}. Somos ${adultos} adultos y ${ninos} niños.`;
    const enlace = `https://wa.me/522291692742?text=${encodeURIComponent(mensaje)}`;
    window.open(enlace, "_blank");
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="h-auto w-full cursiva flex flex-col items-center justify-center pt-0 bg-[url('/MARBLE.png')] bg-c text-center">
        {showOverlay && (
          <div
            className={`fixed inset-0 bg-black/50 backdrop-blur-md flex flex-col items-center justify-center transition-opacity duration-500 ${
              showOverlay ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => {
              handleCloseOverlay();
              toggleMusic();
              setIsButtonVisible(!isButtonVisible);
            }}
          >
            <div className="mb-12 font-extrabold text-2xl">
              <p>Tenemos una invitacion para ti...</p>
            </div>

            {/* Diálogo centrado */}
            <div
              className={` w-3/4 h-[50vw] transition-all duration-1000 ${
                showOverlay ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <div className="justify-center items-center">
                <img src="/stamp.png" alt="Boda" className="w-full h-full" />
              </div>
            </div>
          </div>
        )}

        <audio ref={audioRef} src="/CANCION.mp3" loop></audio>
        {/* Imagen principal */}
        <img src="/FOTO1.png" alt="Boda" className="w-full" />

        {/* seccion 1 */}
        {/* <div className="">
        <img src="/MARMOL.jpg" alt="Boda" className="w-full" />
        </div> */}
        <div className="">
          <div className="justify-start items-start py-15">
            <img src="/GOLDUP.png" alt="Boda" className="w-3/4" />
          </div>

          {isButtonVisible && (
            <button
              onClick={toggleMusic}
              className="mt-4 p-2 bg-[#b3b3b3] opacity-50 rounded-full fixed top-4 right-4 z-20"
            >
              {isPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M15 6.75a.75.75 0 0 0-.75.75V18a.75.75 0 0 0 .75.75h.75a.75.75 0 0 0 .75-.75V7.5a.75.75 0 0 0-.75-.75H15ZM20.25 6.75a.75.75 0 0 0-.75.75V18c0 .414.336.75.75.75H21a.75.75 0 0 0 .75-.75V7.5a.75.75 0 0 0-.75-.75h-.75ZM5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v8.122c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L5.055 7.061Z" />
                </svg>
              )}
            </button>
          )}

          {/* Nombres y fecha */}
          <h1 className="text-5xl cursiva font-extrabold text-[#A65F2B] mt-2">
            Medow & Eliut
          </h1>

          <p className="text-4xl text-gray-700 mt-8  font-bold">07/06/25</p>

          <div className="px-8 py-4">
            {/* Versículo */}
            <p className="text-xl italic font-bold text-gray-600 mt-4">
              1 Corintios 13:8 - "El amor nunca falla"
            </p>

            {/* Mensaje especial */}
            <p className="text-2xl  font-extrabold text-gray-700 mt-4">
              Nos hará muy felices que nos acompañen en el inicio de nuestra
              vida juntos.
            </p>
          </div>

          {/* Cuenta regresiva */}
          <div className="mt-8 text-3xl font-bold seria text-[#A65F2B]">
            <p>
              <span className="text-4xl cursiva">Cuenta regresiva</span>
            </p>
            {`${timeLeft.days}d : ${timeLeft.hours}h : ${timeLeft.minutes}m : ${timeLeft.seconds}s`}
          </div>

          <div className="flex justify-end items-center py-15">
            <img src="/GOLDDOWN.png" alt="Boda" className="w-3/4" />
          </div>
        </div>

        {/* Imagen secundaria */}
        <img src="/FOTO2.jpg" alt="Foto" className="w-full mt-12" />

        <div className="flex justify-center items-center py-8">
          <img src="/FLOR.png" alt="Boda" className="w-3/4" />
        </div>

        {/* Padres */}
        <div className="px-4">
          <h2 className="text-3xl font-extrabold  text-[#559270] mt-2">
            Nos acompañan nuestros padres
          </h2>
          <div className="flex flex-row cursiva justify-center border p-2 border-yellow-600 font-bold items-center mt-8 space-x-6">
            <p className="text-xl text-gray-700">
              Jacob Gómez Valenzuela <br /> & <br /> Gabriela Valdés Rosales
            </p>
            <p className="text-xl text-gray-700">
              José Córdoba Peña <br />&<br /> Beatriz Moreno Serrano
            </p>
          </div>
        </div>

        {/* Lugar */}
        <div className="">
          <div className="flex flex-row justify-center text-[#A65F2B] items-center mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>

            <h2 className="text-2xl font-semibold">Lugar:</h2>
          </div>
          <p className="text-2xl font-extrabold py-4 text-gray-700">
            Quinta Las Canteras, Córdoba, Ver.
          </p>
          <a
            href="https://maps.app.goo.gl/nqtrPiSgurLRTvro9"
            target="_blank"
            rel="noreferrer"
          >
            <button className="mt-2 px-6 py-2 bg-[#A65F2B] text-2xl font-bold text-white rounded-full shadow-md hover:bg-[#A65F2B] transition">
              Ver ubicacion
            </button>
          </a>
        </div>

        {/* Horarios */}
        <ul className="timeline timeline-vertical text-2xl  my-8 text-[#559270]">
          <li>
            <div className="timeline-start pr-2 font-bold ">4:00 PM</div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                />
              </svg>
            </div>
            <div className="timeline-end bg-transparent pl-2 font-bold">
              Discurso
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <br />
            <div className="timeline-start pr-2 font-bold">5:00 PM</div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </div>
            <div className="timeline-end bg-transparent pl-2 font-bold ">
              Recepcion
            </div>
          </li>
        </ul>

        {/* Imagen final */}
        <img src="/FOTO3.jpg" alt="Foto" className="w-full mt-4" />

        {/* Sugerencia de regalos */}
        <div className="w-full flex flex-row justify-center  items-center p-8">
          <div className="w-4/5">
            <h2 className="text-3xl font-bold text-[#A65F2B] mt-8">
              Sugerencia de regalos
            </h2>
            <p className="text-2xl font-bold text-gray-700 mt-4">
              Agradecemos su presencia y generosidad, por ello, si sus
              circunstancias se lo permiten, con gusto aceptaremos su apoyo
              monetario en esta ocasión.
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#005225"
              className="size-24 justify-self-center mt-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
              />
            </svg>
          </div>
        </div>

        {/* Detalles */}
        <div className="w-full flex flex-col justify-center items-center  p-8">
          <div className="w-4/5 font-bold text-2xl">
            <h2 className="text-3xl font-extrabold text-[#A65F2B] mt-6">
              Detalles
            </h2>
            <p className="text-md text-left text-gray-700 mt-2">
              - Vestimenta formal
            </p>
            <p className="text-md text-left text-gray-700">
              - Se recomienda usar tacón cuadrado, ya que el evento será en
              jardín.
            </p>
            <p className="text-md text-gray-700 text-left mt-2">
              - Por favor eviten estos colores:
            </p>
            <div className="flex justify-start space-x-4 my-6">
              <div className="w-10 h-10 bg-white border border-gray-700 shadow-xl rounded-full"></div>
              <div className="w-10 h-10 bg-beige border shadow-xl border-gray-700 rounded-full"></div>
              <div className="w-10 h-10 bg-[#A65F2B] border shadow-xl border-gray-700 rounded-full"></div>
            </div>
            <p className="text-md text-gray-700 text-left mt-2">
              - Este es un evento formal. Por eso, padres, les pedimos cuiden a
              sus hijos para evitar accidentes. Gracias por su comprensión.
            </p>

          </div>
        </div>

        {/* Imagen adicional */}
        <img src="/FOTO4.jpg" alt="Foto" className="w-full mt-4" />

        {/* Confirmación de asistencia */}
        <div className="flex flex-col font-bold  justify-center items-center my-12 w-full">
          <div className="w-4/5">
            <h2 className="text-3xl font-extrabold text-[#A65F2B] mt-6">
              Confirma tu asistencia
            </h2>
            <p className="text-2xl text-gray-700 mt-4">
              Tu confirmación es muy importante.
            </p>
            <p className="text-2xl mt-2 text-gray-700">
              Por favor indícanos si asistirás a nuestra boda antes del 1 de
              mayo del 2025.
            </p>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#005225"
              class="size-18 justify-self-center mt-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <button className="mt-16 text-2xl px-6 py-2 bg-[#D48C59] text-white rounded-full shadow-md hover:bg-[#A65F2B] transition" 
            onClick={()=>document.getElementById('my_modal_1').showModal()}>
              Confirmar
            </button>

            <dialog id="my_modal_1" className="modal seria">
  <div className="modal-box p-6 bg-white text-black">
    <h3 className="font-bold text-lg">Confirma tu asistencia</h3>
    
    <label className="block text-left mt-2">
        <span className="text-gray-700">Nombre:</span>
        <input
          type="text"
          className="input input-bordered bg-white border-black w-full mt-1"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Escribe tu nombre"
          required
        />
      </label>

      <label className="block text-left mt-2">
        <span className="text-gray-700">Número de adultos:</span>
        <input
          type="number"
          placeholder="Ingresa el número de adultos"
          className="input input-bordered bg-white border-black w-full mt-1"
          value={adultos}
          onChange={(e) => setAdultos(e.target.value)}
          min="0"
          required
        />
      </label>

      <label className="block text-left mt-2">
        <span className="text-gray-700">Número de niños:</span>
        <input
          type="number"
          placeholder="Ingresa el número de niños"
          className="input input-bordered bg-white border-black w-full mt-1"
          value={ninos}
          onChange={(e) => setNinos(e.target.value)}
          min="0"
          required
        />
      </label>

    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn bg-red-700 rounded-full mr-2 border-0">CANCELAR</button>
      </form>
      <button className="btn bg-green-700 rounded-full border-0 "
      onClick={generarEnlaceWhatsApp}
      >ENVIAR</button>
    </div>
  </div>
</dialog>

            {/* Mensaje de agradecimiento */}
            <p className="text-2xl text-gray-700 mt-12">
              Gracias por acompañarnos en este momento tan importante para
              nosotros.
            </p>

            <p className="text-3xl italic text-[#A65F2B] mt-8">Con cariño,</p>
            <p className="text-6xl italic cursiva font-bold mt-8 text-[#A65F2B]">
              Medow & Eliut
            </p>
          </div>
        </div>

        <div className="flex justify-end items-center py-2">
          <img src="/GOLDDOWN.png" alt="Boda" className="w-3/4" />
        </div>

        {/* Imagen final */}
        <img src="/FOTO5.jpg" alt="Foto" className="w-full mt-8 mb-12" />
      </div>
    </>
  );
}

export default App;
