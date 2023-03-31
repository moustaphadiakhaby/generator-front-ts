import axios from "axios";
import { toast } from "react-hot-toast";
import { useThemeContext } from "../context/ThemeContext";

type User = {
  fullName: string;
  city: string;
  age: number;
  avatar: string;
  _id: string;
};

type Props = {
  data: { count: number; users: User[] };
  mutate: () => void;
};

export default function Users(props: Props): JSX.Element {
  const { theme } = useThemeContext();
  const handleDeleteOne = async (id: string): Promise<void> => {
    try {
      const response = await axios.put("http://localhost:4112/user", { id });
      console.log(response.data);
      props.mutate();
      toast.success("User deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-wrap gap-7 justify-center">
      {props.data.users.map((user: User): JSX.Element => {
        const { fullName, avatar, _id } = user;
        return (
          <div
            key={_id}
            className={`${
              theme === "dark" ? "bg-[#444444]" : "bg-slate-100"
            } text-white px-10 flex flex-col items-center rounded-2xl relative w-[225px]`}
          >
            <span
              className="cursor-pointer absolute top-5 right-5"
              onClick={() => {
                handleDeleteOne(_id);
              }}
            >
              ❌
            </span>
            <p
              className={`${
                theme === "light" && "text-black"
              } py-5 text-center`}
            >
              {fullName}
            </p>
            <img src={avatar} alt="user" className="pt-5 pb-10" />
          </div>
        );
      })}
    </div>
  );
}
