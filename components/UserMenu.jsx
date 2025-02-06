import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import SummaryApi from '../common/SummaryApi'
import Axios from "../utils/Axios";
import { logout } from "../store/userSlice";
import AxiosToastError from '../utils/AxiosToastError'
import toast from "react-hot-toast";




const UserMenu = ({close}) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });
      if (response.data.success) {

        if(close){
          close();
        }
       
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div>
      <div className="font-semibold">Minha conta</div>
      <div className="text-sm">{user.name || user.mobile}</div>

      <Divider />

      <div className="text-sm grid gap-2 ">
        <Link to={""} className="px-2 hover:bg-gradient-to-r 
        from-orange-320 via-orange-600">
          Meu Pedidos
        </Link>
        <Link to={""} className="px-2 hover:bg-gradient-to-r 
        from-orange-320 via-orange-600">
          Savar Endereco
        </Link>
        <button onClick={handleLogout}
          className="text-left text-semibold bg-gradient-to-r 
        from-orange-320 via-orange-600 text-center text-white text-lg rounded-lg py-2 px-2"
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
