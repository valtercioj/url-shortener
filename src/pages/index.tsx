import { useState, ChangeEvent } from "react";
import { trpc } from "../utils/trpc";
export default function Home() {
  const { mutateAsync: createLink } = trpc.createLink.useMutation();
  const [link, setLink] = useState("");
  const [isError, setIsError] = useState(false);
  function handleLink(e: ChangeEvent<HTMLInputElement>): void {
    setLink(e.target.value);
  }
  const handleLinkSubmit = async () => {
    if (link === "" || link.length === 6 || !link.search("http://")) {
      setIsError(true);
    } else {
      setIsError(false);
      const { message } = await createLink({
        url: link,
      });
      window.location.href = `urlShortener/${message}`;
    }
  };
  console.log(link);
  return (
    <div className="h-screen w-screen bg-gray dark:bg-bgGray">
      <div className="flex flex-col items-center justify-evenly w-full h-full">
        <h1 className="text-4xl lg:text-6xl font-bold text-blueText dark:text-white text-center">
          Encurtador url
        </h1>
        <div className="flex flex-col shadow-1xl w-[80vw] lg:w-[40vw] bg-white h-96 items-center justify-evenly		">
          <h1 className="text-2xl font-bold text-blackText">
            Cole a URL a ser encurtada
          </h1>
          <div className="flex flex-col lg:flex-row items-center w-full px-6">
            <input
              type="text"
              value={link}
              onChange={handleLink}
              placeholder="Digite seu link aqui"
              className="text-1xl border border-grayBorder 
              focus:border-grayBorder 
              hover:border-grayBorder 
              text-blackText h-12 lg:h-16	w-full pl-2.5 placeholder:text-lg	placeholder:text-blackText "
            />
            <button
              disabled={!link}
              onClick={handleLinkSubmit}
              className="bg-blueText disabled:bg-blueBaby text-white h-16 w-full lg:w-32 lg:ml-4 mt-2 lg:mt-0 text-lg font-bold"
            >
              Encurtar
            </button>
          </div>
          {isError && (
            <span className="text-red-600 relative text-xl	 ">
              Digite uma url válida
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
