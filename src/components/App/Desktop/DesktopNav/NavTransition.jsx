import { useSelector } from 'react-redux';

function NavTransition(){
    const user = useSelector((store) => store.user.id);

    return(
        
        <div className="transition_container">
            {user && <h3 className="transition_title">PACK CENTRAL</h3>}
        </div>
    )
}

export default NavTransition;