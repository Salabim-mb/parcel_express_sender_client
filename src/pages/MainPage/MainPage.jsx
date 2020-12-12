import {path_list} from "constants/routes";
import {Redirect} from 'react-router-dom';

const MainPage = () => (
    <Redirect to={path_list.LOGIN} />
);

export default MainPage;