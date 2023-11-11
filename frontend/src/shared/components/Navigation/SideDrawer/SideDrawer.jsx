import { createPortal } from 'react-dom';

import './SideDrawer.css';

const SideDrower = (props) => {
  const content = <aside className='side-drawer'>{props.children}</aside>;

  return createPortal(content, document.getElementById('drawer-hook'));
};

export default SideDrower;
