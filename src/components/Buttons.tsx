import axios from "axios";
import toast from "react-hot-toast";

type Props = {
  mutate: () => void;
};

export default function Buttons(props: Props) {
  const handleAddUser = async (): Promise<void> => {
    try {
      const response = await axios.post("http://localhost:4112/user");
      console.log(response.data);
      props.mutate();
      toast.success("User added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddMultiUser = async (): Promise<void> => {
    try {
      const response = await axios.post("http://localhost:4112/user5");
      console.log(response.data);
      props.mutate();
      toast.success("Users added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAll = async (): Promise<void> => {
    try {
      const response = await axios.delete("http://localhost:4112/user");
      console.log(response.data);
      props.mutate();
      toast.success("All users deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-10 my-10 justify-center">
      <button className="btn" onClick={handleAddUser}>
        Add one user
      </button>
      <button className="btn" onClick={handleAddMultiUser}>
        Add five users
      </button>
      <button className="btn" onClick={handleDeleteAll}>
        Delete all users
      </button>
    </div>
  );
}
