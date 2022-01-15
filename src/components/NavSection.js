/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import {
  NavLink as RouterLink,
  matchPath,
  useLocation
} from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import {
  Box,
  List,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItemButton
} from '@mui/material';

// ----------------------------------------------------------------------

const ListItemStyle = styled((props) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  '&:before': {
    top: 0,
    right: 0,
    width: 3,
    bottom: 0,
    content: "''",
    display: 'none',
    position: 'absolute',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: theme.palette.primary.main
  }
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func
};

//! Children Component
const Childs = ({
  item,
  active,
  activeRootStyle,
  activeSubStyle,
  info,
  idx
}) => {
  const { title2, children2, icon2, path2 } = item;

  // For Parent (Dropdown Kedua)
  const isActiveRoot2 = active(path2);
  const [open2, setOpen2] = useState(isActiveRoot2);
  const handleOpen2 = () => {
    setOpen2((prev) => !prev);
  };

  // For Sub (Last Child: No Dropdown)
  const isActiveSub = active(path2);

  return (
    <React.Fragment key={idx}>
      {/* IF doesn't have any children, Don't Show Dropdown! */}
      {children2 ? (
        <>
          {/* Dropdown Kedua */}
          <ListItemStyle
            onClick={handleOpen2}
            // key={idx}
            style={{ paddingLeft: '4rem' }}
            sx={{
              ...(isActiveRoot2 && activeRootStyle)
            }}
          >
            {/* Show Dot Icon if doesn't have Children2 */}
            {children2 ? (
              <ListItemIconStyle>{icon2 && icon2}</ListItemIconStyle>
            ) : (
              <ListItemIconStyle>
                <Box
                  component="span"
                  sx={{
                    width: 4,
                    height: 4,
                    display: 'flex',
                    borderRadius: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'text.disabled',
                    transition: (theme) =>
                      theme.transitions.create('transform'),
                    ...(isActiveRoot2 && {
                      transform: 'scale(2)',
                      bgcolor: 'primary.main'
                    })
                  }}
                />
              </ListItemIconStyle>
            )}
            <ListItemText disableTypography primary={title2} />
            {info && info}
            {children2 && (
              <Box
                component={Icon}
                icon={open2 ? arrowIosDownwardFill : arrowIosForwardFill}
                sx={{ width: 16, height: 16, ml: 1 }}
              />
            )}
          </ListItemStyle>
          <Collapse in={open2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* Last Child (No Dropdown) */}
              {children2 &&
                children2.map((item, idx) => {
                  const { title3, path3 } = item;
                  const isActiveSub3 = active(path3);

                  return (
                    <ListItemStyle
                      key={idx}
                      component={RouterLink}
                      to={path3}
                      sx={{
                        ...(isActiveSub3 && activeSubStyle)
                      }}
                      style={{ paddingLeft: '5.3rem' }}
                    >
                      <ListItemIconStyle>
                        <Box
                          component="span"
                          sx={{
                            width: 4,
                            height: 4,
                            display: 'flex',
                            borderRadius: '50%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'text.disabled',
                            transition: (theme) =>
                              theme.transitions.create('transform'),
                            ...(isActiveSub3 && {
                              transform: 'scale(2)',
                              bgcolor: 'primary.main'
                            })
                          }}
                        />
                      </ListItemIconStyle>
                      <ListItemText disableTypography primary={title3} />
                    </ListItemStyle>
                  );
                })}
            </List>
          </Collapse>
        </>
      ) : (
        //* Last Child (No Dropdown)
        <ListItemStyle
          key={title2}
          component={RouterLink}
          to={path2}
          sx={{
            ...(isActiveSub && activeSubStyle)
          }}
        >
          <ListItemIconStyle>
            <Box
              component="span"
              sx={{
                width: 4,
                height: 4,
                display: 'flex',
                borderRadius: '50%',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'text.disabled',
                transition: (theme) => theme.transitions.create('transform'),
                ...(isActiveSub && {
                  transform: 'scale(2)',
                  bgcolor: 'primary.main'
                })
              }}
            />
          </ListItemIconStyle>
          <ListItemText disableTypography primary={title2} />
        </ListItemStyle>
      )}
    </React.Fragment>
  );
};

function NavItem({ item, active }) {
  const theme = useTheme();
  const isActiveRoot = active(item.path);
  const { title, path, icon, info, children } = item;
  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
    '&:before': { display: 'block' }
  };

  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium'
  };

  if (children) {
    return (
      <>
        {/* Dropdown Pertama */}
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle)
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Box
            component={Icon}
            icon={open ? arrowIosDownwardFill : arrowIosForwardFill}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item, idx) => (
              // Loop of All Children Component
              <Childs
                item={item}
                active={active}
                activeRootStyle={activeRootStyle}
                activeSubStyle={activeSubStyle}
                info={info}
                idx={idx}
                key={idx}
              />
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle)
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={title} />
      {info && info}
    </ListItemStyle>
  );
}

NavSection.propTypes = {
  navConfig: PropTypes.array
};

export default function NavSection({ navConfig, ...other }) {
  const { pathname } = useLocation();
  const match = (path) =>
    path ? !!matchPath({ path, end: false }, pathname) : false;

  return (
    <Box {...other}>
      <List disablePadding>
        {navConfig.map((item) => (
          <NavItem key={item.title} item={item} active={match} />
        ))}
      </List>
    </Box>
  );
}
