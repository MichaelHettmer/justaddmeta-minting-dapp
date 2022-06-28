import {
  useAddress,
  useMetamask,
  useEditionDrop
} from "@thirdweb-dev/react";

import React, { useState, useEffect } from "react";

import Airdrop from "./Airdrop";

import {
  Box,
  Image,
  Button,
  Text,
  Heading,
  Paragraph,
} from "grommet";


export default function AuthOnly() {
  const connectWithMetamask = useMetamask();
  // Grab the currently connected wallet's address
  const address = useAddress();
  const [mintingStarted, setMintingStarted] = useState(false);
  const editionDrop = useEditionDrop(
    "0xB4B8f15C9FF18B01D6894713c2e7712fBE2871Ca"
  );


  const [to, setTo] = useState(0);

useEffect(() => {
  const fetchData = async () => {    
    const x = await editionDrop.get(1);
    const total = x.supply;
    return total.toNumber();
  }
  fetchData().then(data => setTo(data))
    .catch(console.error);;

}, [])


  // const tokenStat = await getTokenStats(1);
  // const totalSofar = tokenStat.toNumber();

  return (
    <Box align="center" direction="row" justify="center">
  
      {!mintingStarted ? (
        
       <Image
              src="https://i.imgur.com/48dRmwN.png"
              width={"460px"}
              height={"500px"}
            ></Image>
      ):null}

      <Box align="center" justify="center" direction="column" gap="small">
        {!address ? (
          <>
           
            <Heading size="small" textAlign="center">
              AUTHORIZED <br></br> ACCESS ONLY
            </Heading>
          </>
        ) : null}
        {!address && !mintingStarted ? (
          <>
            <Paragraph textAlign="center" size="16px">
              Connect your wallet to participate in the Alpha Drop.
            </Paragraph>

            <Button
              margin={"medium"}
              label="Connect Wallet"
              size="large"
              color={"white"}
              primary
              onClick={() => connectWithMetamask()}
            />
            <Button label="Launch" active={false} disabled size="large" />
          </>
        ) : null}
      </Box>
      <Box
        align="stretch"
        direction="column"
        justify="center"
        pad="small"
        gap="small"
      >
        <Box gap="medium" direction="row" >
          {address && !mintingStarted ? (
            <>
              
              <Box >
                <Heading size="small" textAlign="center">
                  AUTHORIZED <br></br> SUCCESSFULLY
                </Heading>

                <Paragraph textAlign="center" size="large">
                  Now you can participate in the Alpha Drop.
                </Paragraph>

                <Button
                  color="white"
                  margin="medium"
                  size="large"
                  active={false}
                  // onClick={() => disconnectWallet()}
                >
                  <Text
                    size="large"
                    background
                    pad="small"
                    color={"white"}
                    margin="small"
                  >
                    {address
                      .slice(0, 4)
                      .concat("...")
                      .concat(address.slice(-3))}
                  </Text>
                </Button>
                <Button
                  label="Launch"
                  color={"white"}
                  primary
                  size="large"
                  onClick={() => setMintingStarted(true)}
                />
              </Box>
            </>
          ) : null}

          {mintingStarted ? <Airdrop total={to} /> : null}
        </Box>
      </Box>
    </Box>
  );
}
