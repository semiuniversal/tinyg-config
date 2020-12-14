import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AppBar from '@material-ui/core/AppBar';
import AxesPanel from '../AxesPanel';
import Box from '@material-ui/core/Box';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ConnectionPanel from '../ConnectionPanel';
import ConnectionDetails from '../ConnectionDetails';
import ConsolePanel from '../ConsolePanel';
import ControlCameraOutlinedIcon from '@material-ui/icons/ControlCameraOutlined';
import ControlPanel from '../ControlPanel';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GCodePanel from '../GCodePanel';
import GlobalPanel from '../GlobalPanel';
import IconButton from '@material-ui/core/IconButton';
import MenuButton from '@material-ui/icons/Menu';
import MotorsPanel from '../MotorsPanel';
import SettingsInputHdmiIcon from '@material-ui/icons/SettingsInputHdmi';
import SpindlePanel from '../SpindlePanel';
import SubjectOutlinedIcon from '@material-ui/icons/SubjectOutlined';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const drawerWidth = 500;

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
    // Necessary for content to be below app bar.
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


export default function TinyGUX() {
  const classes = useStyles();
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = React.useState(0);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerOpen,
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, drawerOpen && classes.hide)}
          >
            <MenuButton />
          </IconButton>
          <Typography variant='h6' noWrap>
            TinyG Config
          </Typography>
          <Tabs
            variant='scrollable'
            scrollButtons='auto'
            value={tabValue}
            onChange={handleTabChange}
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
        open={drawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Typography variant='h6' noWrap>
            <ConnectionDetails />
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
          <AccordionDetails>
            <ConnectionPanel />
          </AccordionDetails>
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
          <AccordionDetails>
            <ConsolePanel />
          </AccordionDetails>
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
          <AccordionDetails>
            <ControlPanel />
          </AccordionDetails>
        </Accordion>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: drawerOpen,
        })}
      >
        <div className={classes.drawerHeader} />
        <TabPanel value={tabValue} index={0}>
          <GlobalPanel />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <MotorsPanel />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <AxesPanel />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <SpindlePanel />
        </TabPanel>
        <TabPanel value={tabValue} index={4}>
          <GCodePanel />
        </TabPanel>
      </main>
    </div>
  );
}
