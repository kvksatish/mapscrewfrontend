import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axios from 'axios';
import { Box, Button, Modal, Typography } from '@mui/material';
import AddCourse from './AddCourse';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}



const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  
  const [data, setdata] = React.useState([])
  const [open, setopen] = React.useState(false)

  function getdata() {
    setopen(false)
    let token =  sessionStorage.getItem('token')
    console.log(
     sessionStorage.getItem('token')
    )
    
    axios.get('https://mapscrew.vercel.app/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      console.log(res)
      setdata(res.data)
    }).catch((res) => {
      console.log(res)
    })
  }
  
  React.useEffect(() => {
   getdata()
  }, [])
  return (
    <React.Fragment>
      <div style={{ display: "flex" }} >
           <Title>Courses</Title>
        <Button
         onClick={()=>setopen(true)}
         variant="contained"
         sx={{ ml: 2, mb: 2 }}
        >add Course</Button>
      </div>
    
<Modal
  open={open}
  onClose={()=>setopen(false)}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{width:"fit-content",margin:"auto",backgroundColor:"white",mt:"10vh",p:"0rem",borderRadius:"0.5rem"}} >
  <AddCourse  getdata={getdata} />
  </Box>
</Modal>
   
     
      <Table size="small">
       
        <TableHead>
          <TableRow>
            <TableCell>Course</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Teacher</TableCell>
            <TableCell>Mode</TableCell>
            <TableCell align="right">Fees</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
          data && data.length > 0 && data.map((row) => {
            return  <TableRow key={row._id}>
            <TableCell>{row.course}</TableCell>
            <TableCell>{row.duration}</TableCell>
            <TableCell>{row.teacher}</TableCell>
            <TableCell>{row.mode}</TableCell>
            <TableCell align="right">{`$${row.fee}`}</TableCell>
          </TableRow>
          })
        }
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more Courses
      </Link>
    </React.Fragment>
  );
}