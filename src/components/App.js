import { useQuiz } from "../context/QuizContest"

import Header from "./Header"
import Main from "./Main"
import Loader from "./Loader"
import Error from "./Error"
import StartScreen from "./startScreen"
import Questions from "./Questions"
import NextButton from "./NextButton"
import Progress from "./Progress"
import FinishedScreen from "./FinishedScreen"
import Footer from "./Footer"
import Timer from "./Timer"

export default function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />

      <Main className="main">
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen />}
        {status === 'active' &&
          <>
            <Progress />
            <Questions />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        }

        {status === 'finished' && <FinishedScreen />}
      </Main>
    </div>
  )
}