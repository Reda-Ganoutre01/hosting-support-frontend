import {Routes} from "react-router-dom";

export default function AppRoutes(){

    return (
        <Routes>
        {/*   public Routes*/}
            <Route  element={<PublicRoutes />} />
        </Routes>
    )
}