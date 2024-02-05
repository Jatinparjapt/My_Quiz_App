import  React from 'react'; 
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Link from 'next/link';
import quizLogo from "@/public/quizLogo.webp"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
const drawerWidth = 240;
function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // console.log(data)
  
   const data = typeof window !== 'undefined' ?  sessionStorage.getItem("name") : null
 

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" className='flex justify-center' >
       <Image  src={quizLogo} className='rounded-full'
      width={50}
      height={50}
      alt="Quiz App Logo " />
      </Typography>
      <Divider />
      <List>
       
          <ListItem  disablePadding>
            <ListItemButton  className='flex flex-col space-y-3 align-center' >
            <Link href={"/"}  >
             Home
             </Link>
             <Link href={"../quizPages/myQuiz"} >
            My Quies
             </Link > 
             <Link href={"../quizPages/playQuiz"} >
            Play Quiz
             </Link>
             <Link href={"/"} >
            {data}
             </Link>
             {
              !data? <Link href={"/"} >
            <NoAccountsIcon/>
               </Link> : <Link href={"/"} >
              <AccountCircleIcon/>
               </Link>
             }
            </ListItemButton>
          </ListItem>
       
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
   
  return (
    <Box sx={{ display: 'flex' }}  >
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
           <Image  src={quizLogo} className='rounded-full'
      width={50}
      height={50}
      alt="Quiz App Logo " />
          </Typography>
          <Box className="hidden space-x-4  sm:flex " >
             <Link href={"/"}  >
             Home
             </Link>
             <Link href={"../quizPages/myQuiz"} >
            My Quies
             </Link > 
             <Link href={"../quizPages/playQuiz"} >
            Play Quiz
             </Link>
             <Link href={"/"} >
            {data}
             </Link>


             {
              !data? <Link href={"/"} >
            <NoAccountsIcon/>
               </Link> : <Link href={"/"} >
              <AccountCircleIcon/>
               </Link>
             }          

          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      
    </Box>
  );
}



export default DrawerAppBar;