import React from 'react';

import { Box, Image, Button, Text, Heading } from 'grommet';

export default function Checkout({ txHash, tokenId }) {
  console.log(`txhash@Checkout >> ${txHash}`);
  console.log(`tokenId@Checkout >> ${txHash}`);

  return (
    <Box direction="row" gap="medium">
      <Box width={'50%'} justify="center" align="start" pad={'32px'}>
        <Image
          src="https://i.imgur.com/mSBSyOz.png"
          width={'342px'}
          height={'479px'}
        />
      </Box>

      <Box width={'50%'} justify="center">
        <Heading textAlign="center" fontSize="32px" fontWeight="400">
          Checkout
        </Heading>
        <Text textAlign="center" fontSize="12px" fontWeight="700">
          You successfully minted “Title”.
        </Text>

        <Box
          size="small"
          margin={'medium'}
          alignSelf="center"
          direction="column"
          gap="small"
        >
          <Button
            alignSelf="center"
            style={{
              fontStyle: 'italic',
              width: '342px',
              height: '40px'
            }}
            primary
            color="white"
            size="large"
            disabled={false}
            href={'https://rinkeby.etherscan.io/tx/' + txHash}
            target="_blank"
          >
            Check Transaction
          </Button>

          <Button
            alignSelf="center"
            style={{
              fontStyle: 'italic',
              width: '342px',
              height: '40px'
            }}
            primary
            color="white"
            size="large"
            disabled={false}
            href={
              'https://testnets.opensea.io/assets/rinkeby/0xb4b8f15c9ff18b01d6894713c2e7712fbe2871ca/' +
              tokenId
            }
            target="_blank"
          >
            Browse OpenSea
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
