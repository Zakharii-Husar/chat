import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import './CommonButton.module.scss';

interface Props{
    to:string;
    children: string;
}

export const CommonButton: React.FC<Props> = ({to, children}) => {
    return (<div>
        <Link to={to}>
            <Button className="btn-common">{children}</Button>
        </Link>
    </div>)
};