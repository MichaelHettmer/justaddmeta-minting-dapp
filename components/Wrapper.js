import React, { useState } from "react";
import {About} from "./About";
import {Card} from "./Card";
import styles from "../styles/wrapper.module.css";
import  {HeroBanner} from "./HeroBanner";


export const Wrapper = () => {

  // this component will act as a dispatcher of state variables. 
  // instead of values, passes functions to childs that'd propagate back
  // as a result of a button click calling that function via as part of props it receives.
  // to learn more about this trick, watch this: https://www.youtube.com/watch?v=UrpNtB61qyo
  const [displayAboveSections, setDisplayAboveSections] = useState(true);
  return (
      <main className={styles.sectionMain}>
        {displayAboveSections? (<>
          <HeroBanner/>
          <About />
        </>): null}
        <Card displayAboveSections={x => setDisplayAboveSections(x)}/>
        </main>
    );
}
