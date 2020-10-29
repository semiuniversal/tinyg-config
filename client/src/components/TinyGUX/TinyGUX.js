import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuButton from '@material-ui/icons/Menu';
import SettingsInputHdmiIcon from '@material-ui/icons/SettingsInputHdmi';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import SubjectOutlinedIcon from '@material-ui/icons/SubjectOutlined';
import ControlCameraOutlinedIcon from '@material-ui/icons/ControlCameraOutlined';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import AxesPanel from '../AxesPanel';
import ConnectionPanel from '../ConnectionPanel';
import ConsolePanel from '../ConsolePanel';
import ControlPanel from "../ControlPanel";
import GCodePanel from '../GCodePanel';
import GlobalPanel from '../GlobalPanel'
import MotorsPanel from '../MotorsPanel';
import SpindlePanel from '../SpindlePanel';


const drawerWidth = 500;

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
const a11yProps = (index) => {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function TinyGUX() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuButton />
          </IconButton>
          <Typography variant='h6' noWrap>
            TinyG Configuration
          </Typography>
          <Tabs
            variant='scrollable'
            scrollButtons='auto'
            value={value}
            onChange={handleChange}
          >
            <Tab label='Global Settings' {...a11yProps(0)} />
            <Tab label='Motors' {...a11yProps(1)} />
            <Tab label='Machine Axes' {...a11yProps(2)} />
            <Tab label='Spindle' {...a11yProps(3)} />
            <Tab label='G-Code Settings' {...a11yProps(4)} />
          </Tabs>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Typography variant='h6' noWrap>
            Connection Details
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel-connection-content'
            id='panel-connection'
          >
            {' '}
            <SettingsInputHdmiIcon />
            <Typography variant='h6' noWrap>
              Hardware Connection
            </Typography>
          </AccordionSummary>
          <AccordionDetails><ConnectionPanel/></AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel-console-content'
            id='panel-console'
          >
            {' '}
            <SubjectOutlinedIcon />
            <Typography variant='h6' noWrap>
              Console
            </Typography>
          </AccordionSummary>
          <AccordionDetails><ConsolePanel/></AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel-control-content'
            id='panel-control'
          >
            {' '}
            <ControlCameraOutlinedIcon />
            <Typography variant='h6' noWrap>
              Controls
            </Typography>
          </AccordionSummary>
          <AccordionDetails><ControlPanel/></AccordionDetails>
        </Accordion>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <TabPanel value={value} index={0}>
          <GlobalPanel/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MotorsPanel/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AxesPanel />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <SpindlePanel/>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <GCodePanel/>
        </TabPanel>
      </main>
    </div>
  );
}
