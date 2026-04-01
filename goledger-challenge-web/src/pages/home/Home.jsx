import { useSchemas } from "../../hooks/useSchemas";
import { Grid } from '@mui/material/Grid'
import { NavBarPersonalizado } from '../../components/NavBar.jsx'

function Home(){

    useSchemas();
    return(
        <>

        <Grid container spacing={1}>
            <NavBarPersonalizado/>
        </Grid>
        <div>
            <h1>Home!</h1>
        </div>
        </>
    )
}

export default Home;