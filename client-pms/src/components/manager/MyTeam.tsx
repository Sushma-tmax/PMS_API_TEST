// import * as React from 'react';
// import { useState, useRef } from "react";
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import { visuallyHidden } from '@mui/utils';
// import { useGetEmployeeByStatusQuery, useGetEmployeeQuery } from "../../service";
// import Eye from '../../assets/Images/Eye.svg';
// import { Stack, Tab, Tabs, Box, Typography } from '@mui/material';
// import { TextField } from '@mui/material';
// import OpenInNewIcon from '@mui/icons-material/OpenInNew';
// import { Link } from 'react-router-dom';
// import { styled } from '@mui/material/styles';
// import Avatar from "@mui/material/Avatar";
// import { Button } from '@mui/material';
// import Collapse from '@mui/material/Collapse';
// import { useEffect } from "react";
// import { CREATE_APPRAISAL } from '../../constants/routes/Routing';
// import UpDown from '../../assets/Images/UpDown.svg';
// import Opennew from '../../assets/Images/Opennew.svg';
// import Application from '../../assets/Images/Application.svg';
// import Searchlens from '../../assets/Images/Searchlens.svg';
// import InputAdornment from "@mui/material/InputAdornment";
//
// const Mytable = styled("div")({
//     background: '#FFFFFF',
//     marginLeft: '20px',
//     marginRight: '20px'
// });
// const Tabstyles = styled("div")({
//     marginLeft: '20px',
//     marginRight: '20px',
//     '& .MuiButtonBase-root': {
//         color: '#999999',
//         textTransform: 'none',
//         fontWeight: 400
//     },
//     '& .Mui-selected': {
//         color: '#004C75',
//
//     },
//     '&.MuiTabs-indicator': {
//         backgroundColor: '#004C75'
//     },
//     display: 'flex',
//     // justifyContent: 'space-between'
//
// });
// const Heading = styled("div")({
//     fontSize: '18px',
//     color: '#004C75',
//     fontWeight: 400,
//     paddingTop: '25px',
//     marginLeft: '20px'
// });
// const Searchfeild = styled("div")({
//     position: 'absolute',
//     marginLeft: '76%',
//     //marginRight: '8px',
//     marginTop: '10px',
//     '& .MuiOutlinedInput-root': {
//         height: '28px',
//         width: '144px',
//         borderRadius: '15px',
//         background: '#F2F6F8',
//         // border:'2px solid white'
//
//     },
//     "& .MuiInputLabel-root": {
//         fontSize: '13px',
//         color: '#306D8F',
//         marginTop: '-10px'
//     },
//     '& .MuiOutlinedInput-input': {
//         fontSize: '13px',
//         color: '#306D8F',
//     }
// });
// const TableHeadings = styled("div")({
//     '& .MuiTableRow-head ': {
//         background: '#f2f6f8'
//     },
//     '& .MuiTableCell-head': {
//         color: '#004C75',
//         padding: '0px',
//         height: '30px',
//         borderBottom: '2px solid white'
//     },
//     '& .MuiTableCell-root': {
//
//         padding: '0px',
//
//     },
// });
// const Names = styled("div")({
//
//     marginLeft: '20px',
//     marginTop: '10px',
//     color: '#333333'
// });
//
// interface TabPanelProps {
//     children?: React.ReactNode;
//     index: number;
//     value: any;
// }
//
//
//
//
//
// function TabPanel(props: TabPanelProps) {
//     const { children, value, index, ...other } = props;
//
//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`simple-tabpanel-${index}`}
//             aria-labelledby={`simple-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Box sx={{ p: 3 }}>
//                     <Typography>{children}</Typography>
//                 </Box>
//             )}
//         </div>
//     );
// }
//
//
//
// interface Data {
//     position: any;
//     status: any;
//     grade: any;
//     name: any;
//     protein: any;
// }
//
// function createData(
//     name: string,
//     position: string,
//     grade: any,
//     status: any,
//     protein: any,
// ): Data {
//     return {
//         name,
//         position,
//         grade,
//         status,
//         protein,
//     };
// }
//
// // const rows = [
// //     createData('Cupcake', 305, 3.7, 67, 4.3),
// //     createData('Donut', 452, 25.0, 51, 4.9),
// //     createData('Eclair', 262, 16.0, 24, 6.0),
// //     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
// //     createData('Gingerbread', 356, 16.0, 49, 3.9),
// //     createData('Honeycomb', 408, 3.2, 87, 6.5),
// //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
// //     createData('Jelly Bean', 375, 0.0, 94, 0.0),
// //     createData('KitKat', 518, 26.0, 65, 7.0),
// //     createData('Lollipop', 392, 0.2, 98, 0.0),
// //     createData('Marshmallow', 318, 0, 81, 2.0),
// //     createData('Nougat', 360, 19.0, 9, 37.0),
// //     createData('Oreo', 437, 18.0, 63, 4.0),
// // ];
//
// function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
//     if (b[orderBy] < a[orderBy]) {
//         return -1;
//     }
//     if (b[orderBy] > a[orderBy]) {
//         return 1;
//     }
//     return 0;
// }
//
// type Order = 'asc' | 'desc';
//
// function getComparator<Key extends keyof any>(
//     order: Order,
//     orderBy: Key,
// ): (
//         a: { [key in Key]: number | string },
//         b: { [key in Key]: number | string },
//     ) => number {
//     return order === 'desc'
//         ? (a, b) => descendingComparator(a, b, orderBy)
//         : (a, b) => -descendingComparator(a, b, orderBy);
// }
//
// // This method is created for cross-browser compatibility, if you don't
// // need to support IE11, you can use Array.prototype.sort() directly
// function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
//     const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
//     stabilizedThis.sort((a, b) => {
//         const order = comparator(a[0], b[0]);
//         if (order !== 0) {
//             return order;
//         }
//         return a[1] - b[1];
//     });
//     return stabilizedThis.map((el) => el[0]);
// }
//
// interface HeadCell {
//     disablePadding: boolean;
//     id: keyof Data;
//     label: string;
//     numeric: boolean;
// }
//
// const headCells: readonly HeadCell[] = [
//     {
//         id: 'name',
//         numeric: false,
//         disablePadding: true,
//         label: 'Employee',
//     },
//     {
//         id: 'position',
//         numeric: false,
//         disablePadding: false,
//         label: 'Position',
//     },
//     {
//         id: 'grade',
//         numeric: true,
//         disablePadding: false,
//         label: 'Grade',
//     },
//     {
//         id: 'status',
//         numeric: false,
//         disablePadding: false,
//         label: 'Status',
//     },
//     {
//         id: 'protein',
//         numeric: true,
//         disablePadding: false,
//         label: 'ViewPA',
//
//     },
// ];
//
//
//
// function EnhancedTableHead(props: any) {
//     const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
//         props;
//     const createSortHandler =
//         (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
//             onRequestSort(event, property);
//         };
//
//
//
//     return (
//         <TableHead>
//             <TableRow>
//
//                 {headCells.map((headCell) => (
//                     <TableCell
//                         key={headCell.id}
//                         align={ headCell.numeric ? 'center' : 'left'}
//                         padding={headCell.disablePadding ? 'none' : 'normal'}
//                         sortDirection={orderBy === headCell.id ? order : false}
//                     >
//                         <TableSortLabel
//                             active={orderBy === headCell.id}
//                             direction={orderBy === headCell.id ? order : 'asc'}
//                             onClick={createSortHandler(headCell.id)}
//                         >
//                             {headCell.label}
//                             {orderBy === headCell.id ? (
//                                 <Box component="span" sx={visuallyHidden}>
//                                     {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                                 </Box>
//                             ) : null}
//                         </TableSortLabel>
//                     </TableCell>
//                 ))}
//             </TableRow>
//         </TableHead>
//     );
// }
//
//
//
// export default function EnhancedTable(props: any) {
//     const [order, setOrder] = React.useState<Order>('asc');
//     const [orderBy, setOrderBy] = React.useState<keyof Data>('position');
//     const [selected, setSelected] = React.useState<readonly string[]>([]);
//
//     const { data: employeeData, refetch } = useGetEmployeeQuery('all');
//     console.log(employeeData, 'hi')
//
//     const handleRequestSort = (
//         event: React.MouseEvent<unknown>,
//         property: keyof Data,
//     ) => {
//         const isAsc = orderBy === property && order === 'asc';
//         setOrder(isAsc ? 'desc' : 'asc');
//         setOrderBy(property);
//     };
//
//     // const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
//     //     if (event.target.checked) {
//     //         const newSelecteds = rows.map((n) => n.name);
//     //         setSelected(newSelecteds);
//     //         return;
//     //     }
//     //     setSelected([]);
//     // };
//
//
//
//     const { startAppraisal } = props
//     const [tabValue, setTabValue] = React.useState<any>(0);
//
//     const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
//         console.log('handle change run')
//         console.log(newValue, 'index check')
//         setTabValue(newValue)
//
//     };
//
//     const [open, setOpen] = React.useState(false)
//     const [value, setValue] = React.useState(0);
//
//     const [filter, setFilter] = React.useState('');
//     const [employee, setEmployee] = React.useState([]);
//     const [enteredName, setenteredName] = useState("")
//
//
//     return (
//         <Mytable>
//             <Heading>My Team</Heading>
//             <Tabstyles>
//                 <Tabs sx={{ borderBottom: 1, borderColor: '#E3E3E3', width: '100%' }} value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
//                     <Tab label="All" />
//                     <Tab label="Completed" />
//                     <Tab label="In Progress" />
//                     <Tab label="Not Started" />
//                     <Tab label="Self Rating" />
//
//                 </Tabs>
//                 <Searchfeild>
//                     <div>
//                         <TextField id="outlined-basic" placeholder="Search Here..."
//                             onChange={(e) => setenteredName(e.target.value)}
//                             inputProps={{ maxLength: 512 }}
//                             InputProps={{
//                                 startAdornment: (
//                                     <InputAdornment position="start">
//                                         <img src={Searchlens} alt='icon' />
//                                     </InputAdornment>
//                                 ),
//                             }} />
//                         {/* <img src={UpDown} alt='icon' style={{ marginLeft: '15px', marginTop: '5px' }} /> */}
//                         <img src={Opennew} alt='icon' style={{ marginLeft: '15px', marginTop: '5px' }} />
//                         <img src={Application} alt='icon' style={{ marginLeft: '15px', marginTop: '5px' }} />
//                     </div>
//                 </Searchfeild>
//
//             </Tabstyles>
//         {employeeData && employeeData.data.map((objDesc: any, index: number) => {
//                 console.log(index, tabValue, 'index')
//
//          return (
//             <TableHeadings>
//                 <TabPanel value={tabValue} index={index}>
//                     <Box sx={{ width: '100%' }}>
//                         <TableContainer>
//                             <Table
//                                 sx={{ minWidth: 750 }}
//                                 aria-labelledby="tableTitle"
//
//                             >
//                                 <EnhancedTableHead
//                                     numSelected={selected.length}
//                                     order={order}
//                                     orderBy={orderBy}
//                                     // onSelectAllClick={handleSelectAllClick}
//                                     onRequestSort={handleRequestSort}
//
//                                 />
//                                 <TableBody>
//
//                                     {employeeData &&
//
//                                         stableSort(employeeData.data, getComparator(order, orderBy))
//                                         .filter((j: any) => {
//                                             if (index === 0) {
//                                                 return j
//                                             } else if (index === 1) {
//                                                 return j.appraisal.status.toLocaleLowerCase().includes('completed'.toLocaleLowerCase())
//                                             }
//                                             else if (index === 2) {
//                                                 return j.appraisal.status.toLocaleLowerCase().includes("In Progress".toLocaleLowerCase())
//                                             }
//                                             else if (index === 3) {
//                                                 return j.appraisal.status.toLocaleLowerCase().includes("Not Started".toLocaleLowerCase())
//                                             }
//                                             else if (index === 4) {
//                                                 return j.appraisal.status.toLocaleLowerCase().includes("Self Rating".toLocaleLowerCase())
//                                             }
//                                         })
//                                         .filter((j: any) => {
//                                             if (enteredName === "") {
//                                                 return j
//                                             } else if (j.name.toLocaleLowerCase().includes(
//                                                 enteredName.toLocaleLowerCase()
//                                             ) ||
//                                                 j.position.toLocaleLowerCase().includes(
//                                                     enteredName.toLocaleLowerCase()
//                                                 ) ||
//                                                 j.grade.toLocaleLowerCase().includes(
//                                                     enteredName.toLocaleLowerCase()
//                                                 ) ||
//                                                 j.appraisal.status.toLocaleLowerCase().includes(
//                                                     enteredName.toLocaleLowerCase()
//                                                 )
//
//                                             ) {
//                                                 return employee
//                                             }
//                                         }
//
//                                         )
//                                             .map((row: any, index: any) => {
//                                                 return (
//                                                     <TableRow
//                                                         key={row.name}
//                                                     >
//                                                         <TableCell
//                                                             component="th"
//                                                             scope="row"
//                                                             padding="none"
//                                                         >
//                                                              <Link to={`${CREATE_APPRAISAL}/employee/${row._id}`}
//                                                                 // onClick={() => startAppraisal(j._id)}
//                                                                 >
//                                                                     <Stack direction='row'  >
//                                                                         <Avatar >H</Avatar><Names> {row.name}</Names>
//                                                                     </Stack>
//                                                                 </Link>
//                                                         </TableCell>
//                                                         <TableCell align="left">{row.position}</TableCell>
//                                                         <TableCell align="center">{row.grade}</TableCell>
//                                                         <TableCell align="left">{row.appraisal.status ? <p>{row.appraisal.status}</p> :
//                                                             <p>Not Started </p>}</TableCell>
//                                                         <TableCell align="center"><img src={Eye} alt='icon' /></TableCell>
//                                                     </TableRow>
//                                                 );
//                                             })}
//
//                                 </TableBody>
//                             </Table>
//                         </TableContainer>
//                     </Box>
//                 </TabPanel>
//             </TableHeadings>
//          )})}
//         </Mytable>
//     );
// }

export {}