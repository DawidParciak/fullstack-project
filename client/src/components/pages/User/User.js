import { useSelector } from "react-redux";
import { getUser } from "../../../redux/usersRedux";

const User = () => {

  const user = useSelector(getUser)

  return(
    <div className="my-5">
      {user && (
        <h1>
          User {user.login.phone}
        </h1>
      )}
    </div>
  );
};

export default User;
