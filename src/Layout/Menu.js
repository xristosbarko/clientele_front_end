import React from 'react'
import Button from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import { NavLink, withRouter } from 'react-router-dom'

const MenuListComposition = (props) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open
  }, [open])

  const style = {color: '#40A4C8'}
  let active = false
  if (props.location.pathname.startsWith('/techs') ||
    props.location.pathname.startsWith('/departments') ||
    props.location.pathname.startsWith('/devices')) {
    active = true
  }

  return (
    <>
        <Button
          ref={anchorRef}
          color="inherit"
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          style={active ? style : null}
        >
          Περισσότερα
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <NavLink to='/techs' style={{ textDecoration: 'none' }} activeStyle={style}>
                      <MenuItem onClick={handleClose}>
                        Τεχνικοί
                      </MenuItem>
                    </NavLink>
                    <NavLink to='/departments' style={{ textDecoration: 'none' }} activeStyle={style}>
                      <MenuItem onClick={handleClose}>
                        Τμήματα
                      </MenuItem>
                    </NavLink>
                    <NavLink to='/devices' style={{ textDecoration: 'none' }} activeStyle={style}>
                      <MenuItem onClick={handleClose}>
                        Συσκευές
                      </MenuItem>
                    </NavLink>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
    </>
  )
}

export default withRouter(MenuListComposition)