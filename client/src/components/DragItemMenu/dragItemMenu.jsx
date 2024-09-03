
import React,{useState, useRef, useEffect} from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './dragItemMenu.css'
const  DragItemMenu = (props) =>{
 const [openMenu, setOpenMenu] = useState(false);
 const popupRef = useRef(null);
 const items = [
    {
        name: 'Update',
        function: () =>{props.handleUpdate();  setOpenMenu(false)}
    },
    {
        name: 'Delete',
        function: () => { props.handleDelete(); setOpenMenu(false)}
    }
 ]

 const handleClose = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target))  setOpenMenu(false);
 }

 useEffect(() => {
    document.addEventListener('mousedown', handleClose);
    return () => {
      document.removeEventListener('mousedown', handleClose);
    };
  }, []);

  return (
    <div>
        <MoreVertIcon className='threeDot' onClick={()=>setOpenMenu(!openMenu)}/>
        {openMenu ? <div className='menuContainer' ref={popupRef}>
            {items.map((item) =>
                <div className={item.name == 'Delete' ? 'menuItemDelete': 'menuItem'} onClick={item.function}>
                    {item.name}
                </div>
            )}
        </div>: null}
    </div>
  )
}

export default DragItemMenu