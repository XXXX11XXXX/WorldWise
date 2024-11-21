import {useFakeAuth} from "../context/FakeAuthContext";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
function ProtectedRoute({children}){
    const {isAuthenticated} = useFakeAuth();
    const navigate = useNavigate();
    useEffect(() => {
    if(!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);
    return isAuthenticated ? children : null;
}
export default ProtectedRoute;