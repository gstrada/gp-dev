import React from 'react';
import {Divider, ListItem, ListItemIcon, Icon, Typography} from '@material-ui/core';

function ListItemMenu({target, icon, title, value, menuItemClick, divider=true}) {

    return (
       <div>
           <ListItem
               button
               onClick={() => menuItemClick(target)}
           >
               <ListItemIcon>
                   <Icon color="action">{icon}</Icon>
               </ListItemIcon>
               <div className={"flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0"}>
                   <Typography variant='subtitle1' color='primary' className={"sm:w-auto md:w-1/6"}>{title}</Typography>
                   <Typography variant='subtitle1' color='secondary'  className={"sm:w-auto md:w-5/6"}>{value}</Typography>
               </div>
               <ListItemIcon className='justify-end'>
                   <Icon color="action">keyboard_arrow_right</Icon>
               </ListItemIcon>
           </ListItem>
           {divider ? (
               <Divider variant={'middle'} light={true} className={'mt-1 mb-2'}/>
           ) : null}
       </div>
    );
}

export default ListItemMenu;