import {  CardActionArea, CardActions ,Typography , CardContent ,Card} from '@mui/material';
import { Inter } from 'next/font/google'
import Image from "next/image"
import ProgressBar from '../components/progress';
import createQuiz from "@/public/createQuiz.png"
import myQuizes from "@/public/myQuizes.png"
import playQuiz from "@/public/playQuiz.png"
import Link from 'next/link'
import Head from 'next/head';
import { createStore ,combineReducers } from 'redux';
import { reducer ,scoreReducer } from '../Redux/reducer';
const inter = Inter({ subsets: ['latin'] })
export const dataStore = createStore(
  combineReducers({
    reducer :reducer,
    scoreReducer : scoreReducer
  })
  )
  dataStore.subscribe(()=>{
    console.log("state",dataStore.getState())
  })
  
  
  export default function Home() {
  return (
    <>
  <div className="mt-16" >
  <ProgressBar  />
  </div>
  <Head>
        <title>Home Page</title>
      </Head>
      <div className=' flex flex-col md:flex-row mt-28' >
      <div className='drop-shadow-2xl shadow-amber-300' > <Card className='m-2 w-full md:w-[323px] '>
      <CardActionArea className='' >
      <Image
      src={createQuiz}
      width={500}
      height={500}
      alt="Create New Quiz"
    />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Create New Quiz
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Create My Quiz: Easy online tool for personalized quizzes. User-friendly, diverse options, and shareable links for interactive learning experiences
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link href='/quizPages/createQuiz' className='rounded-md text-xl ml-3 text-teal-500' >
        Create Quiz
       </Link>
      </CardActions>
    </Card>
    </div> 
    <div className='drop-shadow-2xl shadow-amber-300' > <Card className='m-2 w-full md:w-[323px] '>
      <CardActionArea className='' >
      <Image
      src={playQuiz}
      width={500}
      height={500}
      alt="Let's Play Quiz"
    />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Play Quiz
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Play Quiz: Enjoy interactive challenges with diverse topics, customizable features, and easy sharing options for a fun and engaging experience.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Link href='/quizPages/playQuiz' className='rounded-md text-xl ml-3 text-teal-500' >
        Play Quiz
       </Link>
      </CardActions>
    </Card>
    </div> 
    <div className='drop-shadow-2xl shadow-amber-300' > <Card className='m-2 w-full md:w-[323px] '>
      <CardActionArea className='' >
      <Image
      src={myQuizes}
      width={500}
      height={500}
      alt="My Quizes"
      priority
    />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            My Quizes
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Explore diverse quizzes tailored to your interests. Engage in interactive learning with shareable links. Dive into knowledge effortlessly with us.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Link href='/quizPages/myQuiz' className='rounded-md text-xl ml-3 text-teal-500' >
        MY Quizes
       </Link>
      </CardActions>
    </Card>
    </div> 
   
    </div>
    
    </>
  )
}
