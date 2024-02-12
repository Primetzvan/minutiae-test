import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TableContainer, Table, TableHead, TableRow, TableBody, TextField, createStyles, makeStyles, TableCell, Theme, withStyles } from "@material-ui/core";
import { getConfigLogs, getGateLogs } from '../shared/API';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Button } from '@material-ui/core';



interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;


    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Logs() {
    const [value, setValue] = React.useState(0);
    const { data: configData  } = useQuery("getConfigLogsname5", getConfigLogs);
    const { data: gateData  } = useQuery("getGateLogsname6", getGateLogs);


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const StyledTableCell = withStyles((theme: Theme) =>
        createStyles({
            head: {
                backgroundColor: '#2e2e2e',
                //theme.palette.common.black,
                color: theme.palette.common.white,
            },
            body: {
                fontSize: 10,
            },
        }),
    )(TableCell);

    const StyledTableRow = withStyles((theme: Theme) =>
        createStyles({
            root: {
                '&:nth-of-type(odd)': {
                    backgroundColor: theme.palette.action.hover,
                },
            },
        }),
    )(TableRow);

    const useStyles = makeStyles({
        table: {
            width: '60%',

        },
    });

    const classes = useStyles();

    return (

        <div>
            <Link to='/management' style={{color: 'black', textDecoration: 'none'}}>
                <Button variant='contained'
                        style={{
                            margin: '1%',
                            backgroundColor: '#9bbda3',
                            textAlign: 'center'
                        }} startIcon={<ArrowBackIcon/>}>
                    back
                </Button>
            </Link>
            <h1 style={{textAlign: 'center', marginBottom: '5%'}}>Logs</h1>

            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 0, borderColor: '#70c07a' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered
                          textColor="secondary"
                          indicatorColor="secondary">
                        <Tab label="Config" {...a11yProps(0)} />
                        <Tab label="Gate" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <TableContainer style={{display: 'grid', placeItems: 'center'}}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="left">Data</StyledTableCell>
                                    <StyledTableCell align="left">modifiedOnDoor</StyledTableCell>
                                    <StyledTableCell align="left">modifier</StyledTableCell>
                                    <StyledTableCell align="left">action</StyledTableCell>
                                    <StyledTableCell align="left">modifiedTable</StyledTableCell>
                                    <StyledTableCell align="left">oldValue</StyledTableCell>
                                    <StyledTableCell align="left">newValue</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { configData?.map((row) => (
                                    <StyledTableRow >
                                        <StyledTableCell align="left">{row.data}</StyledTableCell>
                                        <StyledTableCell align="left">{row.modifiedOnDoor}</StyledTableCell>
                                        <StyledTableCell align="left">{row.modifier}</StyledTableCell>
                                        <StyledTableCell align="left">{row.action}</StyledTableCell>
                                        <StyledTableCell align="left">{row.modifiedTable}</StyledTableCell>
                                        <StyledTableCell align="left">{row.oldValue}</StyledTableCell>
                                        <StyledTableCell align="left">{row.newValue}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>

                    </TableContainer>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TableContainer style={{display: 'grid', placeItems: 'center'}}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="left">created</StyledTableCell>
                                    <StyledTableCell align="center">door</StyledTableCell>
                                    <StyledTableCell align="center">entrant</StyledTableCell>
                                    <StyledTableCell align="center">event</StyledTableCell>
                                    <StyledTableCell align="center">failReason</StyledTableCell>


                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { gateData?.map((row) => (
                                    <StyledTableRow >
                                        <StyledTableCell align="center">{row.created}</StyledTableCell>
                                        <StyledTableCell align="center">{row.door}</StyledTableCell>
                                        <StyledTableCell align="center">{row.entrant}</StyledTableCell>
                                        <StyledTableCell align="center">{row.event}</StyledTableCell>
                                        <StyledTableCell align="center">{row.failReason}</StyledTableCell>

                                    </StyledTableRow>
                                ))}

                            </TableBody>
                        </Table>

                    </TableContainer>
                </TabPanel>
            </Box>
        </div>
    );

}
