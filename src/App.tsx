import useSWR from "swr";
import Buttons from "./components/Buttons";
import Users from "./components/Users";
import { ThemeContextType, useThemeContext } from "./context/ThemeContext";

function App() {
  const fetcher = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const { theme, setTheme } = useThemeContext();

  const handleTheme = () => {
    setTheme((prev) => {
      if (prev === "dark") {
        return "light";
      } else {
        return "dark";
      }
    });
  };

  console.log(theme);

  const { data, isLoading, mutate } = useSWR(
    "http://localhost:4112/user",
    fetcher
  );

  return isLoading ? (
    <div>Chargement ...</div>
  ) : (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-[#252525]" : "bg-[#C2B8AE]"
      }`}
    >
      <div className="mx-auto max-w-7xl py-10">
        <div className="flex flex-col items-center">
          <h1
            className={`${
              theme === "dark" && "text-white"
            } text-5xl font-bold text-center`}
          >
            User Generator
          </h1>

          <button className="btn w-max my-10" onClick={handleTheme}>
            Change Theme
          </button>

          <h3
            className={`${
              theme === "dark" && "text-white"
            } text-center text-xl`}
          >
            {data.count
              ? `Il y a ${data.count} utilisateurs en DB`
              : "Il n'y a aucun utilisateur"}
          </h3>
        </div>

        <Buttons mutate={mutate} />
        <Users data={data} mutate={mutate} />
      </div>
    </div>
  );
}

export default App;
